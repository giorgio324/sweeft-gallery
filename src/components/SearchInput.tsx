import { useRef } from "react";
import debounce from "lodash.debounce";
import { IoIosSearch } from "react-icons/io";
type SearchInputProps = {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput = ({ setSearchQuery }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedUpdateState = debounce((inputValue: string) => {
    setSearchQuery(inputValue.toLowerCase());
  }, 500);

  const handleChange = () => {
    const inputValue = inputRef.current?.value || "";
    debouncedUpdateState(inputValue);
  };
  return (
    <div className="max-w-[300px] md:max-w-[400px] mx-auto my-8">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <IoIosSearch size={22} className="text-gray-400" />
        </div>
        <input
          type="search"
          id="search"
          name="search"
          ref={inputRef}
          onChange={handleChange}
          className="block w-full p-3 ps-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Images"
        />
      </div>
    </div>
  );
};

export default SearchInput;
