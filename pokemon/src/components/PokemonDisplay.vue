<!-- /components/PokemonDislpay.vue -->
<template>
  <img class="pokemon-logo" src="../img/pokemon-logo.png" alt="pokemon-logo">
  <div class="pokemon-grid">
    <div v-for="(pokemon, index) in pokemons" :key="index" class="card" style="width: 18rem;">
      <img class="card-img-top" :src="pokemon.sprites.other['official-artwork'].front_default" :alt="'Imagen de ' + pokemon.name">
      <div class="card-body">
          <h5 class="card-num">{{'N.'+ pokemon.id }}</h5>
          <h1 class="card-title">{{ pokemon.name }}</h1>
          <PokemonTypes v-for="typePoke in pokemon.types" :types="typePoke" :key="typePoke.slot"></PokemonTypes>
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
      pokemons: []
    };
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
    }
  }
};
</script>

<style scoped>




.pokemon-logo {
  position: relative;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
</style>
