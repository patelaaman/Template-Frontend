import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ReportBlockModal = ({ show, handleClose }) => {
  const [action, setAction] = useState(null);
  const [blockReason, setBlockReason] = useState("");
  const [reportReason, setReportReason] = useState("");

  const reportOptions = [
    "Fake profile",
    "Harassment or abuse",
    "Spam or misleading content",
    "Inappropriate behavior",
    "Something else",
    "Impersonation",
    "Hate speech or discrimination",
    "Scam or fraud",
    "Violence or threat",
    "Nudity or explicit content",
    "Misinformation or false news",
    "Unauthorized sharing of personal information",
  ];
  

  const handleSubmit = () => {
    if (action === "block" && blockReason) {
      console.log("Block reason:", blockReason);
    } else if (action === "report" && reportReason) {
        console.log("Additional details:", blockReason);
      console.log("Report reason:", reportReason);
    }
    handleClose();
  };

  return (
    <div className={`custom-modal ${show ? "show" : ""}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {action === "block"
                ? "Block User"
                : action === "report"
                ? "Report User"
                : "Block or Report User"}
            </h5>
            <button type="button" className="close-btn" onClick={handleClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            {!action ? (
              <div className="action-cards">
                <div
                  className="card block-card"
                  onClick={() => setAction("block")}
                >
                  <h6>Block User</h6>
                  <p>
                    You will no longer be connected, and you won't receive
                    messages or updates from this user.
                  </p>
                </div>
                <div
                  className="card report-card"
                  onClick={() => setAction("report")}
                >
                  <h6>Report User</h6>
                  <p>Report this user for inappropriate behavior or content.</p>
                </div>
              </div>
            ) : action === "block" ? (
              <div>
                <h6 className="text-primary">
                  You're about to block this user
                </h6>
                <p className="description">
                  You will no longer be connected, and you won't receive
                  messages or updates from this user.
                </p>
                <textarea
                  className="input-box"
                  rows="10"
                  placeholder="Enter reason (optional)"
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                />
                <div className="button-group">
                  <button
                    className="cancel-btn"
                    onClick={handleClose}
                    style={{ transition: "background-color 0.3s" }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#d4d4d4")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#e4e6eb")}
                  >
                    Cancel
                  </button>
                  <button
                    className="confirm-btn"
                    style={{ backgroundColor: "#007bff", color: "white", transition: "background-color 0.3s" }}
                    onClick={handleSubmit}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
                  >
                    Block
                  </button>
                </div>
              </div>
            ) : (
                <div className="p-4">
                    <h5 className="text-dark fw-bold mb-3">Report this profile</h5>
                    <p className="text-muted">Select our policy that applies</p>
                    <div className="d-flex flex-wrap gap-2">
                        {reportOptions.map((option, index) => (
                            <button
                                key={index}
                                className={`btn btn-outline-secondary rounded-pill px-3 py-2 ${
                                    reportReason === option ? "btn-primary text-white" : ""
                                }`}
                                onClick={() => setReportReason(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <textarea
                        className="input-box mt-3"
                        rows="2"
                        placeholder="Additional details (optional)"
                        value={blockReason}
                        onChange={(e) => setBlockReason(e.target.value)}
                    />
                    <div className="mt-4">
                        <p className="text-muted small">Looking for something else?</p>
                        <button className="btn btn-link text-decoration-none">Suggest a profile correction</button>
                        <button className="btn btn-link text-decoration-none">Let us know this person is deceased</button>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <button className="btn btn-light" onClick={handleClose}>Back</button>
                        <button className="btn btn-primary" onClick={handleSubmit} disabled={!reportReason}>Next</button>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .custom-modal {
          display: ${show ? "flex" : "none"};
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
          max-width: 680px;
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
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
          color: #0073b1;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }

        .action-cards {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .card {
          padding: 15px;
          border-radius: 8px;
          cursor: pointer;
          background-color: #f8f9fa;
          transition: background-color 0.3s;
        }

        .card:hover {
          background-color: #e4e6eb;
        }

        .input-box {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          background: #fff;
        }

        .button-group {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 15px;
        }

        .cancel-btn {
          background: #e4e6eb;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
        }

        .confirm-btn {
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
        }

        .block-confirm {
          background: #ff4d4d;
          color: white;
        }

        .list-group-item {
          max-width: 500px;
          transition: 0.3s;
          border-left: 4px solid transparent;
          text-align: center;
        }

        .list-group-item:hover {
          border-left: 4px solid #0d6efd;
        }
      `}</style>
    </div>
  );
};

export default ReportBlockModal;
