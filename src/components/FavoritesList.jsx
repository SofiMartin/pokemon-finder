import PokemonCard from './PokemonCard'

const FavoritesList = ({ favorites, setFavorites }) => {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Mis Pokémon Favoritos</h2>
        <p className="text-xl text-gray-600">No tienes Pokémon favoritos aún.</p>
        <p className="text-gray-500 mt-2">Explora y agrega Pokémon a tus favoritos.</p>
      </div>
    )
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Mis Pokémon Favoritos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((pokemon) => (
          <PokemonCard 
            key={pokemon.id} 
            pokemon={pokemon} 
            isFavorite={true}
            setFavorites={setFavorites}
          />
        ))}
      </div>
    </div>
  )
}

export default FavoritesList;