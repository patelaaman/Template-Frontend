import { FileType } from '@/hooks/useFileUploader'
import { useState } from 'react'
import { Card, Col, FormLabel, FormText } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import { BsUpload } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'

type PhotoUpload = {
  label?: string
  labelClassName?: string
  helpText?: string
  showPreview?: boolean
  icon?: React.ComponentType<any>
  iconProps?: React.ComponentProps<any>
  text?: string
  textClassName?: string
  onFileUpload?: (files: FileUpload[]) => void
}

interface FileUpload {
  key: string
  fileType: string
  fileObject: string // Base64 encoded file content
  documentType: string
  documentName: string
  documentDescription: string
  fileSize: number
  preview?: string
}

const DropzoneFormInput = ({
  label,
  labelClassName,
  helpText,
  icon,
  iconProps,
  showPreview,
  text,
  textClassName,
  onFileUpload,
}: PhotoUpload) => {
  const [selectedFiles, setSelectedFiles] = useState<FileUpload[]>([])

  const handleAcceptedFiles = async (files: File[]) => {
    let allFiles: FileUpload[] = []

    for (let file of files) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string

        const fileUploadData: FileUpload = {
          key: file.name,
          fileType: file.type,
          fileObject: base64String,
          documentType: 'image',
          documentName: file.name,
          documentDescription: 'Uploaded image file',
          fileSize: file.size,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        }

        allFiles.push(fileUploadData)
        setSelectedFiles((prevFiles) => [...prevFiles, fileUploadData])

        if (onFileUpload) onFileUpload([...selectedFiles, fileUploadData])
      }

      reader.readAsDataURL(file)
    }
  }

  const removeFile = (fileToRemove: FileUpload) => {
    const newFiles = selectedFiles.filter((file) => file.key !== fileToRemove.key)
    setSelectedFiles(newFiles)

    if (onFileUpload) onFileUpload(newFiles)
  }

  const Icon = icon ?? BsUpload

  return (
    <>
      <FormLabel className={labelClassName}>{label}</FormLabel>

      <Dropzone onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)} maxFiles={4}>
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone dropzone-custom cursor-pointer" style={{ maxHeight: '15px', minHeight: '12px' }}>
            {selectedFiles.length === 0 && (
              <div className="" {...getRootProps()}>
                <input {...getInputProps()} />
                <Icon {...iconProps} className="display-3" size={30} style={{    marginTop: "-22px"}}/>
                {/* <p className={textClassName}>{text}</p> */}
              </div>
            )}

            {showPreview && selectedFiles.length > 0 && (
              <div className="dz-preview row g-4">
                {selectedFiles.map((file, idx) => (
                  <Col md={4} sm={6} key={`file-${idx}-${file.key}`}>
                    <Card className="p-2 mb-0 shadow-none border position-relative h-100">
                      {file.preview ? (
                        <img alt={file.documentName} src={file.preview} className="rounded bg-light" style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'contain' }} />
                      ) : (
                        <div className="rounded bg-light text-center">{file.documentName.split('.').pop()?.toUpperCase()}</div>
                      )}
                      <div className="mt-2">
                        <p role="button" className="text-body-secondary fw-bold">
                          {file.documentName}
                        </p> 
                        <p className="mb-0 small">{(file.fileSize / 1024).toFixed(2)} KB</p>
                      </div>
                      <div className="position-absolute  start-100 translate-middle" style={{ top: '-25px' }}>
                        <button 
                          className="btn btn-danger rounded-circle p-0 d-flex align-items-center justify-content-center"
                          onClick={() => removeFile(file)}>
                          <FaTimes />
                        </button>
                      </div>
                    </Card>
                  </Col>
                ))}
              </div>
            )}
          </div>
        )}
      </Dropzone>

      {helpText && <FormText>{helpText}</FormText>}
    </>
  )
}

export default DropzoneFormInput
