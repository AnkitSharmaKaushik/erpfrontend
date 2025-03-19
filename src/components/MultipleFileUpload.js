import React from "react";

function MultipleFileUpload({ className, handleFileChange, name }) {
  return (
    <div className="mt-2">
      <input
        name={name}
        type="file"
        multiple
        onChange={handleFileChange}
        className={
          "" +
          className +
          "file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 block w-full text-sm text-slate-500 rounded-md"
        }
      />
    </div>
  );
}

export default MultipleFileUpload;
