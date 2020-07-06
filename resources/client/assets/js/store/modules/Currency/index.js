function initialState() {
    return {
        all: [],
        query: {},
        loading: false,
        temp: ''
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
}

const actions = {
    fetchData({ commit, state }) {
        commit('setLoading', true)

        axios.get('/api/v1/currency')
            .then(response => {
                for (let i = 0; i < response.data.data.length; i++) {
                    commit('thousandsSeparators', parseFloat(response.data.data[i]['current_balance']).toFixed(2));
                    response.data.data[i]['current_balance'] = state.temp
                    commit('thousandsSeparators', parseFloat(response.data.data[i]['last_avg_rate']).toFixed(2));
                    response.data.data[i]['last_avg_rate'] = state.temp
                }
                commit('setAll', response.data.data)
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
    destroyData({ commit, state }, id) {
        axios.delete('/api/v1/currency/' + id)
            .then(response => {
                commit('setAll', state.all.filter((item) => {
                    return item.id != id
                }))
            })
            .catch(error => {
                message = error.response.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    setQuery({ commit }, value) {
        commit('setQuery', purify(value))
    },
    resetState({ commit }) {
        commit('resetState')
    }
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
    resetState(state) {
        state = Object.assign(state, initialState())
    },
    thousandsSeparators(state, num) {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        state.temp = num_parts.join(".");
    }
}

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
