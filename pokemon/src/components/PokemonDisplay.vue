<template>
  <div>
    <img class="pokemon-logo" src="../img/pokemon-logo.png" alt="pokemon-logo">
    <div class="button-container">
      <button class="button" @click="showAll">Mostrar Todos</button>
      <button class="button" @click="showFavorites">Mostrar Favoritos</button>
    </div>
    <div class="pokemon-grid">
      <div v-for="(pokemon, index) in filteredPokemons" :key="index" class="card" style="width: 18rem;">
        <img class="fav" src="../img/fav.png" alt="pokemon-logo" @click="toggleFavorite(pokemon)" :class="{ 'red': isFavorite(pokemon) }">
        <img class="card-img-top" :src="pokemon.sprites.other['official-artwork'].front_default" :alt="'Imagen de ' + pokemon.name">
        <div class="card-body">
            <h5 class="card-num">{{'N.'+ pokemon.id }}</h5>
            <h1 class="card-title">{{ pokemon.name }}</h1>
            <PokemonTypes v-for="typePoke in pokemon.types" :types="typePoke" :key="typePoke.slot"></PokemonTypes>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonTypes from './PokemonTypes.vue';

export default {
  components: {
    PokemonTypes
  },
  data() {
    return {
      pokemons: [],
      favorites: JSON.parse(localStorage.getItem('favorites')) || [],
      showOnlyFavorites: false
    };
  },
  computed: {
    filteredPokemons() {
      if (this.showOnlyFavorites) {
        return this.pokemons.filter(pokemon => this.isFavorite(pokemon));
      } else {
        return this.pokemons;
      }
    }
  },
  mounted() {
    this.fetchPokemonData();
  },
  methods: {
    async fetchPokemonData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        const pokemonPromises = data.results.map(pokemon => {
          return fetch(pokemon.url)
            .then(response => response.json());
        });
        Promise.all(pokemonPromises)
          .then(pokemonDataArray => {
            this.pokemons = pokemonDataArray;
          });
      } catch (error) {
        console.error('There was an ERROR: ', error);
      }
    },
    toggleFavorite(pokemon) {
      const favoriteIndex = this.favorites.findIndex(favPokemon => favPokemon.id === pokemon.id);
      if (favoriteIndex === -1) {
        this.favorites.push(pokemon);
      } else {
        this.favorites.splice(favoriteIndex, 1);
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    isFavorite(pokemon) {
      return this.favorites.some(favPokemon => favPokemon.id === pokemon.id);
    },
    showFavorites() {
      this.showOnlyFavorites = true;
    },
    showAll() {
      this.showOnlyFavorites = false;
    }
  }
};
</script>
<style scoped>
.fav{
  position: relative;
  top: 50px;
  left: 260px;
  height: 30px;
  width: 30px;
}
.fav:hover{
  cursor: pointer;
}
.fav.red  {
  filter: grayscale(100%) brightness(1000%) invert(10%) sepia(10000%) saturate(100000000%) hue-rotate(340deg);
}

.pokemon-logo {
  position: relative;
  height: 100px;
  top: 0%;
  left: 55%;
  transform: translate(-100%, -0%);
}

.pokemon-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center; 
}

.card {
  margin: 20px;
  border-radius: 5px;
  width: 18rem; 
}

.card:hover{
  margin-top: -10px;
  transition: 0.5s;
}

.card-img-top {
  width: 100%;
  height: auto; 
  background-color: #F2F2F2 ;
  border-radius: 5px;
  padding: 10px;
}

.card-body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  flex-direction: column;
  align-items: center; 
  width: 100%;
}

.card-title {
  text-align: center; 
  text-transform: capitalize;
  margin-right: 20px;
  margin-top: -65px;
  float: right;
}

.card-num{
  margin-left: 20px;
  font-size: large;
  color: #919191;
}

.center-content {
  text-align: center;
}

.button-container {
  text-align: center;
  margin-bottom: 20px;
}

.button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

.button:hover {
  background-color: #45a049;
}

</style>
