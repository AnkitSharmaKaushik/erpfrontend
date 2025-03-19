import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="border rounded-full overflow-hidden block">
      <div
        style={{
          width: `${progress}%`, // Correct width syntax
        //   transform: `translateX(${progress - 100}%)`, // Uncomment if needed
          color: progress < 25 ? "black" : "white",
        }}
        className={`text-right p-[2px] text-xs transition-all duration-300 
    ${progress > 100 ? "bg-red-500" : "bg-green-500"}`}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemax={200}
        aria-valuemin={0}
      >
        {progress} %
      </div>
    </div>
  );
};

export default ProgressBar;
