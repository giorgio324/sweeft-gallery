import axios from "axios";
import { useEffect, useState } from "react";
import PopularImages from "../components/PopularImages";
import SearchedImages from "../components/SearchedImages";

export type ImageType = {
  id: string;
  urls: {
    regular: string;
    small: string;
    full: string;
  };
  alt_description: string;
};
export type SearchedImageType = {
  results: ImageType[];
  total: number;
  total_pages: number;
};
const PAGE_SIZE = 20;

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [searchedImages, setSearchedImages] = useState<ImageType[]>([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  useEffect(() => {
    const fetchImages = async () => {
      if (!searchQuery) return;
      try {
        const response = await axios.get<SearchedImageType>(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              client_id: import.meta.env.VITE_UNSPLASH_API_KEY,
              query: searchQuery,
              page: page,
              per_page: PAGE_SIZE,
            },
          }
        );
        if (page === 1) {
          setSearchedImages(response.data.results);
        } else {
          setSearchedImages((prevImages) => [
            ...prevImages,
            ...response.data.results,
          ]);
        }
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [searchQuery, page]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);
    setPage(1);
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
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
        placeholder="Search"
      />
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {searchQuery ? (
          <SearchedImages searchedImages={searchedImages} />
        ) : (
          <PopularImages />
        )}
      </main>
      {searchQuery && (
        <button
          onClick={loadMoreImages}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Load More
        </button>
      )}
    </>
  );
};

export default Home;
