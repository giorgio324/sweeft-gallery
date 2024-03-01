import { useState, useEffect } from "react";
import axios from "axios";

type useAxiosConfigType = {
  client_id: string;
  order_by?: string;
  per_page?: number;
  page?: number;
};

export const useUnsplashAxiosGet = (
  url: string,
  { client_id, order_by, per_page, page }: useAxiosConfigType
) => {
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          params: {
            client_id,
            order_by,
            per_page,
            page,
          },
        });
        setData(response.data);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
