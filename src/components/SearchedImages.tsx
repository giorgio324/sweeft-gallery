import { useCallback, useRef } from "react";
import { ImageType } from "../hooks/useInfiniteQueryFetch";
import GalleryImage from "./GalleryImage";

type SearchedImagesProps = {
  searchedImages: ImageType[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  page: number;
  loadMoreImages: () => void;
};

const SearchedImages = ({
  loading,
  error,
  totalPages,
  searchedImages,
  page,
  loadMoreImages,
}: SearchedImagesProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastImage = useCallback(
    (node: any) => {
      if (!node || loading || error) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && totalPages > page) {
          loadMoreImages();
        }
      });
      observer.current.observe(node);
    },
    [loading, totalPages]
  );

  return (
    <>
      {searchedImages.map((image, index) => {
        if (searchedImages.length === index + 1) {
          return (
            <GalleryImage
              key={image.id}
              image={image}
              lastImageRef={lastImage}
            />
          );
        } else {
          return <GalleryImage key={image.id} image={image} />;
        }
      })}
    </>
  );
};
export default SearchedImages;
