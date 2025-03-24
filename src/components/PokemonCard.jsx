import { useState } from 'react'
import { toast } from 'react-toastify'
import { addFavorite, removeFavorite } from '../utils/localStorage'

const PokemonCard = ({ pokemon, isFavorite, setFavorites }) => {
  const [showDetails, setShowDetails] = useState(false)
  
  // Mapeo de tipos a colores
  const typeColors = {
    normal: 'bg-gray-300',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-700',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-800',
    steel: 'bg-gray-400',
    fairy: 'bg-pink-300',
  }
  
  // Función para manejar agregar/quitar de favoritos
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(pokemon.id)
      setFavorites(prev => prev.filter(fav => fav.id !== pokemon.id))
      toast.info(`${pokemon.name} eliminado de favoritos`)
    } else {
      addFavorite(pokemon)
      setFavorites(prev => [...prev, pokemon])
      toast.success(`${pokemon.name} añadido a favoritos`)
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold capitalize">{pokemon.name}</h3>
          <span className="text-gray-500">#{pokemon.id}</span>
        </div>
        
        <div className="flex justify-center my-4">
          <img 
            src={pokemon.image} 
            alt={pokemon.name} 
            className="h-48 w-48 object-contain"
          />
        </div>
        
        <div className="mb-4 flex flex-wrap gap-2">
          {pokemon.types.map((type) => (
            <span 
              key={type} 
              className={`${typeColors[type] || 'bg-gray-500'} px-3 py-1 rounded-full text-white text-sm font-semibold`}
            >
              {type}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {showDetails ? 'Ocultar detalles' : 'Ver detalles'}
          </button>
          
          <button
            onClick={handleFavoriteToggle}
            className="flex items-center gap-1"
          >
            <span className={isFavorite ? 'text-yellow-500' : 'text-gray-400'}>
              ★
            </span>
            <span className="text-sm font-medium">
              {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            </span>
          </button>
        </div>
      </div>
      
      {showDetails && (
        <div className="p-4 bg-gray-50 border-t">
          <h4 className="font-semibold text-lg mb-2">Descripción</h4>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div>
              <p className="text-sm text-gray-600">Altura</p>
              <p>{pokemon.height} m</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Peso</p>
              <p>{pokemon.weight} kg</p>
            </div>
          </div>
          
          <h4 className="font-semibold mb-2">Habilidades</h4>
          <ul className="mb-4">
            {pokemon.abilities.map((ability) => (
              <li key={ability} className="capitalize">• {ability.replace('-', ' ')}</li>
            ))}
          </ul>
          
          <h4 className="font-semibold mb-2">Estadísticas</h4>
          <div className="space-y-2">
            {pokemon.stats.map((stat) => (
              <div key={stat.name} className="w-full">
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">{stat.name.replace('-', ' ')}</span>
                  <span>{stat.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${Math.min(100, (stat.value / 150) * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PokemonCard;