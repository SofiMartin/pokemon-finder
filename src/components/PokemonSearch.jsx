import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import ErrorMessage from './ErrorMessage'

const PokemonSearch = ({ setPokemonData, setLoading, limit, setLimit }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')
  
  // Función para buscar por nombre
  const searchByName = async (e) => {
    e.preventDefault()
    
    if (!searchTerm.trim()) {
      toast.error('Por favor ingresa un nombre de Pokémon')
      setError('Debes ingresar un nombre de Pokémon para realizar la búsqueda')
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      // Usamos axios para buscar por nombre
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
      
      // Si es exitoso, formatear los datos
      const pokemon = {
        id: response.data.id,
        name: response.data.name,
        image: response.data.sprites.other['official-artwork'].front_default || response.data.sprites.front_default,
        types: response.data.types.map(type => type.type.name),
        height: response.data.height / 10, // Convertir a metros
        weight: response.data.weight / 10, // Convertir a kg
        abilities: response.data.abilities.map(ability => ability.ability.name),
        stats: response.data.stats.map(stat => ({
          name: stat.stat.name,
          value: stat.base_stat
        }))
      }
      
      setPokemonData([pokemon])
      toast.success(`¡Pokémon ${pokemon.name} encontrado!`)
    } catch (error) {
      console.error('Error buscando Pokémon:', error)
      toast.error(`No se encontró el Pokémon "${searchTerm}"`)
      setError(`No se encontró ningún Pokémon con el nombre "${searchTerm}". Verifica que el nombre esté escrito correctamente.`)
      setPokemonData([])
    } finally {
      setLoading(false)
    }
  }
  
  // Función para obtener múltiples Pokémon
  const fetchMultiplePokemon = async () => {
    setLoading(true)
    setError('')
    
    try {
      // Usamos fetch para obtener la lista
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`)
      const data = await response.json()
      
      // Para cada Pokémon en la lista, obtenemos sus detalles
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url)
          const details = await detailResponse.json()
          
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.other['official-artwork'].front_default || details.sprites.front_default,
            types: details.types.map(type => type.type.name),
            height: details.height / 10,
            weight: details.weight / 10,
            abilities: details.abilities.map(ability => ability.ability.name),
            stats: details.stats.map(stat => ({
              name: stat.stat.name,
              value: stat.base_stat
            }))
          }
        })
      )
      
      setPokemonData(pokemonDetails)
      toast.success(`Se cargaron ${pokemonDetails.length} Pokémon`)
    } catch (error) {
      console.error('Error obteniendo Pokémon:', error)
      toast.error('Error al cargar los Pokémon')
      setError('Ocurrió un error al intentar cargar los Pokémon. Por favor, intenta nuevamente más tarde.')
      setPokemonData([])
    } finally {
      setLoading(false)
    }
  }
  
  // Cargar Pokémon al montar el componente
  useEffect(() => {
    fetchMultiplePokemon()
  }, [])
  
  return (
    <div className="mb-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Buscar Pokémon</h2>
      
      {error && <ErrorMessage message={error} />}
      
      <form onSubmit={searchByName} className="mb-6">
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
            onClick={fetchMultiplePokemon}
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