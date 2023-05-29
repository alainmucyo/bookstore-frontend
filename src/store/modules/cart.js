// store/modules/cart.js
const state = {
    cartItems: []
};

const mutations = {
    ADD_TO_CART(state, book) {
        state.cartItems.push(book);
    }
};

const actions = {
    addToCart({ commit }, book) {
        commit('ADD_TO_CART', book);
    }
};
const getters = {
    cartItems: state => state.cartItems
}

export default {
    state,
    mutations,
    actions,
    getters
};
