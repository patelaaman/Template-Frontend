import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import imageCompression from 'browser-image-compression'
import { toast } from 'react-toastify'
import { BsUpload } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'
import { FormLabel, FormText, Col, Card } from 'react-bootstrap'

// File Upload Interface
interface FileUpload {
  key: string
  fileType: string
  fileObject: string
  documentType: 'image' | 'video'
  documentName: string
  documentDescription: string
  fileSize: number
  preview?: string
}

// Props for DropzoneFormInput
type DropzoneFormInputProps = {
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

const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB

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
}: DropzoneFormInputProps) => {
  const [selectedFiles, setSelectedFiles] = useState<FileUpload[]>([])
  const [alert, setAlert] = useState('')

  // Compress image
  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 1, // 1MB max size
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    try {
      return await imageCompression(file, options)
    } catch (error) {
      console.error('Image compression error:', error)
      return file
    }
  }

  // Process uploaded files
  const handleAcceptedFiles = async (files: File[]) => {
    if (files.length === 0) return

    const validFiles = files.filter(
      (file) =>
        (file.type.startsWith('image/') || file.type.startsWith('video/')) &&
        file.size <= MAX_FILE_SIZE
    )

    if (validFiles.length !== files.length) {
      toast.error('Only image and video files under 100MB are allowed.')
      setAlert('Only image and video files under 100MB are allowed.')
      return
    }

    if (validFiles.length + selectedFiles.length > 10) {
      toast.info('You can upload a maximum of 10 media files.')
      setAlert('You can upload a maximum of 10 media files.')
      return
    }

    const filePromises = validFiles.map(
      (file) =>
        new Promise<FileUpload>(async (resolve) => {
          let processedFile = file
          if (file.type.startsWith('image/')) {
            processedFile = await compressImage(file)
          }

          const reader = new FileReader()
          reader.onloadend = () => {
            resolve({
              key: processedFile.name,
              fileType: processedFile.type,
              fileObject: reader.result as string,
              documentType: processedFile.type.startsWith('image/') ? 'image' : 'video',
              documentName: processedFile.name,
              documentDescription: 'Uploaded media file',
              fileSize: processedFile.size,
              preview: processedFile.type.startsWith('image/') ? URL.createObjectURL(processedFile) : undefined,
            })
          }
          reader.readAsDataURL(processedFile)
        })
    )

    const uploadedFiles = await Promise.all(filePromises)

    // Remove duplicates based on file name
    const uniqueFiles = [
      ...selectedFiles,
      ...uploadedFiles.filter((newFile) => !selectedFiles.some((f) => f.key === newFile.key)),
    ]

    setSelectedFiles(uniqueFiles)
    onFileUpload?.(uniqueFiles)
  }

  // Remove file
  const removeFile = (file: FileUpload) => {
    const updatedFiles = selectedFiles.filter((f) => f.key !== file.key)
    setSelectedFiles(updatedFiles)
    onFileUpload?.(updatedFiles)
  }

  const Icon = icon ?? BsUpload

  return (
    <>
      <FormLabel className={labelClassName}>{label}</FormLabel>
      <p className='text-danger'>{alert}</p>
      <Dropzone
        onDrop={handleAcceptedFiles}
        maxFiles={10}
        accept={{ 'image/*': [], 'video/*': [] }}
      >
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone dropzone-custom cursor-pointer">
            <div className="dz-message" {...getRootProps()}>
              <input {...getInputProps()} />
              <Icon {...iconProps} className="display-3" />
              <p className={textClassName}>{text}</p>
            </div>
            {showPreview && selectedFiles.length > 0 && (
              <div className="dz-preview row g-4">
                {selectedFiles.map((file) => (
                  <Col md={4} sm={6} key={file.key}>
                    <Card className="p-2 mb-0 shadow-none border position-relative h-100">
                      {file.preview ? (
                        <img alt={file.documentName} src={file.preview} className="rounded bg-light w-100" />
                      ) : (
                        <div className="rounded bg-light text-center">
                          {file.documentType.toUpperCase()}
                        </div>
                      )}
                      <div className="mt-2">
                        <p className="mb-0 small">{(file.fileSize / 1024).toFixed(2)} KB</p>
                      </div>
                      <div className="position-absolute top-0 start-100 translate-middle">
                        <button
                          className="btn btn-danger rounded-circle icon-sm p-0 d-flex align-items-center justify-content-center"
                          onClick={() => removeFile(file)}
                        >
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
