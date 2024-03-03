import { IoIosSearch } from "react-icons/io";
type SearchInputProps = {
  value: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const SearchInput = ({ value, handleInputChange }: SearchInputProps) => {
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
          value={value}
          onChange={handleInputChange}
          className="block w-full p-3 ps-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Images"
        />
      </div>
    </div>
  );
};

export default SearchInput;
