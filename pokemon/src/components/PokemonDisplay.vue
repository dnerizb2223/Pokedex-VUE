<!-- /components/PokemonDislpay.vue -->
<template>
  <div class="pokemon-grid">
    <div v-for="(pokemon, index) in pokemons" :key="index">
      <div class="pokemon-card">
        <div class="card">
          <div class="card-body">
            <h2>{{ pokemon.name }}</h2>
            <img :src="pokemon.imageUrl" :alt="'Imagen de ' + pokemon.name">
            <PokemonTypes :types="pokemon.types" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
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
.pokemon-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
}
</style>
