import React, { useState } from "react";
import { Modal, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ImageZoom from "../ImageZoom";
import { useAuthContext } from "@/context/useAuthContext";
import fallBackAvatar from "@/assets/images/avatar/default avatar.png";

// Define types for the like and reaction data
interface Like {
  id: string;
  firstName: string;
  lastName: string;
  userRole: string;
  profilePicture?: string;
  likerUrl?: string;
  isMutualConnection?: boolean;
  like?: {
    reactionId: number;
  };
}

interface LikeListModalProps {
  isOpen: boolean;
  onClose: () => void;
  likes: Like[];
  forComment?: boolean;
}

// Define the available reactions
const reactions = [
  { emoji: "👍", label: "Like", reactId: 1 },
  { emoji: "🎉", label: "Celebrate", reactId: 2 },
  { emoji: "💪", label: "Support", reactId: 3 },
  { emoji: "❤️", label: "Love", reactId: 4 },
  { emoji: "💡", label: "Insightful", reactId: 5 },
  { emoji: "😂", label: "Funny", reactId: 6 },
];

const LikeListModal: React.FC<LikeListModalProps> = ({ isOpen, onClose, likes, forComment = false }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // Compute reaction counts
  const reactionCounts: Record<number, number> = likes.reduce((acc, like) => {
    const reactionId = like.like?.reactionId;
    if (reactionId) acc[reactionId] = (acc[reactionId] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // Group likes by reaction type
  const groupedLikes: Record<number, Like[]> = reactions.reduce((acc, reaction) => {
    acc[reaction.reactId] = likes.filter((like) => like.like?.reactionId === reaction.reactId);
    return acc;
  }, {} as Record<number, Like[]>);

  // Default to "All" tab first
  const [activeTab, setActiveTab] = useState<number | "all">("all");

  // Function to get filtered likes based on active tab
  const getFilteredLikes = (): Like[] => {
    return activeTab === "all" ? likes : groupedLikes[activeTab] || [];
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered backdrop="static" keyboard={false} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Reactions</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "500px", overflowY: "auto" }}>
        {/* Reaction Tabs */}
        <Nav variant="tabs" className="mb-3">
          <Nav.Item style={{ cursor: "pointer" }}>
            <Nav.Link active={activeTab === "all"} onClick={() => setActiveTab("all")}>
              All {likes.length}
            </Nav.Link>
          </Nav.Item>
          {reactions.map(({ emoji, label, reactId }) => (
            <Nav.Item key={reactId} style={{ cursor: "pointer" }}>
              <Nav.Link active={activeTab === reactId} onClick={() => setActiveTab(reactId)}>
                {emoji} {reactionCounts[reactId] || 0}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        {/* Display users for the selected reaction */}
        {getFilteredLikes().length > 0 ? (
          getFilteredLikes().map((like) => (
            <div key={like.id} className="d-flex align-items-center justify-content-between p-3 border-bottom">
              <div className="d-flex align-items-center">
                <Link to={`/profile/feed/${like.id}`}>
                  <ImageZoom
                    src={(forComment ? like.profilePicture : like.likerUrl) || fallBackAvatar}
                    zoom={50}
                    rotate={50}
                    width="50px"
                    height="50px"
                  />
                </Link>

                <Link to={`/profile/feed/${like.id}`} className="ms-3">
                  <div>
                    <h6 className="mb-0">{like.firstName} {like.lastName}</h6>
                    <small className="text-muted">{like.userRole}</small>
                  </div>
                </Link>
              </div>

              {like.id !== user?.id && (
                <button className="btn btn-primary btn-sm">
                  {forComment ? (like.isMutualConnection ? "Message" : "Connect") : "Connect"}
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No reactions for this type yet.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default LikeListModal;