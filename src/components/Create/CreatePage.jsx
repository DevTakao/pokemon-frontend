import PokemonCreateForm from "./PokemonCreateForm"
import BackHomeButton from "../../common/BackHomeButton"

const PageHeader = () => {
  return <h1 className="my-5 text-2xl font-bold">Create a new pokemon</h1>
}

const CreatePage = () => {
  return (
    <div className="text-center">
      <BackHomeButton />
      <PageHeader />
      <PokemonCreateForm />
    </div>
  )
}

export default CreatePage
