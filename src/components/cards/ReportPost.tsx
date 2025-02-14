import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BsExclamationTriangle, BsPencil } from 'react-icons/bs'
import { LIVE_URL } from '@/utils/api'
import {toast} from 'react-toastify'
interface ReportModalProps {
  show: boolean
  handleClose: () => void
  userId: string
  postId: string
}

const ReportModal: React.FC<ReportModalProps> = ({ show, handleClose, userId, postId }) => {
  const [step, setStep] = useState(1) // Step 1: Selection, Step 2: Report Form, Step 3: Don't want to see this
  const [reportReason, setReportReason] = useState<string[]>([])
  const [additionalDetails, setAdditionalDetails] = useState('')

  const reportOptions = [
    'Spam or misleading content',
    'Hate speech or discrimination',
    'Harassment or bullying',
    'False information',
    'Violence or harmful content',
    'Scam or fraud',
    'Nudity or explicit content',
    'Copyright violation',
    'Something else',
  ]

  const dontWantToSeeOptions = [
    "I'm not interested in the author",
    "I'm not interested in this topic",
    "I've seen too many posts on this topic",
    "I've seen this post before",
    'This post is old',
    "It's something else",
  ]

  const handleSubmit = async () => {
    if (step === 2 && reportReason) {
      try {
        await fetch(`${LIVE_URL}api/v1/post/report-post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            reportedPost: postId,
            reason: reportReason,
            additionalDetails,
          }),
        })
        toast.success('Post reported successfully')
      } catch (error) {
        console.error('Error reporting post:', error)
      }
    } else if (step === 3) {
      console.log("Don't want to see this reason:", reportReason)
      console.log('User ID:', userId)
      console.log('Post ID:', postId)
    }
    handleClose()
    setStep(1)
    setReportReason([])
    setAdditionalDetails('')
  }

  return (
    <div className={`custom-modal ${show ? 'show' : ''}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{step === 1 ? 'Report this post' : step === 2 ? 'Report content for review' : "Don't want to see this"}</h5>
            <button type="button" className="close-btn" onClick={handleClose}>
              &times;
            </button>
          </div>

          <div className="modal-body">
            {/* Step 1: Selection */}
            {step === 1 && (
              <>
                <p className="text-muted">Select an action</p>
                <div className="action-card" onClick={() => setStep(3)}>
                  <BsPencil className="icon" />
                  <div>
                    <h6>Change your feed</h6>
                    <p className="text-muted">If you think this is inappropriate, you can give us feedback instead of reporting.</p>
                  </div>
                </div>

                <div className="action-card" onClick={() => setStep(2)}>
                  <BsExclamationTriangle className="icon" />
                  <div>
                    <h6>Report content for review</h6>
                    <p className="text-muted">Tell us how this goes against our policies or request help for someone.</p>
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Report Form */}
            {step === 2 && (
              <>
                <p className="text-muted">Select reasons for reporting this post:</p>
                <div className="d-flex flex-wrap gap-2">
                  {reportOptions.map((option, index) => (
                    <button
                      key={index}
                      className={`btn btn-outline-secondary rounded-pill px-3 py-2 ${reportReason.includes(option) ? 'btn-primary text-white' : ''}`}
                      onClick={() => {
                        if (reportReason.includes(option)) {
                          setReportReason(reportReason.filter((reason) => reason !== option))
                        } else {
                          setReportReason([...reportReason, option])
                        }
                      }}>
                      {option}
                    </button>
                  ))}
                </div>
                <textarea
                  className="input-box mt-3"
                  rows={3}
                  placeholder="Additional details (optional)"
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                />
                <div className="d-flex justify-content-between mt-4">
                  <button className="btn btn-light" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button className="btn btn-primary" onClick={handleSubmit} disabled={reportReason.length === 0}>
                    Submit Report
                  </button>
                </div>
              </>
            )}

            {/* Step 3: "Don't Want to See This" */}
            {step === 3 && (
              <>
                <p className="text-muted">Tell us why to help improve the feed:</p>
                <div className="d-flex flex-wrap gap-2">
                  {dontWantToSeeOptions.map((option, index) => (
                    <button
                      key={index}
                      className={`btn btn-outline-secondary rounded-pill px-3 py-2 ${reportReason.includes(option) ? 'btn-primary text-white' : ''}`}
                      onClick={() => {
                        if (reportReason.includes(option)) {
                          setReportReason(reportReason.filter((reason) => reason !== option))
                        } else {
                          setReportReason([...reportReason, option])
                        }
                      }}>
                      {option}
                    </button>
                  ))}
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button className="btn btn-light" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button className="btn btn-primary" onClick={handleSubmit} disabled={!reportReason}>
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-modal {
          display: ${show ? 'flex' : 'none'};
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          z-index: 1050;
        }

        .modal-dialog {
          max-width: 600px;
          background: #fff;
          border-radius: 12px;
        }

        .modal-content {
          padding: 20px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #dee2e6;
        }

        .modal-title {
          font-weight: bold;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }

        .action-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .action-card:hover {
          background: #f8f9fa;
        }

        .icon {
          font-size: 24px;
          color: #555;
        }

        .input-box {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
      `}</style>
    </div>
  )
}

export default ReportModal
