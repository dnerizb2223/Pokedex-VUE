<!-- /components/PokemonTypes.vue -->
<template>
    <div class="pokemon-types" :class="types.type.name">
        <div class="pokemon-type">{{ types.type.name }}</div>
    </div>
</template>

<script>
export default {
  props: {
    types: {
      types: Array,
      required: true
    }
  },
  mounted() {
    // console.log('Tipos de Pokémon:', this.types);
  }
};
</script>

<style scoped>
.pokemon-types {
  border-radius: 5px;
  padding: 4px;
  text-align: center;
  margin: 5px;
  width: 100%;
  display: inline;

}

.pokemon-type {
align-content: center;  margin: 5px;
  width: 40%;
  display: inline-block; 
  border-radius: 5px;
  color: rgb(255, 255, 255); 
}

.bug {
  background-color: #a8b820; 
}

.dark {
  background-color: #705848; 
}

.dragon {
  background-color: #7038f8; 
}

.electric {
  background-color: #f8d030; 
}

.fairy {
  background-color: #ee99ac; 
}

.fighting {
  background-color: #c03028;
}

.fire {
  background-color: #f08030;
}

.flying {
  background-color: #a890f0; 
}

.ghost {
  background-color: #705898; 
}

.grass {
  background-color: #78c850; 
}

.ground {
  background-color: #e0c068;
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
