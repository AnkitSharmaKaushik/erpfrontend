const ToggleButton = ({ toggleLabel, showChart, setShowChart }) => {
  return (
    <div className="flex justify-between items-center m-1">
      <button
        onClick={() => setShowChart(!showChart)}
        className={`w-10 h-4 flex items-center rounded-full p-1 transition duration-300 m-1 ${
          showChart ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-3 h-3 bg-white rounded-full shadow-md transform transition ${
            showChart ? "translate-x-5" : "translate-x-0"
          }`}
        ></div>
      </button>
      <label className="text-xs">{toggleLabel}</label>
    </div>
  );
};

export default ToggleButton;
