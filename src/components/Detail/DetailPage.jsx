import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MissingNoImage from "../../../public/missingno.png";
import Loading from "../../common/Loading";
import PokemonEditForm from "../Home/PokemonEditForm";

const ENV = import.meta.env;
const API_URL = ENV.MODE === "development" ? ENV.VITE_DEV_API_URL : ENV.VITE_PROD_API_URL;

const DetailPage = () => {
  const { id } = useParams(); // parameter
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState({
    imageUrl: MissingNoImage,
    name: "MissingNo",
    type: "???",
  });

  const fetchDetails = async () => {
    setIsLoading(true);
    try {
      const { data: res } = await axios.get(`${API_URL}/pokemons/${id}`);
      const data = res.data.attributes;
      setPokemon(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePokemon = async (formData) => {
    try {
      if (!formData.name || !formData.type) {
        throw new Error("Name and type are required");
      }

      if (pokemon) {
        const res = await axios.put(`${API_URL}/pokemons/${id}`, {
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
      await fetchDetails();
    }
  };

  const deletePokemon = async () => {
    try {
      if (pokemon) {
        const res = await axios.delete(`${API_URL}/pokemons/${id}`);
        console.log("DELETE res", res);
      } else {
        console.log("no data to delete");
      }
      // go back to list page
      navigate("/");
    } catch (err) {
      setErrorMessage(JSON.stringify(err.message));
      console.log("Error");
      console.error(err);
    } finally {
      await fetchDetails();
    }
  };

  useEffect(() => {
    const callFetchDetails = async () => {
      await fetchDetails();
    };

    callFetchDetails();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="text-center">
      <div className="inline-block bg-slate-300 shadow-xl rounded-xl py-4 px-5 mx-10 my-7">
        <img src={pokemon?.imageUrl} alt={pokemon?.name} className="object-contain w-full" />
        <p className="font-bold text-center">
          {pokemon?.name} | {pokemon?.type}
        </p>
      </div>
      {!!errorMessage && <p className="my-5 text-red-400">{errorMessage}</p>}
      {pokemon && <PokemonEditForm initialValues={pokemon} handleSubmit={updatePokemon} handleDelete={deletePokemon} />}
    </div>
  );
};

export default DetailPage;
