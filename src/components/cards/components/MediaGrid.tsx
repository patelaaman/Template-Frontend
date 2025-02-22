import React from 'react';
import { Image } from 'react-bootstrap'; // or your own Image component

const MediaGrid = ({ mediaUrls }) => {
  const count = mediaUrls.length;

  // 1 image: Full width
  if (count === 1) {
    return (
      <div className="single-media">
        <Image src={mediaUrls[0]} alt="media" className="img-fluid rounded" />
      </div>
    );
  }

  // 2 images: Side-by-side
  if (count === 2) {
    return (
      <div className="d-flex gap-2">
        {mediaUrls.map((url, idx) => (
          <div key={idx} className="flex-fill">
            <Image src={url} alt="media" className="img-fluid rounded" />
          </div>
        ))}
      </div>
    );
  }

  // 3 images: Custom grid (e.g., one large image on left, two stacked on right)
  if (count === 3) {
    return (
      <div className="row g-2">
        <div className="col-8">
          <Image src={mediaUrls[0]} alt="media" className="img-fluid rounded" />
        </div>
        <div className="col-4 d-flex flex-column gap-2">
          <Image src={mediaUrls[1]} alt="media" className="img-fluid rounded" />
          <Image src={mediaUrls[2]} alt="media" className="img-fluid rounded" />
        </div>
      </div>
    );
  }

  // 4 or more images: Grid with overlay on the 4th image if more than 4
  if (count >= 4) {
    return (
      <div className="four-plus-media">
        <div className="row g-2">
          <div className="col-6">
            <Image src={mediaUrls[0]} alt="media" className="img-fluid rounded" />
          </div>
          <div className="col-6">
            <Image src={mediaUrls[1]} alt="media" className="img-fluid rounded" />
          </div>
        </div>
        <div className="row g-2 mt-2">
          <div className="col-6">
            <Image src={mediaUrls[2]} alt="media" className="img-fluid rounded" />
          </div>
          <div className="col-6 position-relative">
            <Image src={mediaUrls[3]} alt="media" className="img-fluid rounded" />
            {count > 4 && (
              <div
                className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  borderRadius: '.25rem'
                }}
              >
                <span className="text-white fs-4">+{count - 4}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Fallback if no media
  return null;
};

export default MediaGrid;
