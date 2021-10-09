<template>
  <div>
    <v-flex>
      <v-row class="mx-auto justify-center">
        <v-col class="mx-auto d-flex justify-center">
          <img
            v-lazy-load
            src="../assets/corporate.jpg"
            alt="logo"
            class="mx-auto"
            style="max-width: 90vw; max-height: 65vh"
          />
        </v-col>
      </v-row>
    </v-flex>

    <h2 class="mt-3 text-center">Корпоративным клиентам</h2>
    <p class="text-justify">
      Приближается праздник, не знаете что подарить? В нашем магазине только
      высококачественная и сертифицированная продукция премиальных брендов!
    </p>
    <p class="text-justify">
      Мы поможем подобрать напитки и подарки под ваши задачи и бюджет. На нашем
      сайте легко сделать выбор самостоятельно и зарезервировать понравившийся
      товар.
    </p>
    <div class="mt-3">
      <h4 class="text-center">Гарантии качества</h4>
      <p class="text-justify">
        Все напитки сертифицированы и имеют гарантию подлинности. Благодаря
        оптимальным условиям хранения напитки сохраняют все свои вкусовые
        качества и органолептические свойства.
      </p>
    </div>
    <div class="mt-3">
      <h4 class="text-center">Оплата</h4>
      <p>
        Возможна оплата товара кредитной картой, наличными и по безналичному
        расчёту от юридических лиц.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '«СЕНАТОР» - для бизнеса',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Представлена информация для B2B клиентов senator-wine.ru'
        }
      ]
    }
  }
}
</script>

<style></style>
