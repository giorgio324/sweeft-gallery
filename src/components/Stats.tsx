import { ReactElement } from "react";
import { IconBaseProps } from "react-icons";

interface StatsProps {
  icon: ReactElement<IconBaseProps>;
  value: string | undefined;
}

const Stats = ({ icon, value }: StatsProps) => {
  return (
    <div className="flex justify-center items-center gap-8 border rounded-lg border-blue-500 w-[300px]">
      {icon}
      <p>{value}</p>
    </div>
  );
};
export default Stats;
