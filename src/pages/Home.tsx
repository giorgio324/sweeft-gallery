import { useState } from "react";
import PopularImages from "../components/PopularImages";
import SearchedImages from "../components/SearchedImages";
import { useInfiniteQueryFetch } from "../hooks/useInfiniteQueryFetch";
import SearchInput from "../components/SearchInput";
import Loading from "../components/Loading";
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const { data, error, loading, totalPages } = useInfiniteQueryFetch(
    "https://api.unsplash.com/search/photos",
    20,
    searchQuery,
    page
  );

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <SearchInput setSearchQuery={setSearchQuery} />
      {!searchQuery && (
        <div className="flex flex-col justify-center items-center my-4">
          <h2 className="font-semibold text-xl">20 most popular images</h2>
          <p className="text-lg">type in search to find more</p>
        </div>
      )}
      <main className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
        {searchQuery ? (
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
        ) : (
          <PopularImages />
        )}
      </main>
    </>
  );
};

export default Home;
