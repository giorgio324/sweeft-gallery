import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ImageType } from "../hooks/useInfiniteQueryFetch";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  image: ImageType;
};
const Modal = ({ setIsOpen, isOpen, image }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  return (
    <>
      {isOpen &&
        createPortal(
          <div className="flex justify-center items-center w-full fixed inset-0">
            <div
              className=" w-full h-full bg-black opacity-50 absolute inset-0 z-10"
              onClick={() => setIsOpen(false)}
            >
              overlay
            </div>
            <div className="bg-slate-100 z-20 p-4 shadow-md flex flex-col rounded-lg">
              <img
                src={image.urls.full}
                alt={image.alt_description}
                className="h-[600px]"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
export default Modal;
