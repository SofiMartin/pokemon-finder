import { useState, useEffect } from 'react'
import Header from './components/Header'
import PokemonSearch from './components/PokemonSearch'
import PokemonList from './components/PokemonList'
import FavoritesList from './components/FavoritesList'
import { getFavorites } from './utils/localStorage'

function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [limit, setLimit] = useState(20)

  // Cargar favoritos desde localStorage al iniciar
  useEffect(() => {
    const savedFavorites = getFavorites()
    setFavorites(savedFavorites)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <Header setShowFavorites={setShowFavorites} showFavorites={showFavorites} />
      
      <main className="container mx-auto px-4 py-8">
        {!showFavorites ? (
          <>
            <PokemonSearch 
              setPokemonData={setPokemonData} 
              setLoading={setLoading}
              limit={limit}
              setLimit={setLimit}
            />
            <PokemonList 
              pokemonData={pokemonData} 
              loading={loading} 
              favorites={favorites}
              setFavorites={setFavorites}
            />
          </>
        ) : (
          <FavoritesList 
            favorites={favorites} 
            setFavorites={setFavorites} 
          />
        )}
      </main>
    </div>
  )
}

export default App;