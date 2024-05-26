<script setup>
import { useRoute } from 'vue-router/auto'
import { onMounted, ref, watch } from 'vue';
import { getPokemonFullInfo } from '../api/pokemon-api.js';
import { paddingZeroLeft } from '../lib/helpers.js';

const route = useRoute();
const pokemonId = ref(parseInt(route.query.id, 10));
const pokemon = ref(null);

function getStat(json, kind) {
  for (let i = 0; i < json.stats.length; i++) {
    if (json.stats[i].stat.name === kind) {
      return json.stats[i].base_stat;
    }
  }

  return 'n/a'
}

watch(() => pokemonId.value, async () => {
}, { immediate: true });

onMounted(async () => {
  pokemon.value = await getPokemonFullInfo(pokemonId.value);
});

</script>

<template>

  <v-app-bar absolute scroll-behavior="elevate" :elevation="2" prominent image="@/assets/background-app-bar.png">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title></v-app-bar-title>

    <template v-slot:append>
    </template>
  </v-app-bar>

  <div class="pokemon-box rounded-lg elevation-1 mt-4 mr-4 ml-4" v-if="pokemon"  :class="[pokemon['types'][0]['type']['name']]">
    <v-container>
      <v-row  >
        <v-col :cols="6">
          <p class="ml-3 text-capitalize border-s-lg pl-3 font-weight-medium" v-if="pokemon">
            {{ pokemon['name'] }}
          </p>
        </v-col>

        <v-col :cols="6">
          <p class="mr-3 border-s-lg pl-3 font-weight-medium" v-if="pokemon">
            #{{ paddingZeroLeft(pokemon['id']) }}
          </p>
        </v-col>
      </v-row>

      <v-row align="center" >
        <v-col cols="2">
          <p class="ml-3 text-capitalize border-s-lg pl-3 font-weight-medium" v-if="pokemon">
            Tipo
          </p>
        </v-col>

        <v-col cols="10">
          <div class="d-flex">
            <LabelType :type="t['type']['name']" v-for="t in pokemon['types']" :key="t['type']['name']" />
          </div>
        </v-col>
      </v-row>

      <v-row align="center" >
        <v-col cols="3">
          <div class="ml-3 pl-3 border-s-lg">
            <v-img width="50" height="50" src="@/assets/sword.png" />
          </div>
        </v-col>

        <v-col cols="3">
          <p class="font-weight-medium">
            {{ getStat(pokemon, 'attack') }}
          </p>
        </v-col>

        <v-col cols="3">
          <div class="ml-3 pl-3 border-s-lg">
            <v-img width="50" height="50" src="@/assets/broken-shield.png" />
          </div>
        </v-col>

        <v-col cols="3">
          <p class="font-weight-medium">
            {{ getStat(pokemon, 'defense') }}
          </p>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="3">
          <div class="ml-3 pl-3 border-s-lg">
            <v-img width="50" height="50" src="@/assets/heart-attack.png" />
          </div>
        </v-col>

        <v-col cols="3">
          <p class="font-weight-medium">
            {{ getStat(pokemon, 'hp') }}
          </p>
        </v-col>
      </v-row>


      <v-row>
        <v-col>
          <v-img v-if="pokemon" class="mx-auto" lazy-src="https://picsum.photos/id/11/100/60" width="300"
            aspect-ratio="1/1" :src="pokemon['sprites']['other']['official-artwork']['front_default']"></v-img>
        </v-col>
      </v-row>

    </v-container>
  </div>

</template>

<style scoped lang="sass">
  @use '@/styles/global'

  .pokemon-box
      background: rgb(237,237,237)
      background: linear-gradient(0deg, rgba(237,237,237,1) 0%, rgba(255,255,255,1) 100%)

      &.normal
        background: linear-gradient(0deg, global.$normal 0%, rgba(255,255,255,1) 100%)
      &.grass
        background: linear-gradient(0deg, global.$grass 0%, rgba(255,255,255,1) 100%)
      &.fire
        background: linear-gradient(0deg, global.$fire 0%, rgba(255,255,255,1) 100%)
      &.water
        background: linear-gradient(0deg, global.$water 0%, rgba(255,255,255,1) 100%)
      &.bug
        background: linear-gradient(0deg, global.$bug 0%, rgba(255,255,255,1) 100%)
      &.poison
        background: linear-gradient(0deg, global.$poison 0%, rgba(255,255,255,1) 100%)
      &.ground
        background: linear-gradient(0deg, global.$ground 0%, rgba(255,255,255,1) 100%)
      &.fairy
        background: linear-gradient(0deg, global.$fairy 0%, rgba(255,255,255,1) 100%)
      &.fighting
        background: linear-gradient(0deg, global.$fighting 0%, rgba(255,255,255,1) 100%)
      &.flying
        background: linear-gradient(0deg, global.$flying 0%, rgba(255,255,255,1) 100%)
      &.electric
        background: linear-gradient(0deg, global.$electric 0%, rgba(255,255,255,1) 100%)
      &.rock
        background: linear-gradient(0deg, global.$rock 0%, rgba(255,255,255,1) 100%)
      &.dark
        background: linear-gradient(0deg, global.$dark 0%, rgba(255,255,255,1) 100%)
      &.stellar
        background: linear-gradient(0deg, global.$stellar 0%, rgba(255,255,255,1) 100%)
      &.ghost
        background: linear-gradient(0deg, global.$ghost 0%, rgba(255,255,255,1) 100%)
      &.other
        background: linear-gradient(0deg, global.$other 0%, rgba(255,255,255,1) 100%)
      &.ice
        background: linear-gradient(0deg, global.$ice 0%, rgba(255,255,255,1) 100%)
      &.psychic
        background: linear-gradient(0deg, global.$psychic 0%, rgba(255,255,255,1) 100%)
      &.dragon
        background: linear-gradient(0deg, global.$dragon 0%, rgba(255,255,255,1) 100%)

</style>