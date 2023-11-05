import { useEffect, useState } from "react";

const PokemonEditForm = ({ initialValues, handleSubmit, handleDelete }) => {
  console.log("initialValues in edit form", initialValues);
  const [formData, setFormData] = useState();

  const submitForm = (e) => {
    e.preventDefault();

    console.log("formData", formData);
    handleSubmit(formData);
  };

  const resetForm = () => {
    console.log("reset");
    setFormData(initialValues);
  };

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  return !formData ? (
    <></>
  ) : (
    <form onSubmit={submitForm} onReset={resetForm} className="my-4">
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
          className="border border-blue-300 rounded-lg bg-blue-200 text-black px-3 py-2 my-4 mx-3 placeholder:text-white"
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
          className="border border-blue-300 rounded-lg bg-blue-200 text-black px-3 py-2 my-4 mx-3 placeholder:text-white"
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
          className="border border-blue-300 rounded-lg bg-blue-200 text-black px-3 py-2 my-4 mx-3 placeholder:text-white"
        />
      </div>

      <div className="mt-10 flex items-center justify-center">
        <button type="submit" className="bg-blue-400 text-white px-5 py-2 rounded-full mr-5">
          Save Changes
        </button>
        <button type="reset" className="bg-slate-400 text-white px-5 py-2 rounded-full mr-5">
          Reset
        </button>
        <button onClick={handleDelete} type="button" className="bg-red-400 text-red px-5 py-2 rounded-full">
          Delete
        </button>
      </div>
    </form>
  );
};

export default PokemonEditForm;
