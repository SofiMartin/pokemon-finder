import { useState, useCallback } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const usePokemonData = () => {
  const [pokemonData, setPokemonData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Función para buscar Pokémon por nombre usando axios
  const searchPokemonByName = useCallback(async (name) => {
    if (!name.trim()) {
      setError('Debes ingresar un nombre de Pokémon para realizar la búsqueda')
      toast.error('Por favor ingresa un nombre de Pokémon')
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      
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
      setError(`No se encontró ningún Pokémon con el nombre "${name}". Verifica que el nombre esté escrito correctamente.`)
      toast.error(`No se encontró el Pokémon "${name}"`)
      setPokemonData([])
    } finally {
      setLoading(false)
    }
  }, [])
  
  // Función para obtener múltiples Pokémon usando fetch
  const fetchMultiplePokemon = useCallback(async (limit = 20) => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`)
      const data = await response.json()
      
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
      setError('Ocurrió un error al intentar cargar los Pokémon. Por favor, intenta nuevamente más tarde.')
      toast.error('Error al cargar los Pokémon')
      setPokemonData([])
    } finally {
      setLoading(false)
    }
  }, [])
  
  return {
    pokemonData,
    loading,
    error,
    searchPokemonByName,
    fetchMultiplePokemon
  }
}

export default usePokemonData;