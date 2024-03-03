import { useEffect, useState } from "react";
import { ImageType } from "../hooks/useInfiniteQueryFetch";
import axios from "axios";
import GalleryImage from "./GalleryImage";
import Loading from "./Loading";

const PopularImages = () => {
  const [popularImages, setPopularImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchPopularImages = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://api.unsplash.com/photos", {
          params: {
            client_id: import.meta.env.VITE_UNSPLASH_API_KEY,
            order_by: "popular",
            per_page: 20,
          },
        });
        setPopularImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching popular images:", error);
        console.error("Error fetching data:", error);
        if (error instanceof Error) {
          setError(error.message);
        }
        setLoading(false);
      }
    };
    fetchPopularImages();
  }, []);
  if (loading) {
    <Loading />;
  }
  if (error) {
    <h1>{error}</h1>;
  }
  return (
    <>
      {popularImages.map((image) => (
        <GalleryImage key={image.id} image={image} />
      ))}
    </>
  );
};
export default PopularImages;
