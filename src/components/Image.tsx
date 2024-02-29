import { ImageType } from "../pages/Home";
const Image = ({ image }: { image: ImageType }) => {
  return (
    <img
      src={image.urls.regular}
      alt={image.alt_description}
      className="object-cover w-full h-full"
    />
  );
};
export default Image;
