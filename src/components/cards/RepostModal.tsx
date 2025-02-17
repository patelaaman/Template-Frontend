import { useAuthContext } from '@/context/useAuthContext';
import { CREATE_POST } from '@/utils/api';
import makeApiRequest from '@/utils/apiServer';
import React, { useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { PostSchema } from './PostCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ApiResponse<T> {
    status: number;
    data: T;
}

const RepostModal = ({ isOpen, onClose, authorName, item, setIsCreated, isCreated }: {
    isOpen: boolean;
    onClose: () => void;
    authorName: string;
    item: PostSchema;
    setIsCreated: React.Dispatch<React.SetStateAction<boolean>>;
    isCreated: boolean;
}) => {
    const [includeThoughts, setIncludeThoughts] = useState(false);
    const [thoughts, setThoughts] = useState('');
    const [hoveredOption, setHoveredOption] = useState(null);
    const [isSubmittingPost, setIsSubmittingPost] = useState(false);
    const { user } = useAuthContext();

    const handleRepost = () => {
        if (includeThoughts) {
            handlePostClick();
        } else {
            handlePostClick();
        }
        onClose();
        setIncludeThoughts(false);
    };

    const handlePostClick = async () => {
        setIsSubmittingPost(true);
        try {
            const hashtagRegex = /#\w+/g;
            const hashtags = thoughts.match(hashtagRegex) || [];
            const response = await makeApiRequest<ApiResponse<{ url: string }>>({
                method: 'POST',
                url: CREATE_POST,
                data: {
                    hashtags: hashtags,
                    repostedFrom: item.post.repostedFrom ? item.post.repostedFrom : item.post.userId,
                    userId: user?.id,
                    content: item.post.content,
                    mediaKeys: item.post.mediaKeys,
                    repostText: thoughts,
                    repostPostId : item.post.repostedFrom ?  item.post.repostPostId : item.post.Id,
                    originalPostedAt: item.post.repostedFrom ? item.post.originalPostedAt : item.post.createdAt
                },
            });

            if (response.data) {
                setThoughts('');
                toast.success('Repost successful!'); // Show success toast
            }
        } catch (err) {
            console.log('Error in the posting', err);
            toast.error('Error in reposting, please try again.'); // Show error toast
        } finally {
            setIsSubmittingPost(false);
            setIsCreated(!isCreated);
        }
    };

    const [mentionDropdownVisible, setMentionDropdownVisible] = useState(false);
    const textareaRef = useRef(null);

    const handleChange = (e: string) => {
        const value = e.target.value;
        setThoughts(value);

        const lastWord = value.split(/\s+/).pop();
        if (lastWord.startsWith("@")) {
            fetchUsers(lastWord);
        } else {
            setMentionDropdownVisible(false);
        }
    };

    const fetchUsers = async (query: string) => {
        if (!query.startsWith("@")) return;
        // Fetch users logic here...
    };

    const handleMentionClick = (user: any, type: string) => {
        const mention = `${user.userName} `;
        setThoughts((prev) => prev + mention);
        setMentionDropdownVisible(false);
    };

    return (
        <Modal
            show={isOpen}
            onHide={() => {
                setIncludeThoughts(false);
                onClose();
            }}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Share Post</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* Option 1: Repost with Thoughts */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '15px',
                        padding: '10px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        backgroundColor: hoveredOption === 'thoughts' ? '#f5f5f5' : 'transparent',
                        transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={() => setHoveredOption('thoughts')}
                    onMouseLeave={() => setHoveredOption(null)}
                    onClick={() => setIncludeThoughts(true)}
                >
                    <span style={{ marginRight: '10px', fontSize: '18px' }}>✏️</span>
                    <div>
                        <h5 style={{ margin: 0 }}>Repost with your thoughts</h5>
                        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                            Create a new post with {authorName}'s post attached
                        </p>
                    </div>
                </div>

                {/* Option 2: Quick Repost */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        backgroundColor: hoveredOption === 'quick' ? '#f5f5f5' : 'transparent',
                        transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={() => setHoveredOption('quick')}
                    onMouseLeave={() => setHoveredOption(null)}
                    onClick={handleRepost}
                >
                    <span style={{ marginRight: '10px', fontSize: '18px' }}>↗️</span>
                    <div>
                        <h5 style={{ margin: 0 }}>Quick Repost</h5>
                        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                            Instantly share {authorName}'s post to your feed
                        </p>
                    </div>
                </div>

                {/* Thoughts Input Section */}
                {includeThoughts && (
                    <div style={{ marginTop: '15px' }}>
                        <textarea
                            ref={textareaRef}
                            className="form-control pe-4 border rounded"
                            style={{
                                borderColor: "#212529",
                                color: "#212529",
                                backgroundColor: "#f8f9fa",
                                fontSize: "14px",
                                width: "100%",
                                resize: "none",
                            }}
                            rows={2}
                            placeholder="Start a post"
                            value={thoughts}
                            onChange={handleChange}
                        />

                        <Button
                            onClick={handleRepost}
                            style={{
                                width: '100%',
                                backgroundColor: '#1a8cd8',
                                border: 'none',
                            }}
                        >
                            Repost
                        </Button>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default RepostModal;
