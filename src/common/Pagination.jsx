const Pagination = ({
  pageCount,
  goPrev,
  goNext,
  isFirstPage,
  isLastPage,
  handlePageChange,
  currentPage,
}) => {
  const pageMapper = Array.from({ length: pageCount })

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={goPrev}
        className="px-5 py-3 text-white bg-blue-500 rounded-full disabled:bg-gray-200 disabled:text-gray-500"
        disabled={isFirstPage}
      >
        Prev
      </button>

      {pageMapper.map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => handlePageChange(i + 1)}
          className={`w-[25px] h-[25px] inline-flex items-center justify-center p-5 rounded-full border border-black hover:bg-amber-300 mx-3 ${
            i + 1 === currentPage ? "bg-slate-300" : ""
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={goNext}
        className="px-5 py-3 text-white bg-blue-500 rounded-full disabled:bg-gray-200 disabled:text-gray-500"
        disabled={isLastPage}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
