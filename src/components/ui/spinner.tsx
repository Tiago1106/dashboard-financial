import { Loader } from "lucide-react";
import classNames from "classnames";

type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  show?: boolean;
};

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const Spinner: React.FC<SpinnerProps> = ({ size = "md", show = false }) => {
  if (!show) return null;

  return (
    <Loader
      className={classNames("animate-spin text-gray-500")}
      size={sizeMap[size]}
      strokeWidth={2.5}
    />
  );
};