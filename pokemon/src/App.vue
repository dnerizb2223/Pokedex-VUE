<!-- App.vue -->
<template>
  <PokemonDisplay>Hola</PokemonDisplay>
</template>

<script>
import PokemonDisplay from './components/PokemonDisplay.vue';

export default {
  components: {
    PokemonDisplay
  }
};
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 30px;
}
input {
  margin-bottom: 10px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 5px;
}
button {
  margin-left: 5px;
}
</style>
