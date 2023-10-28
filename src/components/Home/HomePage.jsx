import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../common/Loading";
import PokemonForm from "./PokemonForm";
import PokemonEditForm from "./PokemonEditForm";

const API_URL = "http://localhost:1337/api";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setErrorMessage("");
      setIsLoading(true);
      const { data: res } = await axios.get(
        `${API_URL}/pokemons?pagination[pageSize]=1&pagination[page]=${pageNo}&sort[0]=name:asc`
      );

      const data = res.data;
      const pagination = res.meta.pagination;

      console.log("data", data);
      setData(data);
      setIsFirstPage(pagination.page === 1);
      setIsLastPage(pagination.page === pagination.pageCount);
    } catch (err) {
      setErrorMessage(JSON.stringify(err.message));
      console.log("Error");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createPokemon = async (formData) => {
    try {
      if (!formData.name || !formData.type) {
        throw new Error("Name and type are required");
      }

      const res = await axios.post(`${API_URL}/pokemons`, {
        data: formData,
      });

      console.log("POST res:", res);
    } catch (err) {
      setErrorMessage(JSON.stringify(err.message));
      console.log("Error");
      console.error(err);
    }
  };

  const updatePokemon = async (formData) => {
    try {
      console.log("updatePokemon", formData, data[0]);
      if (!formData.name || !formData.type) {
        throw new Error("Name and type are required");
      }

      if (data && data[0]) {
        const res = await axios.put(`${API_URL}/pokemons/${data[0].id}`, {
          data: formData,
        });
        console.log("PUT res", res);
      } else {
        console.log("no data to update");
      }
    } catch (err) {
      setErrorMessage(JSON.stringify(err.message));
      console.log("Error");
      console.error(err);
    } finally {
      await fetchData();
    }
  };

  const deletePokemon = async () => {
    try {
      console.log("deletePokemon", data[0]);

      // archive
      if (data && data[0]) {
        const res = await axios.delete(`${API_URL}/pokemons/${data[0].id}`);
        console.log("DELETE res", res);
      } else {
        console.log("no data to delete");
      }
    } catch (err) {
      setErrorMessage(JSON.stringify(err.message));
      console.log("Error");
      console.error(err);
    } finally {
      await fetchData();
    }
  };

  const goPrev = () => {
    setPageNo((prev) => prev - 1);
  };

  const goNext = () => {
    setPageNo((prev) => prev + 1);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);

  return (
    <div className="p-20">
      {isLoading && <Loading />}
      {!!errorMessage && <p className="my-5 text-red-400">{errorMessage}</p>}
      <div className="flex justify-center">
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

      <div className="flex justify-between">
        {data && data[0] && (
          <PokemonEditForm initialValues={data[0]} handleSubmit={updatePokemon} handleDelete={deletePokemon} />
        )}
        <PokemonForm handleSubmit={createPokemon} />
      </div>

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
    </div>
  );
};

export default HomePage;
