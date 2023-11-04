import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MissingNoImage from "../../../public/missingno.png";
import Loading from "../../common/Loading";

const ENV = import.meta.env;
const API_URL = ENV.MODE === "development" ? ENV.VITE_DEV_API_URL : ENV.VITE_PROD_API_URL;

const DetailPage = () => {
  const { id } = useParams(); // parameter
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState({
    imageUrl: MissingNoImage,
    name: "MissingNo",
    type: "???",
  });

  useEffect(() => {
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

    fetchDetails();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="inline-block bg-slate-300 shadow-xl rounded-xl py-4 px-5 mx-10 my-7">
      <img src={pokemon?.imageUrl} alt={pokemon?.name} className="object-contain w-full" />
      <p className="font-bold text-center">
        {pokemon?.name} | {pokemon?.type}
      </p>
    </div>
  );
};

export default DetailPage;
