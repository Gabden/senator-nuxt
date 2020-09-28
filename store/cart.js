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
    state.cart.cartItems = state.cart.cartItems.map(
      (product) => product.id !== productToDelete.id
    )
  }
}
export const actions = {
  addToCart({ commit }, product) {
    commit('ADD_TO_CART', product)
    // TODO upgrade cart cookies
  },
  removeFromCart({ commit }, product) {
    commit('REMOVE_FROM_CART', product)
    // TODO upgrade cart cookies
  },
  changeQuantity({ commit }, product) {
    commit('CHANGE_QUANTITY', product)
    // TODO upgrade cart cookies
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
      (total, item) => (total += item.product.productPrice * item.quantity),
      0
    )
    return grandTotal
  }
}
