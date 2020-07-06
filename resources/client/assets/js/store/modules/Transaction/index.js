function initialState() {
    return {
        all: [],
        query: {},
        loading: false,
        data_all: [],
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
    data_all: state => {
        let rows = state.data_all

        if (state.query.sort) {
            rows = _.orderBy(state.data_all, state.query.sort, state.query.order)
        }

        return rows
    },
    total:         state => state.data_all.length,
    loading:       state => state.loading,
    temp:          state => state.temp
}

const actions = {
    fetchData({ commit, state }) {
        commit('setLoading', true)

        axios.get('/api/v1/transaction')
            .then(response => {
                
                for (let i = 0; i < response.data.length; i++) {
                    commit('thousandsSeparators', parseFloat(response.data[i]['amount']).toFixed(parseInt(response.data[i]['bs_amount_dec_limit'])));
                    response.data[i]['amount']          = state.temp
                    commit('thousandsSeparators', parseFloat(response.data[i]['rate']).toFixed(parseInt(response.data[i]['avg_rate_dec_limit'])));
                    response.data[i]['rate']            = state.temp
                    commit('thousandsSeparators', parseFloat(response.data[i]['current_balance']).toFixed(parseInt(response.data[i]['balance_dec_limit'])));
                    response.data[i]['current_balance'] = state.temp
                    commit('thousandsSeparators', parseFloat(response.data[i]['last_avg_rate']).toFixed(parseInt(response.data[i]['last_avg_rate_dec_limit'])));
                    response.data[i]['last_avg_rate'] = state.temp
                    commit('thousandsSeparators', parseFloat(response.data[i]['total']).toFixed(2));
                    response.data[i]['total'] = state.temp
                }
                commit('setAll', response.data)
                commit('setInitialData', response.data)
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
    removeAllData({ commit, state }) {
        commit('setLoading', true)

        axios.delete('/api/v1/transaction/all')
            .then(response => {
                console.log(response)
                commit('resetState')
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
        axios.delete('/api/v1/transaction/' + id)
            .then(response => {
                if (response.data.hasCase == false) {
                    console.log(response)
                    let message = response.data.errors
                    let errors = response.data.errors
                }
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
    },
    setAll({ commit }, value) {
        commit('setAll', value)
    },
    setInitialData(state, items) {
        state.data_all = items
    }
}

const mutations = {
    setAll(state, items) {
        state.all = items
    },
    setInitialData(state, items) {
        state.data_all = items
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
        state.temp =  num_parts.join(".");
    }
}

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
