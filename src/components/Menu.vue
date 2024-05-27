<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router/auto';

const router = useRouter()
const drawer = ref(false)

function handleGoBack() {
  router.go(-1);
}
</script>

<template>

  <v-app-bar absolute scroll-behavior="elevate" :elevation="2" prominent image="@/assets/background-app-bar.png">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title></v-app-bar-title>

    <template v-slot:append>
      <v-app-bar-nav-icon icon="mdi-arrow-left" @click="handleGoBack"> </v-app-bar-nav-icon>
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