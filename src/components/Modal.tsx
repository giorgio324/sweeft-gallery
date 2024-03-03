import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ImageType } from "../hooks/useInfiniteQueryFetch";
import axios from "axios";
import { FaEye, FaThumbsUp } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import Stats from "./Stats";
type ModalProps = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  image: ImageType;
};

type ImageStats = {
  likes: {
    total: string;
  };
  downloads: {
    total: string;
  };
  views: {
    total: string;
  };
};
const Modal = ({ setIsOpen, isOpen, image }: ModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageStats, setImageStats] = useState<ImageStats | null>(null);
  // this useffect controls so that user wont scroll down when modal is open
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
  // this useffect gets the image stats
  useEffect(() => {
    const fetchImageStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.unsplash.com/photos/${image.id}/statistics`,
          {
            params: {
              client_id: import.meta.env.VITE_UNSPLASH_API_KEY,
            },
          }
        );
        setImageStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchImageStats();
  }, []);
  return (
    <>
      {createPortal(
        <div className="flex justify-center items-center w-full fixed inset-0">
          <div
            className="w-full h-full bg-black opacity-50 absolute inset-0 z-10"
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
            <div className="flex justify-between">
              <Stats
                icon={<FaEye size={32} />}
                value={imageStats?.views?.total}
              />
              <Stats
                icon={<IoMdDownload size={32} />}
                value={imageStats?.downloads?.total}
              />
              <Stats
                icon={<FaThumbsUp size={32} />}
                value={imageStats?.likes?.total}
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
export default Modal;
