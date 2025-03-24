const Header = ({ setShowFavorites, showFavorites }) => {
    return (
      <header className="bg-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
              alt="Pokéball" 
              className="h-10 w-10 mr-3"
            />
            <h1 className="text-2xl font-bold">PokéFinder</h1>
          </div>
          
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button 
                  onClick={() => setShowFavorites(false)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    !showFavorites 
                      ? 'bg-white text-blue-700 font-medium' 
                      : 'text-white hover:bg-blue-600'
                  }`}
                >
                  Buscar Pokémon
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setShowFavorites(true)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    showFavorites 
                      ? 'bg-white text-blue-700 font-medium' 
                      : 'text-white hover:bg-blue-600'
                  }`}
                >
                  Mis Favoritos
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
  
  export default Header;