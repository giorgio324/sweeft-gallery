import { useState } from "react";
import PopularImages from "../components/PopularImages";
import SearchedImages from "../components/SearchedImages";
import { useInfiniteQueryFetch } from "../hooks/useInfiniteQueryFetch";
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const { data, error, loading, totalPages } = useInfiniteQueryFetch(
    "https://api.unsplash.com/search/photos",
    20,
    searchQuery,
    page
  );

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
      <div className="flex justify-center items-center my-8">
        <input
          type="text"
          name="search"
          id="search"
          value={searchQuery}
          onChange={handleInputChange}
          className="p-2 border w-[300px]"
          placeholder="Search"
        />
      </div>

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            {loading && <div>loading...</div>}
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
