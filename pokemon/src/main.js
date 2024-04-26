import { createApp } from 'vue';
import App from './App.vue';
import PokemonDisplay from './components/PokemonDisplay.vue';
import Pokedex from 'pokedex-promise-v2';

const options = {
  protocol: 'https',
  hostName: 'localhost:443',
  versionPath: '/api/v2/',
  cacheLimit: 100 * 1000,
  timeout: 5 * 1000 
};
const P = new Pokedex(options);

const app = createApp(App);
app.component('PokemonDisplay', PokemonDisplay);

app.mount('#app');

