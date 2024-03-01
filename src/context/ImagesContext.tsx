import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ImageType } from "../pages/Home";

type ImagesContextType = {
  cache: { key: string; value: ImageType[] } | null;
  setCache: Dispatch<
    SetStateAction<{ key: string; value: ImageType[] } | null>
  >;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

const ImagesContext = createContext<ImagesContextType>({
  cache: null,
  setCache: () => {},
  page: 1,
  setPage: () => {},
});

export const ImagesProvider = ({ children }: { children: ReactNode }) => {
  const [cache, setCache] = useState<{
    key: string;
    value: ImageType[];
  } | null>(null);
  const [page, setPage] = useState<number>(1);
  return (
    <ImagesContext.Provider
      value={{
        cache,
        setCache,
        page,
        setPage,
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
};

export const useImagesContext = () => useContext(ImagesContext);
