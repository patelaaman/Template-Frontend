import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect, useState } from 'react';
import PostCard, { PostSchema } from '@/components/cards/PostCard';
import { useParams } from 'react-router-dom';
import { LIVE_URL } from '@/utils/api';
import { useAuthContext } from '@/context/useAuthContext';
import Loading from '@/components/Loading';

const UserPost = () => {
  const { id } = useParams();  
  const { user } = useAuthContext();
  const [post, setPost] = useState<PostSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${LIVE_URL}api/v1/auth/get-user-Profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user?.id }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProfile(data?.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (user?.id) fetchUser();
  }, [user?.id]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${LIVE_URL}/api/v1/post/get-user-post-by-id`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId: id }),
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();
        console.log('Fetched post:', data?.data);
        setPost(data?.data);
      } catch (error: any) {
        setError(error.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  const PostSkeleton = () => (
    <div className="post-skeleton">
      <Skeleton circle width={50} height={50} />
      <Skeleton width="60%" height={20} />
      <Skeleton width="40%" height={16} />
      <Skeleton width="100%" height={200} />
      <Skeleton width="80%" height={16} />
      <Skeleton width="95%" height={16} />
      <Skeleton width="60%" height={16} />
    </div>
  );

  if (loading) {
    return (
      <div className="skeleton-container">
        {[...Array(5)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>No post found.</div>;

  return (
    <div className="position-relative col-md-8">
     {post? <PostCard item={post} key={post.post.Id} profile={profile} />:
     <Loading loading size={24}/>}
    </div>
  );
};

export default UserPost;
