import { Spin } from "antd";

const Loader = ({ text = "Loading content..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Spin size="large" />
      <p className="mt-4 text-sm text-gray-500 tracking-wide">
        {text}
      </p>
    </div>
  );
};

export default Loader;
