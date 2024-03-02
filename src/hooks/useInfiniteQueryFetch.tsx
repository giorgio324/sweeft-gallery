import { useEffect, useState } from "react";
import axios from "axios";

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
export const useInfiniteQueryFetch = (
  url: string,
  per_page = 20,
  query: string,
  page: number
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ImageType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const response = await axios.get<SearchedImageType>(url, {
          params: {
            per_page,
            query,
            page,
            client_id: import.meta.env.VITE_UNSPLASH_API_KEY,
          },
        });
        if (page === 1) {
          setData(response.data.results);
          setTotalPages(response.data.total_pages);
        } else {
          setData((prevImages) => [...prevImages, ...response.data.results]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  return { loading, data, error, totalPages };
};
