import { useState } from "react";

// eslint-disable-next-line react/prop-types
const PokemonForm = ({ handleSubmit }) => {
  const initialValues = {
    name: "",
    type: "",
    imageUrl: "#",
  };
  const [formData, setFormData] = useState(initialValues);

  const submitForm = (e) => {
    e.preventDefault();

    console.log("formData", formData);
    handleSubmit(formData);
  };

  const resetForm = () => {
    console.log("reset");
    setFormData(initialValues);
  };

  return (
    <form onSubmit={submitForm} onReset={resetForm} className="my-10">
      <h1>Please fill the form to create new pokemon.</h1>

      <div>
        <label htmlFor="pokemonName" className="w-[110px] inline-block font-bold">
          Name:
        </label>
        <input
          type="text"
          placeholder="Pikachu"
          name="pokemonName"
          value={formData.name}
          onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
          className="border border-pink-300 rounded-lg bg-pink-300 text-black px-10 py-2 my-10 mx-3 placeholder:text-white"
        />
      </div>

      <div>
        <label htmlFor="pokemonType" className="w-[110px] inline-block font-bold">
          Type:
        </label>
        <input
          type="text"
          placeholder="Electric"
          name="pokemonType"
          value={formData.type}
          onChange={(event) => setFormData((prev) => ({ ...prev, type: event.target.value }))}
          className="border border-pink-300 rounded-lg bg-pink-300 text-black px-10 py-2 my-10 mx-3 placeholder:text-white"
        />
      </div>

      <div>
        <label htmlFor="pokemonImageUrl" className="w-[110px] inline-block font-bold">
          Image URL:
        </label>
        <input
          type="text"
          placeholder="Electric"
          name="pokemonImageUrl"
          value={formData.imageUrl}
          onChange={(event) => setFormData((prev) => ({ ...prev, imageUrl: event.target.value }))}
          className="border border-pink-300 rounded-lg bg-pink-300 text-black px-10 py-2 my-10 mx-3 placeholder:text-white"
        />
      </div>

      <button type="submit" className="bg-pink-400 text-white px-5 py-2 rounded-full mr-5">
        Create New Pokemon
      </button>
      <button type="reset" className="bg-slate-400 text-white px-5 py-2 rounded-full">
        Clear
      </button>
    </form>
  );
};

export default PokemonForm;