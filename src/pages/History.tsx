import { useState } from "react";
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
  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <>
      <div className="flex justify-center items-center my-4">
        <h1 className="text-xl">Searched Items</h1>
      </div>
      <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
        {Object.keys(cache).map((key) => (
          <button
            className="px-4 py-2 bg-blue-500 rounded-md cursor-pointer"
            key={key}
            onClick={() => changeSearchQuery(key)}
          >
            {key}
          </button>
        ))}
      </div>
      <main className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchQuery && (
          <>
            <SearchedImages
              searchedImages={data}
              loading={loading}
              error={error}
              loadMoreImages={loadMoreImages}
              page={page}
              totalPages={totalPages}
            />
            {loading && <div>loading...</div>}
            {error && <div>{error}</div>}
          </>
        )}
      </main>
    </>
  );
};
export default History;
