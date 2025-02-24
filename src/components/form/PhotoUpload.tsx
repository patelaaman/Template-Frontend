import { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { BsUpload } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'

type PhotoUploadProps = {
  showPreview?: boolean
  icon?: React.ComponentType<any>
  text?: string
  onFileUpload?: (files: FileUpload[]) => void
  reset?: boolean 
}

interface FileUpload {
  key: string
  fileType: string
  fileObject: string
  documentType: string
  documentName: string
  fileSize: number
  preview?: string
}

const PhotoUpload = ({
  showPreview,
  icon,
  text,
  onFileUpload,
  reset,
}: PhotoUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<FileUpload[]>([])


console.log("reset", reset);
// reset undefined   // please check


  useEffect(() => {
    if (reset) {
      setSelectedFiles([]) 
    }
  }, [reset])

  const handleAcceptedFiles = (files: File[]) => {
    let newFiles: FileUpload[] = []

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string

        const fileUploadData: FileUpload = {
          key: file.name,
          fileType: file.type,
          fileObject: base64String,
          documentType: 'image',
          documentName: file.name,
          fileSize: file.size,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        }

        newFiles.push(fileUploadData)

        setSelectedFiles((prevFiles) => {
          const updatedFiles = [...prevFiles, fileUploadData]
          if (onFileUpload) onFileUpload(updatedFiles)
          return updatedFiles
        })
      }
      reader.readAsDataURL(file)
    })
  }

  const removeFile = (fileToRemove: FileUpload) => {
    setSelectedFiles((prevFiles) => {
      const newFiles = prevFiles.filter((file) => file.key !== fileToRemove.key)
      if (onFileUpload) onFileUpload(newFiles)
      return newFiles
    })
  }

  const Icon = icon ?? BsUpload

  return (
    <>
      <Dropzone onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)} maxFiles={4}>
        {({ getRootProps, getInputProps }) => (
          <div
            className="dropzone border-0"
            style={{ height: '40px', width: '100px' }}
          >
            {selectedFiles.length === 0 && (
              <div {...getRootProps()} className='position-relative'>
                <input {...getInputProps()} />
                <Icon size={30} className='position-absolute' style={{    left: "39px",top: "-6px", cursor:"pointer"}}/>
                <p style={{ display: 'none' }}>{text || 'Upload'}</p>
              </div>
            )}
          </div>
        )}
      </Dropzone>

      {showPreview && selectedFiles.length > 0 && (
        <div className="preview-container">
          {selectedFiles.map((file, idx) => (
            <div key={`preview-${idx}`} className="preview-item" style={{
              position: "relative",
              left: "-10rem"}}>
              <button className="btn btn-danger btn-sm p-1" onClick={() => removeFile(file)}>
                <FaTimes size={12} />
              </button>
              {file.preview && <img alt={file.documentName} src={file.preview} className="preview-image" />}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default PhotoUpload
