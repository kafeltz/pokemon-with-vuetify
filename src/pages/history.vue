<script setup>
import { LOCAL_STORAGE_HISTORY } from '@/consts/global';
import { ref, onMounted } from 'vue';
import { getPokemonInfo } from '../api/pokemon-api.js'

const maxItens = 50; // segurança
let loading = ref(true);
let listPokemon = ref([]);
onMounted(async () => {
  const item = localStorage.getItem(LOCAL_STORAGE_HISTORY);

  if (item != null) {

    const listIds = JSON.parse(item);

    for (let i = 0; i < listIds.length && i < maxItens; i++) {
      const id = listIds[i];
      const pokemon = await getPokemonInfo(id);

      listPokemon.value.push(pokemon);
    }
  }


  loading.value = false;

});

</script>

<template>
  <Menu></Menu>

  <h1 class="mt-3 mb-3 text-h3 d-flex justify-center">Histórico</h1>

  <div class="ml-3 mr-3" v-if="loading">
    <v-skeleton-loader :loading="true" type="list-item-two-line" :key="i" v-for="i in [1, 2, 3]">
      <v-list-item lines="two" subtitle="Subtitle" title="Title" rounded></v-list-item>
    </v-skeleton-loader>
  </div>

  <div class="ml-3 mr-3" v-if="!loading">
    <PokemonListItem v-for="p in listPokemon" :key="p.number" :number="p.number" :type="p.type" :img="p.male"
      :name="p.name" />
  </div>
</template>

<style scoped lang="sass">
</style>