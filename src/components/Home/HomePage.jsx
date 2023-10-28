import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../common/Loading";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    console.log("fetchData for page:", pageNo);
    try {
      setIsError(false);
      setIsLoading(true);
      const { data: res } = await axios.get(
        `http://localhost:1337/api/pokemons?pagination[pageSize]=1&pagination[page]=${pageNo}&sort[0]=name:asc`
      );

      const data = res.data;
      const pagination = res.meta.pagination;

      setData(data);
      setIsFirstPage(pagination.page === 1);
      setIsLastPage(pagination.page === pagination.pageCount);
    } catch (err) {
      setIsError(true);
      console.log("Error");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // const addData = async () => {
  //   const { status } = await axios.post("http://localhost:1337/api/pokemons", {
  //     data: {
  //       description: "task 1 description",
  //       name: "Task 1 Name",
  //     },
  //   });

  //   console.log("POST Status:", status);
  // };

  const goPrev = () => {
    setPageNo((prev) => prev - 1);
  };

  const goNext = () => {
    setPageNo((prev) => prev + 1);
  };

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  return (
    <div className="p-20">
      {isLoading && <Loading />}
      {isError && <p className="my-5 text-red-400">Unexpected error occured.</p>}
      <div>
        {Array.isArray(data) &&
          data.map((pokemon) => (
            <div key={pokemon.id} className="inline-block bg-slate-300 shadow-xl rounded-xl py-4 px-5 mx-10 my-7">
              <img
                src={pokemon?.attributes?.imageUrl}
                alt={pokemon?.attributes?.name}
                className="object-contain w-[75px]"
              />
              {pokemon?.attributes?.name} | {pokemon?.attributes?.type}
            </div>
          ))}
      </div>

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

export default HomePage;
