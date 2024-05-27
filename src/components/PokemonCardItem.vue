<script setup>
import { getIconAssetUrl, paddingZeroLeft } from '../lib/helpers.js'

const pokemon = defineProps({
  number: { type: [String, Number], required: true },
  name: { type: String, required: true },
  img: { type: String, required: true },
  type: { type: String, required: true },
});
</script>

<template>
  <div class="pokemon-card elevation-3" :class="pokemon.type">
    <v-container>
      <v-row no-gutters>
        <v-col cols="6">
          <p class="font-weight-medium text-center text-capitalize black">{{ pokemon.name }}</p>
        </v-col>

        <v-col cols="5">
          <p class="font-weight-medium text-center text-capitalize black">#{{ paddingZeroLeft(pokemon.number) }}
          </p>
        </v-col>
      </v-row>
    </v-container>

    <v-img class="pokemon-icon" :class="[pokemon.type]" max-height="30" aspect-ratio="1"
      :src="getIconAssetUrl(pokemon.type)" />

    <router-link :to="'/detail?id=' + pokemon.number">
      <v-img :src="pokemon.img" aspect-ratio="1" max-height="120"></v-img>
    </router-link>
  </div>
</template>

<style scoped lang="sass">
@use '@/styles/global'

.pokemon-icon
  &.normal
    background-color: global.$normal
  &.grass
    background-color: global.$grass
  &.fire
    background-color: global.$fire
  &.water
    background-color: global.$water
  &.bug
    background-color: global.$bug
  &.poison
    background-color: global.$poison
  &.ground
    background-color: global.$ground
  &.fairy
    background-color: global.$fairy
  &.fighting
    background-color: global.$fighting
  &.flying
    background-color: global.$flying
  &.electric
    background-color: global.$electric
  &.rock
    background-color: global.$rock
  &.dark
    background-color: global.$dark
  &.stellar
    background-color: global.$stellar
  &.other
    background-color: global.$other
  &.ghost
    background-color: global.$ghost
  &.ice
    background-color: global.$ice
  &.psychic
    background-color: global.$psychic
  &.dragon
    background-color: global.$dragon

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
      border-color: global.$normal
    &.grass
      border-color: global.$grass
    &.fire
      border-color: global.$fire
    &.water
      border-color: global.$water
    &.bug
      border-color: global.$bug
    &.poison
      border-color: global.$poison
    &.ground
      border-color: global.$ground
    &.fairy
      border-color: global.$fairy
    &.fighting
      border-color: global.$fighting
    &.flying
      border-color: global.$flying
    &.electric
      border-color: global.$electric
    &.rock
      border-color: global.$rock
    &.dark
      border-color: global.$dark
    &.stellar
      border-color: global.$stellar
    &.ghost
      border-color: global.$ghost
    &.other
      border-color: global.$other
    &.ice
      border-color: global.$ice
    &.psychic
      border-color: global.$psychic
    &.dragon
      border-color: global.$dragon
</style>