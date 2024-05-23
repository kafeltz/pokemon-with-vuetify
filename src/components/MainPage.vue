<script setup>
  function onClickIcon() {
    console.log(123);
  }
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">
      <v-img class="mb-4" src="@/assets/pokemon-logo.png" />

      <div class="text-center">
        <div class="text-body-2 font-weight-light mb-n1">Seja bem-vindo!</div>
      </div>

      <div class="py-4" />
      <v-row>
        <v-col cols="12" @click="onClickIcon">
          <v-img class="custom" height="96" src="@/assets/pikachu.png"  />
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>



<style scoped lang="sass">
  .custom
    transition: transform 0.1s ease-in-out
    &:hover
      cursor: pointer
      transform: scale(1.2)
</style>
