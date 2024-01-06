import PokemonCreateForm from "./PokemonCreateForm"
import BackHomeButton from "../../common/BackHomeButton"

const CreatePage = () => {
  return (
    <div className="text-center">
      <BackHomeButton />
      <h1 className="my-5 text-2xl font-bold">Create a new pokemon</h1>
      <PokemonCreateForm />
    </div>
  )
}

export default CreatePage
