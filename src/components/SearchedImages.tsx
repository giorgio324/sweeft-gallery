import { ImageType } from "../pages/Home";
import GalleryImage from "./GalleryImage";

const SearchedImages = ({
  searchedImages,
}: {
  searchedImages: ImageType[];
}) => {
  return (
    <>
      {searchedImages.map((image, index) => (
        <GalleryImage key={image.id} image={image} index={index} />
      ))}
    </>
  );
};
export default SearchedImages;
