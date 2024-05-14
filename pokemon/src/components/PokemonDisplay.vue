<template>
  <div>
    <img class="pokemon-logo" src="../img/pokemon-logo.png" alt="pokemon-logo">
    <div class="button-container">
      <button class="button" @click="showAll">Mostrar Todos</button>
      <button class="button" @click="showFavorites">Mostrar Favoritos</button>
      <button class="button" @click="showTeam">Mostrar Equipo</button>
      <select v-model="selectedType" @change="filterByType">
        <option value="">Seleccionar Tipo</option>
        <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
      </select>
    </div>
    <RangeSlider label="Desde" :min-value="1" :max-value="151" v-model="startRange" :to-value="endRange"></RangeSlider>
    <RangeSlider label="Hasta" :min-value="1" :max-value="151" v-model="endRange" :from-value="startRange"></RangeSlider>
    <div class="button-center">
      <button class="button" @click="applyRange">Aplicar Rango</button>
    </div>
    <div class="pokemon-grid">
      <div v-for="(pokemon, index) in filteredPokemons" :key="index" class="card" style="width: 18rem;">
        <img class="fav" src="../img/fav.png" alt="pokemon-logo" @click="toggleFavorite(pokemon)" :class="{ 'red': isFavorite(pokemon) }">
        <img class="equipo" src="../img/equipo.png" alt="equipo" @click="addToTeam(pokemon)" :class="{ 'red': isInTeam(pokemon) }">
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
import RangeSlider from './RangeSlider.vue';

export default {
  components: {
    PokemonTypes,
    RangeSlider
  },
  data() {
    return {
      pokemons: [],
      favorites: JSON.parse(localStorage.getItem('favorites')) || [],
      team: JSON.parse(localStorage.getItem('team')) || [],
      showOnlyFavorites: false,
      showTeamView: false,
      selectedType: null,
      types: ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'],
      startRange: 1,
      endRange: 151
    };
  },
  computed: {
    filteredPokemons() {
      if (this.showOnlyFavorites) {
        return this.pokemons.filter(pokemon => this.isFavorite(pokemon));
      } else if (this.showTeamView) {
        return this.team;
      } else if (this.selectedType) {
        return this.pokemons.filter(pokemon => pokemon.types.some(typePoke => typePoke.type.name === this.selectedType));
      } else {
        return this.pokemons.filter(pokemon => pokemon.id >= this.startRange && pokemon.id <= this.endRange);
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
    addToTeam(pokemon) {
      const index = this.team.findIndex(teamPokemon => teamPokemon.id === pokemon.id);
      if (index !== -1) {
        this.team.splice(index, 1);
      } else if (this.team.length < 6) {
        this.team.push(pokemon);
      } else {
        return;
      }
      localStorage.setItem('team', JSON.stringify(this.team));
    },
    isInTeam(pokemon) {
      return this.team.some(teamPokemon => teamPokemon.id === pokemon.id);
    },
    showFavorites() {
      this.showOnlyFavorites = true;
      this.selectedType = null; 
    },
    showAll() {
      this.showOnlyFavorites = false;
      this.showTeamView = false;
      this.selectedType = null; 
    },
    showTeam() {
      this.showTeamView = true;
      this.showOnlyFavorites = false;
      this.selectedType = null; 
    },
    filterByType() {
      if (this.selectedType === '') {
        this.selectedType = null; 
      } else {
        this.showOnlyFavorites = false; 
      }
    },
    applyRange() {
      // Lógica para aplicar el rango seleccionado
    }
  }
};
</script>

<style scoped>
.fav {
  position: relative;
  top: 50px;
  left: 260px;
  height: 30px;
  width: 30px;
}
.fav:hover {
  cursor: pointer;
}
.fav.red {
  filter: grayscale(100%) brightness(1000%) invert(10%) sepia(10000%) saturate(100000000%) hue-rotate(340deg);
}

.equipo {
  position: relative;
  top: 50px;
  left: 0px;
  height: 30px;
  width: 30px;
}
.equipo:hover {
  cursor: pointer;
}
.equipo.red {
  filter: grayscale(100%) brightness(1000%) invert(10%) sepia(10000%) saturate(100000000%) hue-rotate(150deg);
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

.card:hover {
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

.card-num {
  margin-left: 20px;
  font-size: large;
  color: #919191;
}

.center-content {
  text-align: center;
}

select {
  padding: 10px;
  border-radius: 4px;
}

/* Estilos de los botones */
.button-container {
  text-align: center;
  margin-bottom: 20px;
}

.button-center {
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
