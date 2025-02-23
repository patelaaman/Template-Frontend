import { FileType } from '@/hooks/useFileUploader'
import { useState } from 'react'
import { Card, FormLabel, FormText } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import { BsUpload } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'

type PhotoUploadProps = {
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
}: PhotoUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<FileUpload[]>([])

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
          documentDescription: 'Uploaded image file',
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
      <FormLabel className={labelClassName}>{label}</FormLabel>

      <Dropzone onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)} maxFiles={5}>
        {({ getRootProps, getInputProps }) => (
          <div
            className="dropzone dropzone-custom cursor-pointer p-3 border-0 rounded text-center"
            style={{
              opacity: selectedFiles.length > 0 ? 0.5 : 1,
              backgroundColor: 'white',
              border: "3px solid black",
              height: "40px",
              width: "100px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selectedFiles.length === 0 && (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Icon {...iconProps} className="display-3 text-muted" size={30} style={{ marginTop: "-15px" }} />
                <p className="mt-2 text-secondary" style={{ display: "none" }}>
                  {text || 'Drag & drop 1 image or click to upload'}
                </p>
              </div>
            )}
          </div>
        )}
      </Dropzone>

      {showPreview && selectedFiles.length > 0 && (
        <div
          className=" rounded p-2 mt-3 d-flex justify-content-center align-items-center"
          style={{
            height: '30vh',
            width: '100%',
            position: 'relative',
          
          }}
        >
          {selectedFiles.map((file, idx) => (
            <div key={`preview-${idx}`} className="position-relative">
              {file.preview ? (
                <img
                  alt={file.documentName}
                  src={file.preview}
                  className="rounded bg-light"
                  style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'contain' }}
                />
              ) : (
                <div
                  className="rounded bg-light text-center p-2 d-flex align-items-center justify-content-center"
                  style={{ width: '100%', height: '100%', fontSize: '14px' }}
                >
                  {file.documentName.split('.').pop()?.toUpperCase()}
                </div>
              )}
              <button
                className="btn btn-danger rounded-circle p-1 position-absolute top-0 end-0 m-1"
                onClick={() => removeFile(file)}
                style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <FaTimes size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {helpText && <FormText>{helpText}</FormText>}
    </>
  )
}

export default DropzoneFormInput



// <>
// <FormLabel className={labelClassName}>{label}</FormLabel>

// {error && <Alert variant="danger">{error}</Alert>}

// <Dropzone onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)} maxFiles={1}>
//   {({ getRootProps, getInputProps }) => (
//     <div
//       className="dropzone dropzone-custom cursor-pointer p-3 border-0 rounded text-center"
//       style={{
//         opacity: selectedFile ? 0.5 : 1,
//         backgroundColor: 'white',
//         border: "3px solid black",
//         height: "40px",
//         width: "100px",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div {...getRootProps()}>
//         <input {...getInputProps()} disabled={selectedFile !== null} />
//         <Icon {...iconProps} className="display-3 text-muted" size={30} style={{ marginTop: "-15px" }} />
//         <p className="mt-2 text-secondary" style={{ display: "none" }}>
//           {text || 'Drag & drop 1 image or click to upload'}
//         </p>
//       </div>
//     </div>
//   )}
// </Dropzone>

// {/* Image Preview at the Bottom */}
// {selectedFile && (
//   <div className="border rounded p-2 mt-3 bg-light d-flex justify-content-center align-items-center"
//     style={{
//       height: '30vh',
//       width: '100%',
//       position: 'relative',
//       boxShadow: '0 0 10px rgba(8, 6, 6, 0.1)',
//       left: "-155%"
//     }}>
//     {selectedFile.preview ? (
//       <img
//         alt={selectedFile.documentName}
//         src={selectedFile.preview}
//         className="rounded bg-light"
//         style={{ maxHeight: '100%', objectFit: 'contain' }}
//       />
//     ) : (
//       <div className="rounded bg-light text-center p-2 d-flex align-items-center justify-content-center"
//         style={{ width: '100%', height: '100%', fontSize: '14px' }}>
//         {selectedFile.documentName.split('.').pop()?.toUpperCase()}
//       </div>
//     )}
//     <button
//       className="btn btn-danger rounded-circle p-1 position-absolute top-0 end-0 m-1"
//       onClick={removeFile}
//       style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//     >
//       <FaTimes size={12} />
//     </button>
//   </div>
// )}

// {helpText && <FormText className="text-muted">{helpText}</FormText>}
// </>