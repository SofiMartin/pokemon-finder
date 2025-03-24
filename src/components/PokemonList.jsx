import PokemonCard from './PokemonCard'
import Loader from './Loader'

const PokemonList = ({ pokemonData, loading, favorites, setFavorites }) => {
  // Verificar si un Pokémon está en favoritos
  const isFavorite = (id) => {
    return favorites.some(fav => fav.id === id)
  }
  
  if (loading) {
    return <Loader />
  }
  
  if (pokemonData.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">No se encontraron Pokémon. Intenta con otra búsqueda.</p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pokemonData.map((pokemon) => (
        <PokemonCard 
          key={pokemon.id} 
          pokemon={pokemon} 
          isFavorite={isFavorite(pokemon.id)}
          setFavorites={setFavorites}
        />
      ))}
    </div>
  )
}

export default PokemonList;