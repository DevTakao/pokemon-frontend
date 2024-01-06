const PokemonDetails = ({ pokemon }) => {
  return (
    <>
      <div className="block max-w-[320px] bg-slate-300 shadow-md rounded-xl py-4 px-5 mx-auto my-7">
        <img
          src={pokemon?.imageUrl}
          alt={pokemon?.name}
          className="object-contain w-full"
        />
        <p className="font-bold text-center">{pokemon?.name}</p>
      </div>
      <span className="px-4 py-3 text-white rounded-full bg-slate-400">
        {pokemon?.type}
      </span>
    </>
  )
}

export default PokemonDetails
