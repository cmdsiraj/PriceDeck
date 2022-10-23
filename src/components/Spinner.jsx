const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-4">
      <h1>Please wait while we fetch the Data</h1>
      <div className="w-20 border-purple-900 h-20 border-solid border-t-4 border-l-4 border-b-4 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
