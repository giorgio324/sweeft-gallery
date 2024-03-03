import { ReactElement } from "react";
import { IconBaseProps } from "react-icons";
import Loading from "./Loading";

interface StatsProps {
  icon: ReactElement<IconBaseProps>;
  value: string | undefined;
  loading: boolean;
  error: string | null;
}

const Stats = ({ icon, value, loading, error }: StatsProps) => {
  if (loading) {
    <Loading />;
  }
  if (error) {
  }
  return (
    <div className="px-2 md:px-4 py-2 md:text-lg font-medium text-gray-900 bg-white border border-gray-200 flex flex-1 justify-center items-center text-center gap-2 md:gap-4">
      {icon}
      {error ? <p>{error}</p> : <p>{value}</p>}
    </div>
  );
};
export default Stats;
