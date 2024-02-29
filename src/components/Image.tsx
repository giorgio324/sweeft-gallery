import { useState } from "react";
import { ImageType } from "../pages/Home";
import Modal from "./Modal";
type ImageProps = {
  image: ImageType;
};
const Image = ({ image }: ImageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <img
        onClick={() => setIsOpen(true)}
        src={image.urls.regular}
        alt={image.alt_description}
        className="object-cover w-full h-full"
      />
      <Modal isOpen={isOpen} image={image.urls.small} setIsOpen={setIsOpen} />
    </>
  );
};
export default Image;
