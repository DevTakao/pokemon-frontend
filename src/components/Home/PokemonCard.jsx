const PokemonCard = ({ pokemon, handleClick }) => {
  return (
    <div
      key={pokemon.id}
      onClick={handleClick}
      className="flex items-center bg-slate-300 shadow-lg rounded-xl py-4 px-5 mx-10 my-3 cursor-pointer border-2 border-transparent hover:border-blue-400"
    >
      <img
        src={pokemon?.attributes?.imageUrl}
        alt={pokemon?.attributes?.name}
        className="object-contain w-[75px] ml-10 mr-20"
      />
      <span className="text-xl font-medium">{pokemon?.attributes?.name}</span>
    </div>
  );
};

export default PokemonCard;
