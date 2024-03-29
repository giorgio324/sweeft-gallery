import { useState } from "react";
import Modal from "./Modal";
import { ImageType } from "../hooks/useInfiniteQueryFetch";
type ImageProps = {
  image: ImageType;
  lastImageRef?: (node: HTMLImageElement | null) => void;
};
const GalleryImage = ({ image, lastImageRef }: ImageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <img
        onClick={() => setIsOpen(true)}
        src={image.urls.regular}
        alt={image.alt_description}
        className="object-cover w-[320px] h-[320px] cursor-pointer"
        ref={lastImageRef}
      />
      {isOpen && <Modal isOpen={isOpen} image={image} setIsOpen={setIsOpen} />}
    </>
  );
};
export default GalleryImage;
