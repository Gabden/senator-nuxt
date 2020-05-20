<template>
  <v-system-bar app dark flat class="blue-grey darken-4" height="30" cols="12">
    <a
      class="blue-grey darken-4 white--text text-center mr-5 links--info"
      text
      rounded
      href="/"
    >
      <span>О нас</span>
    </a>

    <a
      class="blue-grey darken-4 white--text d-block my-3 text-center mr-5 links--info"
      text
      rounded
      href="/"
    >
      <span>Корпоративным клиентам</span>
    </a>

    <a
      class="blue-grey darken-4 white--text d-block my-3 text-center mr-5 links--info"
      text
      rounded
      href="/"
    >
      <span>Контакты</span>
    </a>

    <a
      class="blue-grey darken-4 white--text d-block my-3 text-center mr-5 links--info"
      text
      rounded
      href="/"
    >
      <span>Резерв</span>
    </a>

    <v-spacer></v-spacer>
    <a
      class="blue-grey darken-4 white--text d-block my-3 text-center mr-3 links--info"
      text
      rounded
      :href="`tel:+79209551894`"
    >
      <v-icon class="green--text mr-1" style="font-size:0.8rem"
        >mdi-phone</v-icon
      >
      <span>+7(920)-955-18-94</span>
    </a>
    |
    <a
      class="blue-grey darken-4 white--text d-block text-center ml-3 links--info"
      text
      rounded
      :href="`tel:+74912281937`"
    >
      <v-icon class="green--text mr-1" style="font-size:0.8rem"
        >mdi-phone</v-icon
      >
      <span>+7(4912)-28-19-37</span>
    </a>
  </v-system-bar>
</template>

<script>
export default {
  transition: 'page'
}
</script>

<style scoped>
.links--info {
  letter-spacing: 1px;
}
.links--info:hover {
  color: aqua;
}
a {
  font-size: 0.75rem;
  text-decoration: none;
}
a span:hover {
  color: #d50000;
}
</style>
