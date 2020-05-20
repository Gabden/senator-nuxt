<template>
  <v-sheet height="400" class="overflow-hidden" style="position: relative;">
    <v-navigation-drawer
      v-model="drawer"
      :absolute="!isScrolled"
      :app="isScrolled"
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'mdi-dashboard' },
        { title: 'About', icon: 'mdi-question-answer' }
      ]
    }
  },
  computed: {
    isScrolled() {
      return this.$store.state.main.isScrolled
    }
  },
  watch: {
    drawer() {
      this.$store.dispatch('main/switchDrawer', this.drawer)
    }
  }
}
</script>

<style></style>
