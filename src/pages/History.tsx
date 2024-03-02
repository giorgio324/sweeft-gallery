import { useCallback, useRef, useState } from "react";
import { useInfiniteQueryFetch } from "../hooks/useInfiniteQueryFetch";
import SearchedImages from "../components/SearchedImages";

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const { data, error, loading, totalPages, cache } = useInfiniteQueryFetch(
    "https://api.unsplash.com/search/photos",
    20,
    searchQuery,
    page
  );
  const changeSearchQuery = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };
  const observer = useRef<IntersectionObserver | null>(null);

  const lastImage = useCallback(
    (node: any) => {
      if (!node || loading || error) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && totalPages > page) {
          loadMoreImages();
          console.log("last");
        }
      });
      observer.current.observe(node);
    },
    [loading, totalPages]
  );
  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <>
      {Object.keys(cache).map((key, i) => (
        <button
          className="p-4 bg-blue-500 rounded-lg"
          key={i}
          onClick={() => changeSearchQuery(key)}
        >
          {key}
        </button>
      ))}
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchQuery && (
          <>
            <SearchedImages searchedImages={data} lastImageRef={lastImage} />
            {loading && <div>loading...</div>}
            {error && <div>{error}</div>}
          </>
        )}
      </main>
    </>
  );
};
export default History;
