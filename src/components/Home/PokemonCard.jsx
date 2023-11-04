const PokemonCard = ({ pokemon, handleClick }) => {
  return (
    <div
      key={pokemon.id}
      onClick={handleClick}
      className="inline-block bg-slate-300 shadow-xl rounded-xl py-4 px-5 mx-10 my-7 cursor-pointer hover:brightness-75"
    >
      <img src={pokemon?.attributes?.imageUrl} alt={pokemon?.attributes?.name} className="object-contain w-[75px]" />
      {pokemon?.attributes?.name}
    </div>
  );
};

export default PokemonCard;
