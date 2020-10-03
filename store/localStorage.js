export const state = () => ({
  cart: {
    cartId: '',
    cartItems: []
  },
  isAgeEnough: true,
  newOrders: 0
})
export const mutations = {
  SET_ORDERS_QUANTITY(state, value) {
    state.newOrders = value
  },
  SET_AGE_ENOUGH(state, value) {
    state.isAgeEnough = value
  },
  FETCH_CART(state, cart) {
    state.cart = cart
  },
  SET_CART_ID(state, id) {
    state.cart.cartId = id
  },
  ADD_TO_CART(state, product) {
    const cartProduct = state.cart.cartItems.find(
      (item) => item.product.productId === product.product.productId
    )
    if (!cartProduct) {
      state.cart.cartItems = [...state.cart.cartItems, product]
    } else {
      cartProduct.quantity += product.quantity
      cartProduct.quantity = cartProduct.quantity > 6 ? 6 : cartProduct.quantity
    }
  },
  CHANGE_QUANTITY(state, productUpdated) {
    const prod = state.cart.cartItems.find(
      (item) =>
        item.product.productId === productUpdated.product.product.productId
    )
    prod.quantity = productUpdated.quantity
  },
  REMOVE_FROM_CART(state, productToDelete) {
    state.cart.cartItems = state.cart.cartItems.filter(
      (item) =>
        item.product.productId !== productToDelete.product.product.productId
    )
  },
  CLEAR_CART(state) {
    state.cart.cartItems = []
  },
  CALC_DISCOUNT(state, quantityAlco) {
    if (quantityAlco > 0 && quantityAlco < 3) {
      state.cart.cartItems.forEach((item) => {
        item.discount = item.product.discount
        if (item.product.productSalePrice) {
          item.cartItemFinalPrice = item.product.productSalePrice
        } else {
          item.cartItemFinalPrice = Math.ceil(
            (+item.cartItemPrice * (100 - item.discount)) / 100
          )
        }
        item.totalPrice = item.quantity * item.cartItemFinalPrice
      })
    }

    if (quantityAlco >= 3 && quantityAlco < 6) {
      state.cart.cartItems.forEach((item) => {
        if (
          (item.discount < 15 || item.discount === 20) &&
          item.product.productCategory.includes('alcohol')
        ) {
          item.discount = 15
          if (item.product.productSalePrice) {
            item.cartItemFinalPrice = item.product.productSalePrice
          } else {
            item.cartItemFinalPrice = Math.ceil(
              (+item.cartItemPrice * (100 - item.discount)) / 100
            )
          }
          item.totalPrice = item.quantity * item.cartItemFinalPrice
        }
      })
    }
    if (quantityAlco >= 6) {
      state.cart.cartItems.forEach((item) => {
        if (
          item.discount < 20 &&
          item.product.productCategory.includes('alcohol')
        ) {
          item.discount = 20
          if (item.product.productSalePrice) {
            item.cartItemFinalPrice = item.product.productSalePrice
          } else {
            item.cartItemFinalPrice = Math.ceil(
              (+item.cartItemPrice * (100 - item.discount)) / 100
            )
          }
          item.totalPrice = item.quantity * item.cartItemFinalPrice
        }
      })
    }
  }
}
export const actions = {
  addToCart({ commit }, product) {
    commit('ADD_TO_CART', product)
    commit('CALC_DISCOUNT', getters.quantityAlcohol)
    // TODO upgrade cart cookies
  },
  removeFromCart({ commit, getters }, product) {
    commit('REMOVE_FROM_CART', product)
    commit('CALC_DISCOUNT', getters.quantityAlcohol)
    // TODO upgrade cart cookies
  },
  changeQuantity({ commit, getters }, product) {
    commit('CHANGE_QUANTITY', product)
    commit('CALC_DISCOUNT', getters.quantityAlcohol)
    // TODO upgrade cart cookies
  },
  clearCart({ commit, getters }) {
    commit('CLEAR_CART')
    commit('CALC_DISCOUNT', getters.quantityAlcohol)
  },
  fetchCart({ commit }, cart) {
    commit('FETCH_CART', cart)
    // TODO upgrade cart cookies
  }
}
export const getters = {
  cartQuantity(state) {
    const quantity = state.cart.cartItems.reduce(
      (total, item) => (total += item.quantity),
      0
    )
    return quantity
  },
  grandTotal(state) {
    const grandTotal = state.cart.cartItems.reduce(
      (total, item) => (total += item.cartItemPrice * item.quantity),
      0
    )
    return grandTotal
  },
  grandTotalWithSale(state) {
    const gtSale = state.cart.cartItems.reduce((total, item) => {
      if (item.product.productSalePrice) {
        total += item.product.productSalePrice * item.quantity
      } else {
        total +=
          item.cartItemPrice * ((100 - item.discount) / 100) * item.quantity
      }
      return total
    }, 0)
    return Math.ceil(gtSale)
  },
  quantityAlcohol(state) {
    const quantityAlco = state.cart.cartItems.reduce((total, item) => {
      if (item.product.productCategory.includes('alcohol')) {
        total += item.quantity
      }
      return total
    }, 0)

    return quantityAlco
  }
}
