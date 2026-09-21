// ProjectLightbox.tsx
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface ProjectLightboxProps {
  mediaList: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectLightbox({
  mediaList,
  currentIndex,
  isOpen,
  onClose,
}: ProjectLightboxProps) {
  const slides = mediaList.map((src) =>
    src.includes(".mp4")
      ? {
          type: "video" as const,
          width: 1280,
          height: 720,
          sources: [{ src, type: "video/mp4" }],
        }
      : { src },
  );

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      slides={slides}
      index={currentIndex}
      plugins={[Video, Zoom]}
      controller={{
        closeOnBackdropClick: true,
      }}
      animation={{ zoom: 1000, fade: 500 }}
      zoom={{ zoomInMultiplier: 1.5 }}
    />
  );
}
