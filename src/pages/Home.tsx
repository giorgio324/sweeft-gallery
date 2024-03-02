import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [loading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchedImages, setSearchedImages] = useState<ImageType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastImage = useCallback(
    (node: any) => {
      if (!node || loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && totalPages > page) {
          loadMoreImages();
        }
      });
      observer.current.observe(node);
    },
    [loading, totalPages, page]
  );

  useEffect(() => {
    const fetchImages = async () => {
      if (!searchQuery) return;
      setIsLoading(true);
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
          setTotalPages(response.data.total_pages);
        } else {
          setSearchedImages((prevImages) => [
            ...prevImages,
            ...response.data.results,
          ]);
        }
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
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
          <>
            <SearchedImages
              loading={loading}
              searchedImages={searchedImages}
              lastImageRef={lastImage}
            />
            {loading && <div>loading...</div>}
          </>
        ) : (
          <PopularImages />
        )}
      </main>
    </>
  );
};

export default Home;
