function initialState() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    return {
        all: [],
        query: {},
        loading: false,
        item: {
            from: today,
            to: today
        },
        total_profit: null
    }
}

const getters = {
    data: state => {
        let rows = state.all

        if (state.query.sort) {
            rows = _.orderBy(state.all, state.query.sort, state.query.order)
        }

        return rows.slice(state.query.offset, state.query.offset + state.query.limit)
    },
    total:         state => state.all.length,
    loading:       state => state.loading,
    item:          state => state.item,
    total_profit:  state => state.total_profit,
}

const actions = {
    fetchData({ commit, state }) {
        commit('setLoading', true)
        let date_from_to = state.item.from + ':' + state.item.to

        axios.get('/api/v1/profit/' + date_from_to)
            .then(response => {
                let total_profit = 0
                response.data.forEach(element => {
                    total_profit += parseFloat(element.currency_profit)
                });
                commit('setAll', response.data)
                commit('setTotalProfit', total_profit)
            })
            .catch(error => {
                message = error.response.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
            .finally(() => {
                commit('setLoading', false)
            })
    },
    setQuery({ commit }, value) {
        commit('setQuery', purify(value))
    },
    resetState({ commit }) {
        commit('resetState')
    },
    setAll({ commit }, value) {
        commit('setAll', value)
    },
    setFrom({ commit }, value) {
        commit('setFrom', value)
    },
    setTo({ commit }, value) {
        commit('setTo', value)
    },
}

const mutations = {
    setAll(state, items) {
        state.all = items
    },
    setLoading(state, loading) {
        state.loading = loading
    },
    setQuery(state, query) {
        state.query = query
    },
    setFrom(state, value) {
        state.item.from = value
    },
    setTo(state, value) {
        state.item.to = value
    },
    setTotalProfit(state, value) {
        state.total_profit = value
    },
    resetState(state) {
        state = Object.assign(state, initialState())
    }
}

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
