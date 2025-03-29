import { useState, useEffect } from 'react'
import ErrorMessage from './ErrorMessage'
import usePokemonData from '../hooks/usePokemonData'

const PokemonSearch = ({ setPokemonData: setParentPokemonData, setLoading: setParentLoading }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [limit, setLimit] = useState(20)
  
  // Usamos nuestro hook personalizado
  const { 
    pokemonData, 
    loading, 
    error, 
    searchPokemonByName, 
    fetchMultiplePokemon 
  } = usePokemonData()
  
  // Sincronizamos el estado local con el estado del padre
  useEffect(() => {
    setParentPokemonData(pokemonData)
  }, [pokemonData, setParentPokemonData])
  
  useEffect(() => {
    setParentLoading(loading)
  }, [loading, setParentLoading])
  
  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    e.preventDefault()
    searchPokemonByName(searchTerm)
  }
  
  // Función para cargar múltiples Pokémon
  const handleLoadMultiple = () => {
    fetchMultiplePokemon(limit)
  }
  
  // Cargar Pokémon al montar el componente
  useEffect(() => {
    fetchMultiplePokemon(limit)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <div className="mb-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Buscar Pokémon</h2>
      
      {error && <ErrorMessage message={error} />}
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ingresa el nombre de un Pokémon..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Buscar
          </button>
        </div>
      </form>
      
      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-3">O carga múltiples Pokémon:</h3>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-1/3">
            <label htmlFor="limit" className="block text-sm font-medium text-gray-700 mb-1">
              Cantidad a mostrar:
            </label>
            <input
              type="number"
              id="limit"
              min="1"
              max="100"
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value) || 20)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={handleLoadMultiple}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors md:self-end"
          >
            Cargar Pokémon
          </button>
        </div>
      </div>
    </div>
  )
}

export default PokemonSearch;