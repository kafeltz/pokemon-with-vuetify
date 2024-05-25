<script setup>
import { useRoute } from 'vue-router/auto'
import { onMounted, ref, watch } from 'vue';
import { getPokemonFullInfo } from '../api/pokemon-api.js';


const route = useRoute();
const pokemonId = ref(parseInt(route.query.id, 10));
const pokemon = ref(null);

watch(() => pokemonId.value, async () => {
}, { immediate: true });

onMounted(async () => {
  pokemon.value = await getPokemonFullInfo(pokemonId.value);
});

</script>

<template>

  <v-container>
    <v-row>
      <v-col>
        <v-img v-if="pokemon" aspect-ratio="1/1" :src="pokemon['sprites']['other']['official-artwork']['front_default']"></v-img>
      </v-col>
    </v-row>
  </v-container>

</template>

<style scoped lang="sass"></style>