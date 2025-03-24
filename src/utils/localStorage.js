const FAVORITES_KEY = 'pokemon_favorites'

// Obtener favoritos del localStorage
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY)
    return favorites ? JSON.parse(favorites) : []
  } catch (error) {
    console.error('Error al obtener favoritos:', error)
    return []
  }
}

// Añadir Pokémon a favoritos
export const addFavorite = (pokemon) => {
  try {
    const favorites = getFavorites()
    // Verificar si ya existe
    if (!favorites.some(fav => fav.id === pokemon.id)) {
      const updatedFavorites = [...favorites, pokemon]
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
    }
  } catch (error) {
    console.error('Error al añadir a favoritos:', error)
  }
}

// Eliminar Pokémon de favoritos
export const removeFavorite = (pokemonId) => {
  try {
    const favorites = getFavorites()
    const updatedFavorites = favorites.filter(fav => fav.id !== pokemonId)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
  } catch (error) {
    console.error('Error al eliminar de favoritos:', error)
  }
}