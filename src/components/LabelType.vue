<script setup>
import { getIconAssetUrl } from '../lib/helpers.js'
const props = defineProps({ 'type': String })
</script>

<template>
  <label class="pt-1 pl-1 pr-1 pb-1 mr-1 text-capitalize">
    <v-img class="pokemon-icon" :class="props.type" :src="getIconAssetUrl(props.type)" />
  </label>
</template>

<style scoped lang="sass">
  @use '@/styles/global'

  .pokemon-icon
      height: 30px
      width: 30px
      border-radius: 5px

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
</style>