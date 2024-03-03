import { useEffect, useState } from "react";
import { ImageType } from "../hooks/useInfiniteQueryFetch";
import axios from "axios";
import GalleryImage from "./GalleryImage";

const PopularImages = () => {
  const [popularImages, setPopularImages] = useState<ImageType[]>([]);

  useEffect(() => {
    const fetchPopularImages = async () => {
      try {
        const response = await axios.get("https://api.unsplash.com/photos", {
          params: {
            client_id: import.meta.env.VITE_UNSPLASH_API_KEY,
            order_by: "popular",
            per_page: 20,
          },
        });
        setPopularImages(response.data);
      } catch (error) {
        console.error("Error fetching popular images:", error);
      }
    };
    fetchPopularImages();
  }, []);

  return (
    <>
      {popularImages.map((image) => (
        <GalleryImage key={image.id} image={image} />
      ))}
    </>
  );
};
export default PopularImages;
