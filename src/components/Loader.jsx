const Loader = () => {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        <p className="ml-4 text-xl font-semibold text-blue-600">Cargando Pokémon...</p>
      </div>
    )
  }
  
  export default Loader;