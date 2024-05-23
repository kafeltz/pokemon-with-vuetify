<script setup>

import { ref, watch } from 'vue';
import { listPokemons, getPokemonInfo } from '../api/pokemon-api.js';
import { useRoute } from 'vue-router'

const loading = ref(false);
const error = ref(null);
const list = ref([]);

async function requestList(page = 0, limit = 15) {
  try {
    const pokemons = (await listPokemons(page, limit)).results;

    const x = [];

    for (let i = 0; i < pokemons.length; i++) {
      const pokemonInfo = await getPokemonInfo(pokemons[i]['name']);

      x.push(pokemonInfo);
    }

    console.log(x[0].name);

    list.value = x;
  } catch (err) {
    // error.value = err.toString()
  } finally {
    loading.value = false
  }
}

const route = useRoute()

watch(() => route.params.page, requestList, { immediate: true })

</script>

<template>
  <v-breadcrumbs bg-color="primary" :items="['Foo', 'Bar', 'Fizz']"></v-breadcrumbs>

  <div class="ga-5 d-flex flex-wrap">
    <!-- <v-card v-for="pokemon in list" :key="pokemon['name']"
      :class="['d-flex justify-center align-center bg-secondary', 'elevation-3']" height="100" width="100"> -->
      <div class="pokemon-card elevation-3" :class="[pokemon['type']]" v-for="pokemon in list" :key="pokemon['name']">
        <p class="font-weight-medium text-center text-capitalize black">{{ pokemon['name'] }}</p>

        <v-img v-if="pokemon['type'] == 'grass'" class="pokemon-icon" :class="[pokemon['type']]" height="30" src="@/assets/icon-grass.png"  />
        <v-img v-if="pokemon['type'] == 'fire'" class="pokemon-icon" :class="[pokemon['type']]" height="30" src="@/assets/icon-fire.png"  />
        <v-img v-if="pokemon['type'] == 'water'" class="pokemon-icon" :class="[pokemon['type']]" height="30" src="@/assets/icon-water.png"  />
        <v-img v-if="pokemon['type'] == 'bug'" class="pokemon-icon" :class="[pokemon['type']]" height="30" src="@/assets/icon-bug.png"  />

        <!-- <p>{{ pokemon['type'] }}</p> -->
        <v-img :src="pokemon['male']" aspect-ratio="1" max-height="100"></v-img>
      </div>
    <!-- </v-card> -->
  </div>

  <v-pagination :length="4"></v-pagination>

  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">

    </v-responsive>
  </v-container>
</template>


<!-- https://bulbapedia.bulbagarden.net/wiki/Type -->
<style scoped lang="sass">
  .pokemon-icon
    &.grass
      background-color: #3FA129
    &.fire
      background-color: #E62829
    &.water
      background-color: #2980EF
    &.bug
      background-color: #91A119

  .pokemon-card
    background: rgb(237,237,237)
    background: linear-gradient(0deg, rgba(237,237,237,1) 0%, rgba(255,255,255,1) 100%)

    width: 200px
    border-radius: 10px
    border-top-width: 3px
    border-bottom-width: 3px
    border-left-width: 3px
    border-right-width: 3px
    border-bottom-style: solid
    border-top-style: solid
    border-left-style: solid
    border-right-style: solid

    &.grass
      border-color: #3FA129
    &.fire
      border-color: #E62829
    &.water
      border-color: #2980EF
    &.bug
      border-color: #91A119
</style>