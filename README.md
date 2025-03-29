# PokéFinder - Aplicación para buscar Pokémon

Una aplicación web desarrollada con React + Vite que permite buscar Pokémon utilizando la PokeAPI.

## 🚀 Demo

https://pokesofi.netlify.app/

## ✨ Características

- **Búsqueda de Pokémon**: Busca Pokémon por nombre o explora múltiples.
- **Información detallada**: Ver características como tipo, habilidades, estadísticas, peso y altura.
- **Favoritos**: Guarda tus Pokémon favoritos.
- **Responsive**: Diseño adaptable a diferentes dispositivos.
- **Notificaciones**: Feedback visual para las acciones realizadas.

## 🛠️ Tecnologías utilizadas

- **React + Vite**: Para la construcción de la interfaz de usuario.
- **Tailwind CSS**: Para estilizar la aplicación.
- **Axios**: Para realizar peticiones HTTP a la API.
- **Fetch API**: Como alternativa para mostrar ambos métodos.
- **React Toastify**: Para mostrar notificaciones.
- **LocalStorage**: Para persistencia de datos de favoritos.

## 🔍 Decisiones Técnicas

### ¿Por qué usar tanto Fetch como Axios?

En esta aplicación decidí implementar ambos métodos para demostrar su uso:

- **Axios** para la búsqueda por nombre: Proporciona una API más amigable y manejo automático de errores.
- **Fetch** para cargar múltiples Pokémon: Para mostrar el uso de la API nativa del navegador.

Esta decisión permite comparar ambos enfoques y sus características:

| Características | Axios | Fetch |
|-----------------|-------|-------|
| Transformación automática de JSON | ✅ | ❌ (requiere .then(res => res.json())) |
|
