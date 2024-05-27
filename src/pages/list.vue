<script setup>
import { ref, watch } from 'vue';
import { listPokemons, getPokemonInfo } from '../api/pokemon-api.js';
import { useRouter, useRoute } from 'vue-router/auto'

const router = useRouter()
const route = useRoute();

const loading = ref(true);
const pokemonList = ref([]);

const pageNumber = ref(parseInt(route.query.page, 10));
const paginationLength = ref(1)

async function requestList() {
  const limit = 4;

  try {
    loading.value = true

    const list = (await listPokemons(pageNumber.value, limit));

    const pokemons = list.results;

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
    console.error(err);
  } finally {
    loading.value = false
  }
}

function updatePageNumber(value) {
  pageNumber.value = value;
}

function handleSearch(text) {
  router.push(`/detail?id=${text}`);

  console.log(`received handleSearch: `, text);
}

// watch(() => search.value, () => {
//   requestList();

//   paginationDisabled.value = search.value != null && search.value.length > 0;

//   console.log(`paginationEnable.value: ${paginationDisabled.value}`);
// }, { immediate: true })

watch(() => pageNumber.value, () => {
  requestList();
  router.push(`/list/?page=${pageNumber.value}`);
}, { immediate: true })
</script>

<template>
  <Menu2 @onSelectSearch="handleSearch" />

  <div class="mt-5 ga-2 d-flex flex-wrap justify-center">
    <PokemonCardItem v-for="p in pokemonList" :key="p.number" :number="p.number" :type="p.type" :img="p.male"
    :name="p.name" />
  </div>

  <v-pagination class="mt-5 mr-7 ml-7" :length="paginationLength" next-icon="mdi-menu-right"
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
