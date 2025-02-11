import { Image } from "react-bootstrap";
import banner from "@/assets/images/bg/sample investor badge.svg";

const ImageZoom = ({
  src,
  zoom,
  rotate,
  width = "55px",
  height = "55px",
}: {
  src: string;
  zoom: number;
  rotate: number;
  width?: string;
  height?: string;
}) => {
  return (
    <div
      style={{
        position: "relative",
        border: "3px solid white",
        width: width,
        height: height,
        borderRadius: "50%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Profile Image */}
      <Image
        src={src}
        alt="Profile"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${(zoom || 50) / 50}) rotate(${(rotate || 50) - 50}deg)`,
        }}
      />

      {/* Frame (Banner) */}
      <img
        src={banner}
        alt="Frame"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          objectFit: "cover", // Ensures the frame fits properly
          zIndex: 2, // Ensures frame is on top
        }}
      />
    </div>
  );
};

export default ImageZoom;
