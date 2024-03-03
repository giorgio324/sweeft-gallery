import { useState } from "react";
import { useInfiniteQueryFetch } from "../hooks/useInfiniteQueryFetch";
import SearchedImages from "../components/SearchedImages";
import Loading from "../components/Loading";

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

  // Checks if cache has any keys
  const isCacheEmpty = Object.keys(cache).length === 0;

  return (
    <>
      <div className="flex justify-center items-center my-4">
        <h1 className="text-xl">Searched Items</h1>
      </div>
      <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
        {isCacheEmpty ? (
          <h2 className="text-xl font-bold py-4">Search history is empty</h2>
        ) : (
          Object.keys(cache).map((key) => (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mb-2"
              key={key}
              onClick={() => changeSearchQuery(key)}
            >
              {key}
            </button>
          ))
        )}
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
            {loading && <Loading />}
            {error && <div>{error}</div>}
          </>
        )}
      </main>
    </>
  );
};
export default History;
