import { ImageType } from "../pages/Home";
import GalleryImage from "./GalleryImage";

const SearchedImages = ({
  searchedImages,
  lastImageRef,
}: {
  searchedImages: ImageType[];
  lastImageRef: (node: HTMLImageElement | null) => void;
  loading: boolean;
}) => {
  return (
    <>
      {searchedImages.map((image, index) => {
        if (searchedImages.length === index + 1) {
          return (
            <GalleryImage
              key={image.id}
              image={image}
              lastImageRef={lastImageRef}
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
