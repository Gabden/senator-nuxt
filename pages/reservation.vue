<template>
  <div class="my-5">
    <h3 class="display-1 mb-5 text-center">Порядок резервирования товара</h3>

    <div v-for="item in items" :key="item.text" class="headline mb-5 mx-1">
      <v-icon class="mr-4" color="#d50000">{{ item.icon }}</v-icon>
      <span>{{ item.text }}</span>
    </div>

    <p>
      ВНИМАНИЕ! Мы не осуществляем доставку и не принимаем онлайн-платежи, так
      как это запрещено законом Российской Федерации (Постановление
      Правительства РФ от 27.09.2007 г. №612, ред. от 04.10.2012).
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { text: 'Выберите интересующий товар', icon: 'mdi-magnify' },
        { text: 'Добавьте товар в корзину', icon: 'mdi-cart' },
        { text: 'Перейдите в корзину и оформите резерв', icon: 'mdi-basket' },
        { text: 'Дождитесь звонка от менеджера', icon: 'mdi-phone' },
        { text: 'Оплатите покупку', icon: 'mdi-credit-card' },
        { text: 'Заберите зарезервированные товары', icon: 'mdi-bag-checked' }
      ]
    }
  }
}
</script>

<style></style>
