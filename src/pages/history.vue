<script setup>
import { onMounted } from 'vue';


onMounted(() => {
  console.log(123);
});

</script>

<template>
  <Menu></Menu>

  <h1 class="mt-3 mb-3 text-h3 d-flex justify-center">Histórico</h1>

  <div class="ml-3 mr-3">
    <PokemonListItem type="grass" name="aaa" number="1"
      img="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" />

    <PokemonListItem type="normal" name="Pidgey" number="16"
      img="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png" />
  </div>


</template>

<style scoped lang="sass">
</style>