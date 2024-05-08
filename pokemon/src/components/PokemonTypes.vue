<!-- /components/PokemonTypes.vue -->
<template>
    <div class="pokemon-types">
        <div v-for="(type, index) in types" :key="index" class="pokemon-type">{{ type }}</div>
    </div>
</template>

<script>
export default {
  props: {
    types: {
      type: Array,
      required: true
    }
  },
  mounted() {
    console.log('Tipos de Pokémon:', this.types);
  }
};
</script>

<style scoped>
.pokemon-types {
  display: flex;
  flex-wrap: wrap;
}

.pokemon-type {
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 12px;
  color: white; /* Color de texto blanco */
}

.bug {
  background-color: #a8b820; /* Color de fondo para tipo bug */
}

.dark {
  background-color: #705848; /* Color de fondo para tipo dark */
}

.dragon {
  background-color: #7038f8; /* Color de fondo para tipo dragon */
}

.electric {
  background-color: #f8d030; /* Color de fondo para tipo electric */
}

.fairy {
  background-color: #ee99ac; /* Color de fondo para tipo fairy */
}

.fighting {
  background-color: #c03028; /* Color de fondo para tipo fighting */
}

.fire {
  background-color: #f08030; /* Color de fondo para tipo fire */
}

.flying {
  background-color: #a890f0; /* Color de fondo para tipo flying */
}

.ghost {
  background-color: #705898; /* Color de fondo para tipo ghost */
}

.grass {
  background-color: #78c850; /* Color de fondo para tipo grass */
}

.ground {
  background-color: #e0c068; /* Color de fondo para tipo ground */
}

.ice {
  background-color: #98d8d8; /* Color de fondo para tipo ice */
}

.normal {
  background-color: #a8a878; /* Color de fondo para tipo normal */
}

.poison {
  background-color: #a040a0; /* Color de fondo para tipo poison */
}

.psychic {
  background-color: #f85888; /* Color de fondo para tipo psychic */
}

.rock {
  background-color: #b8a038; /* Color de fondo para tipo rock */
}

.steel {
  background-color: #b8b8d0; /* Color de fondo para tipo steel */
}

.water {
  background-color: #6890f0; /* Color de fondo para tipo water */
}
</style>
