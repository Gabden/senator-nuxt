<template>
  <v-menu
    v-model="showDatePicker"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="birthDate"
        label="Дата рождения"
        prepend-icon="mdi-account"
        readonly
        v-on="on"
        @click="setMinDate"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="birthDate"
      :max="allowedToRegisterDates"
      color="blue-grey darken-4"
      @input="showDatePicker = false"
    ></v-date-picker>
  </v-menu>
</template>
<script>
export default {
  name: 'BirthPicker',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      birthDate: '',
      showDatePicker: false
    }
  },
  computed: {
    allowedToRegisterDates() {
      const currentDate = new Date()
      const eighteenYearsAgo = currentDate.getFullYear() - 18
      const monthAndDay = currentDate
        .toISOString()
        .slice(0, 10)
        .substring(4)
      return `${eighteenYearsAgo}${monthAndDay}`
    }
  },
  watch: {
    birthDate() {
      this.$emit('input', this.birthDate)
    }
  },
  created() {
    this.birthDate = this.value
  },
  methods: {
    setMinDate() {
      if (this.birthDate) {
        return
      }
      this.birthDate = this.allowedToRegisterDates
    }
  }
}
</script>
