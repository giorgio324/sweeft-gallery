import { ImageType } from "../pages/Home";
import GalleryImage from "./GalleryImage";

const SearchedImages = ({
  searchedImages,
}: {
  searchedImages: ImageType[];
}) => {
  return (
    <>
      {searchedImages.map((image) => (
        <GalleryImage key={image.id} image={image} />
      ))}
    </>
  );
};
export default SearchedImages;
