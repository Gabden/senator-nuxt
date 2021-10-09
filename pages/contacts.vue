<template>
  <section id="address" class="mb-4">
    <v-row>
      <v-col cols="12" sm="4">
        <h2 class="mt-3 font-bold text-dark" style="white-space: nowrap">
          ООО "СЕНАТОР"
        </h2>
        <p class="l">ул. Свободы, 24 а</p>
        <p class="lean">Рязанская обл., г.Рязань, 390006</p>
        <p class="lean">Директор Сухов Алексей Иванович</p>
        <p class="lean">+7-920-955-18-94</p>
        <p class="lean">+7(4912)-28-19-37</p>
        <p class="lean">senator24a@mail.ru</p>
        <p><a href="/" class="lean">www.senator-wine.ru</a></p>
        <p class="lean">Время работы:</p>
        <p class="lean">понедельник-суббота 10:00-20:00</p>
        <p class="lean">воскресенье 10:00-18.00</p></v-col
      >
      <v-col cols="12" sm="8">
        <img
          v-lazy-load
          src="../assets/location.jpg"
          alt="address"
          style="width: 100%; height: 100%"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: '«СЕНАТОР» - контакты магазина',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "Представлены все способы связи с бутиком ООО 'Сенатор' 'Лучшие вина мира' и 'Галерея подарков'"
        }
      ]
    }
  }
}
</script>

<style></style>
