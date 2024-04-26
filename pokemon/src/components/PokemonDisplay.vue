<!-- PokemonDisplay.vue -->
<template>
  <div>
    <h2>{{ pokemon.name }}</h2>
    <img :src="pokemon.imageUrl" alt="Imagen de {{ pokemon.name }}">
  </div>
</template>

<script>
export default {
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
