<script setup>
import { ref, onMounted } from 'vue';
import { getAllPokemonNames } from '../api/pokemon-api.js';

const drawer = ref(false)

const searchClosed = ref(true)
const search = ref('')
const searchList = ref([])
const searchWidth = ref(50)

onMounted(async () => {
  searchList.value = await getAllPokemonNames();
});

function handleSearch(text) {
  console.log('handleSearch', text);
}

function handleSearchFocus(focused) {
  searchClosed.value = !focused
  searchWidth.value = focused ? 250 : 50
}
</script>

<template>

  <v-app-bar absolute scroll-behavior="elevate" :elevation="2" prominent image="@/assets/background-app-bar.png">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title></v-app-bar-title>

    <template v-slot:append>
      <v-autocomplete
        @update:focused="handleSearchFocus"
        @update:search="handleSearch"
        v-model="search"
        class="mt-5 expanding-search"
        prepend-inner-icon="mdi-magnify"
        :class="{ 'closed': searchClosed }"
        :items="searchList"
        :width="searchWidth"></v-autocomplete>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary floating>
    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home" to="/"></v-list-item>
      <v-list-item prepend-icon="mdi-history" title="Histórico" value="Histórico" to="/history"></v-list-item>
      <v-list-item prepend-icon="mdi-github" title="Ismael Kafeltz" value="Ismael Kafeltz" target="blank"
        href="https://github.com/kafeltz/pokemon-with-vuetify"></v-list-item>
    </v-list>
  </v-navigation-drawer>

</template>

<style scoped lang="sass">
</style>