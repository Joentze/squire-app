import { AiOutlineLoading3Quarters } from "react-icons/ai";
interface ICircleProgress {
  className: string;
}
const CircleProgress: React.FC<ICircleProgress> = ({
  className = "w-10 h-10",
}) => {
  return (
    <AiOutlineLoading3Quarters className={`animate-spin m-auto ${className}`} />
  );
};
export default CircleProgress;
