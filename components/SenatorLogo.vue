<template>
  <nuxt-link to="/">
    <img class="VuetifyLogo" alt="Vuetify Logo" src="../assets/senator-logo.svg"
  /></nuxt-link>
</template>

<style>
.VuetifyLogo {
  filter: invert(0.99);
  height: 70px;
  width: 70px;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
