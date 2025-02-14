import React, { CSSProperties, useState } from 'react';
import PostModal from './PostModal';
import { PostSchema, Like } from '../PostCard';
import { UserProfile } from '@/app/(social)/feed/(container)/home/page';

export interface UtilType {
  commentCount: number
  setCommentCount: React.Dispatch<React.SetStateAction<number>>
  likeStatus: boolean
  setLikeStatus: React.Dispatch<React.SetStateAction<boolean>>
  allLikes: Like[]
  setAllLikes: React.Dispatch<React.SetStateAction<Like[]>>
  comments: []
  setComments: React.Dispatch<React.SetStateAction<[]>>
  likeCount: number
  setLikeCount: React.Dispatch<React.SetStateAction<number>>
}

export interface StyleProps {
  container: CSSProperties;
  fullImage: CSSProperties;
  twoImageContainer: CSSProperties;
  twoImageItem: CSSProperties;
  threeImageContainer: CSSProperties;
  threeImageMainImage: CSSProperties;
  threeImageSideContainer: CSSProperties;
  threeImageTopImage: CSSProperties;
  threeImageBottomImageContainer: CSSProperties;
  overlayContainer: CSSProperties;
  overlayText: CSSProperties;
}


const MediaGallery = ({
  item,
  media,
  profile,
  setShowRepostOp,
  utils
}
  :
  {
    item: PostSchema;
    media: string[];
    profile: UserProfile;
    setShowRepostOp: React.Dispatch<React.SetStateAction<boolean>>
    utils: UtilType
  }
) => {
  const [imageError, setImageError] = useState(false);
  const [showPostModal, setShowPostModal] = useState<boolean>(false);
  const [src, setSrc] = useState<number>(0);
  if (!media || media.length === 0) return null;

  // function handleClick(src: number): void {
  //   console.log('click')
  //   setSrc(src);
  //   setShowPostModal(true);
  // }

  const styles: StyleProps = {
    container: {
      position: 'relative',
      width: '100%',
      height: 'auto',
      maxHeight: '600px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1px', // Adding space between images
      overflow: 'hidden',
    },
    fullImage: {
      width: '100%',
      height: '100%',
      position: 'relative',
      maxHeight: '600px',
      objectFit: 'contain',
      cursor: 'pointer',
      margin: '1px', // Add space between images
      overflow: 'hidden',
      zIndex: 2,
    },
    twoImageContainer: {
      display: 'flex',
      width: '100%',
      height: '450px',
      gap: '1px', // Adding space between images
    },
    twoImageItem: {
      width: '50%',
      height: '100%',
      objectFit: 'cover',
      cursor: 'pointer',
      margin: '1px', // Add space between images
    },
    threeImageContainer: {
      display: 'flex',
      width: '100%',
      height: '450px',
      gap: '1px', // Adding space between images
    },
    threeImageMainImage: {
      width: '50%',
      height: '100%',
      objectFit: 'cover',
      cursor: 'pointer',
      margin: '1px', // Add space between images
    },
    threeImageSideContainer: {
      width: '50%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '1px', // Adding space between images
    },
    threeImageTopImage: {
      width: '100%',
      height: '50%',
      objectFit: 'fill',
      cursor: 'pointer',
      margin: '1px', // Add space between images
    },
    threeImageBottomImageContainer: {
      width: '100%',
      height: '50%',
      position: 'relative',
      cursor: 'pointer',
      margin: '1px', // Add space between images
    },
    overlayContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlayText: {
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
    }
  };


  const renderMedia = (mediaSrc: string, index: number) => {
    return mediaSrc.endsWith(".mp4") || mediaSrc.endsWith(".webm") || mediaSrc.endsWith(".ogg") ? (
      <video
        key={index}
        controls
        onClick={() => handleClick(index)}
        onError={(e) => {
          console.error(`Error loading video: ${mediaSrc}`, e);
          alert("This video format is not supported.");
        }}
        style={{
          width: "100%",
          height: "100%",
          maxHeight: "600px",
          objectFit: "contain",
          position: "relative",
          zIndex: 2,
          cursor: "pointer",
          margin: "1px",
        }}
        className="gallery-item"
        data-src={mediaSrc}
      >
        <source src={mediaSrc} type="video/mp4" />
        <source src={mediaSrc} type="video/webm" />
        <source src={mediaSrc} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    ) : (
      <img
        key={index}
        src={mediaSrc}
        onClick={() => handleClick(index)}
        onError={() => setImageError(true)}
        alt="unsupported format"
        style={{
          width: "100%",
          height: "100%",
          maxHeight: "600px",
          objectFit: "contain",
          position: "relative",
          zIndex: 2,
          cursor: "pointer",
          margin: "1px",
        }}
        className="gallery-item"
        data-src={mediaSrc}
      />
    );
  };


  const [errorStates, setErrorStates] = useState<boolean[]>(new Array(media.length).fill(false));

  if (!media || media.length === 0) return null;

  // Function to determine if a media item is an image or a video
  const isVideo = (src: string) => {
    return /\.(mp4|webm|ogg)$/i.test(src);
  };

  const handleError = (index: number) => {
    setErrorStates((prev) => {
      const newErrors = [...prev];
      newErrors[index] = true;
      return newErrors;
    });
  };

  const handleClick = (index: number) => {
    console.log("Clicked on media index:", index);
    setSrc(index);
    setShowPostModal(true);
  };

  const renderMediaItem = (src: string, index: number) => {
    if (errorStates[index]) {
      return  <video
      key={index}
      controls
      onClick={() => handleClick(index)}
      onError={() => handleError(index)}
      className="gallery-item"
      data-src={src}
      style={{ width: "100%", height: "100%" }}
    >
      <source src={src} type="video/mp4" />
      <source src={src} type="video/webm" />
      <source src={src} type="video/ogg" />
      Your browser does not support the video tag.
    </video>;
    }

    return isVideo(src) ? (
      <video
        key={index}
        controls
        onClick={() => handleClick(index)}
        onError={() => handleError(index)}
        className="gallery-item"
        data-src={src}
        style={{ width: "100%", height: "100%" }}
      >
        <source src={src} type="video/mp4" />
        <source src={src} type="video/webm" />
        <source src={src} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    ) : (
      <img
        key={index}
        src={src}
        alt={`Media ${index + 1}`}
        onClick={() => handleClick(index)}
        onError={() => handleError(index)}
        className="gallery-item"
        data-src={src}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  };

  const renderGallery = () => {
    switch (media.length) {
      case 1:
        return <div style={styles.container}>{renderMediaItem(media[0], 0)}</div>;

      case 2:
        return (
          <div style={styles.twoImageContainer}>
            {media.map((src, index) => (
              <div key={index} style={styles.twoImageItem}>
                {renderMediaItem(src, index)}
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div style={styles.threeImageContainer}>
            <div style={styles.threeImageMainImage}>{renderMediaItem(media[0], 0)}</div>
            <div style={styles.threeImageSideContainer}>
              <div style={styles.threeImageTopImage}>{renderMediaItem(media[1], 1)}</div>
              <div style={styles.threeImageBottomImageContainer}>{renderMediaItem(media[2], 2)}</div>
            </div>
          </div>
        );

      default:
        return (
          <div style={styles.threeImageContainer}>
            <div style={styles.threeImageMainImage}>{renderMediaItem(media[0], 0)}</div>
            <div style={styles.threeImageSideContainer}>
              <div style={styles.threeImageTopImage}>{renderMediaItem(media[1], 1)}</div>
              <div style={styles.threeImageBottomImageContainer}>
                {renderMediaItem(media[2], 2)}
                {media.length > 3 && (
                  <div style={styles.overlayContainer} onClick={() => handleClick(2)}>
                    <span style={styles.overlayText}>+{media.length - 3} More</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

 



  return (
    <div style={{ marginBottom: '10px' }}>
      <PostModal
        show={showPostModal}
        handleClose={() => setShowPostModal(false)}
        imageIndex={src}
        item={item}
        profile={profile}
        media={media}
        showRepostOp={false}
        utils={utils}
        setShowRepostOp={setShowRepostOp}
      />
      {renderGallery()}
      {media.length > 3 && (
        <div style={{ display: 'none' }}>
          {media.slice(3).map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Image ${index + 4}`}
              className="gallery-item"
              data-src={src}
            />
          ))}
        </div>
      )}
    </div>
  );
  return <>{renderGallery()}</>;
};

export default MediaGallery;