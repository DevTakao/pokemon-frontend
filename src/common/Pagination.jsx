const Pagination = ({ goPrev, goNext, isFirstPage, isLastPage }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={goPrev}
        className="py-3 px-5 rounded-full bg-blue-500 text-white disabled:bg-gray-200 disabled:text-gray-500"
        disabled={isFirstPage}
      >
        Prev
      </button>
      <button
        onClick={goNext}
        className="py-3 px-5 rounded-full bg-blue-500 text-white disabled:bg-gray-200 disabled:text-gray-500"
        disabled={isLastPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
