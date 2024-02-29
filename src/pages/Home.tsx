import axios from "axios";
import { useEffect, useState } from "react";
import Image from "../components/Image";

export type ImageType = {
  id: string;
  urls: {
    regular: string;
    small: string;
    full: string;
  };
  alt_description: string;
};

const Home = () => {
  const [images, setImages] = useState<ImageType[]>([]);
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
        setImages(response.data);
        console.log("data fetched");
      } catch (error) {
        console.error("Error fetching popular images:", error);
      }
    };
    fetchPopularImages();
  }, []);
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image) => (
        <Image key={image.id} image={image} />
      ))}
    </main>
  );
};
export default Home;
