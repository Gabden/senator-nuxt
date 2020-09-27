// import requestsService from '../services/requestsService'

export const state = () => ({
  cart: {
    cartId: '',
    cartItems: []
  }
})
export const mutations = {
  FETCH_CART(state, cart) {
    state.cart = cart
  },
  ADD_TO_CART(state, product) {
    state.cart.cartItems.push(product)
  },
  CHANGE_QUANTITY(state, productUpdated) {
    const prod = state.cart.cartItems.find(
      (product) => product.id === productUpdated.id
    )
    prod.quantity = productUpdated.quantity
  },
  REMOVE_FROM_CART(state, productToDelete) {
    state.cart.cartItems = state.cart.cartItems.map(
      (product) => product.id !== productToDelete.id
    )
  },
  UPDATE_GRAND_TOTAL(state) {
    let grandTotalUpdated = 0
    state.cart.cartItems.forEach((cartItem) => {
      grandTotalUpdated += cartItem.product.productPrice * cartItem.quantity
    })
    state.cart.grandTotal = grandTotalUpdated
  }
}
export const actions = {
  addToCart({ commit }, product) {
    commit('ADD_TO_CART', product)
    commit('UPDATE_GRAND_TOTAL')
    // TODO upgrade cart cookies
  },
  removeFromCart({ commit }, product) {
    commit('REMOVE_FROM_CART', product)
    commit('UPDATE_GRAND_TOTAL')
    // TODO upgrade cart cookies
  },
  changeQuantity({ commit }, product) {
    commit('CHANGE_QUANTITY', product)
    commit('UPDATE_GRAND_TOTAL')
    // TODO upgrade cart cookies
  },
  updateGrandTotal({ commit }) {
    commit('UPDATE_GRAND_TOTAL')
  },
  fetchCart({ commit }, cart) {
    commit('FETCH_CART', cart)
    // TODO upgrade cart cookies
  }
}
export const getters = {
  cartQuantity(state) {
    let quantity = 0
    if (state.cart.cartItems.length === 0) {
      return 0
    }
    state.cart.cartItems.forEach((item) => (quantity += item.quantity))
    return quantity
  },
  grandTotal(state) {
    const grandTotal = state.cart.cartItems.reduce(
      (total, item) => (total += item.product.productPrice * item.quantity),
      0
    )
    return grandTotal
  }
}
