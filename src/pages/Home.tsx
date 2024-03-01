import axios from "axios";
import { useState } from "react";
import PopularImages from "../components/PopularImages";
import GalleryImage from "../components/GalleryImage";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [queryImages, setQueryImages] = useState<ImageType[]>([]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);

    if (!inputValue) return;

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            client_id: import.meta.env.VITE_UNSPLASH_API_KEY,
            query: inputValue,
            page: 1,
            per_page: 20,
          },
        }
      );
      setQueryImages(response.data.results);
      console.log("data fetched");
    } catch (error) {
      console.error("Error fetching popular images:", error);
    }
  };
  return (
    <>
      <input
        type="text"
        name="search"
        id="search"
        value={searchQuery}
        onChange={handleInputChange}
        className="p-2 border"
        placeholder="search"
      />
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {searchQuery ? (
          queryImages.map((image) => (
            <GalleryImage key={image.id} image={image} />
          ))
        ) : (
          <PopularImages />
        )}
      </main>
    </>
  );
};
export default Home;
