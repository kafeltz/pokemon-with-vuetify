<script setup>

import { ref, watch, onMounted } from 'vue';
import { listPokemons, getPokemonInfo, getAllPokemonNames } from '../api/pokemon-api.js';
import { useRouter, useRoute } from 'vue-router/auto'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

const router = useRouter()
const route = useRoute();

const loading = ref(true);
const error = ref(null);
const pokemonList = ref([]);

const pageNumber = ref(parseInt(route.query.page, 10));
const paginationLength = ref(1)

const searchClosed = ref(true)
const search = ref('')
const searchList = ref([])
const searchWidth = ref(50)
const paginationDisabled = ref(true)

async function requestList() {
  const limit = 4;

  try {
    loading.value = true

    const list = (await listPokemons(pageNumber.value, limit));

    let pokemons;
    if (search.value) {
      pokemons = [{ 'name': search.value }]
    } else {
      pokemons = list.results;
    }

    if (list.count > 0) {
      paginationLength.value = Math.floor(list.count / limit);
    }

    const x = [];
    for (let i = 0; i < pokemons.length; i++) {
      const pokemonInfo = await getPokemonInfo(pokemons[i]['name']);

      x.push(pokemonInfo);
    }

    pokemonList.value = x;
  } catch (err) {
    // error.value = err.toString()
    console.error(err);
  } finally {
    loading.value = false
  }
}

function updatePageNumber(value) {
  pageNumber.value = value;
}

onBeforeRouteLeave((to, from) => {
  console.log('onBeforeRouteLeave', to, from);
})

onBeforeRouteUpdate((to, from) => {
  console.log('onBeforeRouteUpdate', to, from);
})

onMounted(async () => {
  searchList.value = await getAllPokemonNames();
});

// https://stackoverflow.com/questions/66419471/vue-3-vite-dynamic-image-src
function getIconAssetUrl(type) {
  const url = new URL(`../assets/icon-${type}.png`, import.meta.url).href;

  return url;
}

function paddingZeroLeft(n) {
  return String(n).padStart(4, '0');
}

function handleSearchFocus(focused) {
  searchClosed.value = !focused
  searchWidth.value = focused ? 250 : 50
}

function handleSearchUpdate(text) {
  // console.log(text);
}

function handleSearch(text) {
  console.log('handleSearch', text);
}

watch(() => search.value, () => {
  requestList();

  paginationDisabled.value = search.value != null && search.value.length > 0;

  console.log(`paginationEnable.value: ${paginationDisabled.value}`);
}, { immediate: true })

watch(() => pageNumber.value, () => {
  requestList();
  router.push(`/list/?page=${pageNumber.value}`);
  // console.log(`watch: ${pageNumber.value}`);
}, { immediate: true })
</script>

<template>

  <v-progress-linear indeterminate color="primary" :active="loading"></v-progress-linear>

  <v-app-bar absolute scroll-behavior="elevate" :elevation="2" prominent image="@/assets/background-app-bar.png">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title></v-app-bar-title>

    <template v-slot:append>
      <!-- <v-text-field @update:focused="handleSearchFocus" :model-value="search" clearable loading
      :class="{ 'closed': searchClosed }" class="mt-5 expanding-search" filled dense
      prepend-inner-icon="mdi-magnify" placeholder="Pesquisar"></v-text-field> -->

      <v-autocomplete
        @update:focused="handleSearchFocus"
        @update:modelValue="handleSearchUpdate"
        @update:search="handleSearch"
        v-model="search"
        class="mt-5 expanding-search"
        prepend-inner-icon="mdi-magnify"
        :class="{ 'closed': searchClosed }"
        :items="searchList"
        :width="searchWidth"></v-autocomplete>
    </template>
  </v-app-bar>


  <div class="mt-5 ga-2 d-flex flex-wrap justify-center">
    <div class="pokemon-card elevation-3" :class="[pokemon['type']]" v-for="pokemon in pokemonList"
      :key="pokemon['name']">
      <v-container class="">
        <v-row no-gutters>
          <v-col cols="6">
            <p class="font-weight-medium text-center text-capitalize black">{{ pokemon['name'] }}</p>
          </v-col>

          <v-col cols="5">
            <p class="font-weight-medium text-center text-capitalize black">#{{ paddingZeroLeft(pokemon['number']) }}
            </p>
          </v-col>
        </v-row>
      </v-container>

      <v-img class="pokemon-icon" :class="[pokemon['type']]" max-height="30" aspect-ratio="1"
        :src="getIconAssetUrl(pokemon['type'])" />

      <!-- <p>{{ pokemon['type'] }}</p> -->
      <v-img :src="pokemon['male']" aspect-ratio="1" max-height="100"></v-img>
    </div>
  </div>

  <v-pagination :disabled="paginationDisabled" class="mt-5 mr-7 ml-7" :length="paginationLength" next-icon="mdi-menu-right"
    prev-icon="mdi-menu-left" :total-visible="5" @update:model-value="updatePageNumber" :model-value="pageNumber"
    :elevation="0"></v-pagination>
</template>

<style lang="sass">
.v-field__outline
    display: none !important

.v-field
  cursor: pointer !important

.expanding-search
  width: 300px
  transition: width 0.3s

  .v-field__append-inner i
    display: none

  &.closed
    width: 50px
  .v-field__overlay
    background: transparent !important
</style>

<!-- https://bulbapedia.bulbagarden.net/wiki/Type -->
<style scoped lang="sass">
  $ground: #915121
  $fairy: #EF70EF
  $psychic: #5A5A5A
  $ice: #3DCEF3
  $dragon: #5060E1
  $steel: #60A1B8
  $ghost: #704170
  $normal: #9FA19F
  $grass: #3FA129
  $fire: #E62829
  $water: #2980EF
  $bug: #91A119
  $poison: #9141CB
  $fighting: #FF8000
  $psychic: #EF4179
  $flying: #81B9EF
  $electric: #FAC000
  $rock: #AFA981
  $dark: #624D4E
  $stellar: #44628D
  $other: #68A090

  .pokemon-icon
    &.normal
      background-color: $normal
    &.grass
      background-color: $grass
    &.fire
      background-color: $fire
    &.water
      background-color: $water
    &.bug
      background-color: $bug
    &.poison
      background-color: $poison
    &.ground
      background-color: $ground
    &.fairy
      background-color: $fairy
    &.fighting
      background-color: $fighting
    &.flying
      background-color: $flying
    &.electric
      background-color: $electric
    &.rock
      background-color: $rock
    &.dark
      background-color: $dark
    &.stellar
      background-color: $stellar
    &.other
      background-color: $other
    &.ghost
      background-color: $ghost
    &.ice
      background-color: $ice
    &.psychic
      background-color: $psychic
    &.dragon
      background-color: $dragon

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

    &.normal
      border-color: $normal
    &.grass
      border-color: $grass
    &.fire
      border-color: $fire
    &.water
      border-color: $water
    &.bug
      border-color: $bug
    &.poison
      border-color: $poison
    &.ground
      border-color: $ground
    &.fairy
      border-color: $fairy
    &.fighting
      border-color: $fighting
    &.flying
      border-color: $flying
    &.electric
      border-color: $electric
    &.rock
      border-color: $rock
    &.dark
      border-color: $dark
    &.stellar
      border-color: $stellar
    &.ghost
      background-color: $ghost
    &.other
      border-color: $other
    &.ice
      border-color: $ice
    &.psychic
      border-color: $psychic
    &.dragon
      border-color: $dragon
</style>