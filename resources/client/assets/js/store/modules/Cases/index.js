function initialState() {
    return {
        all: [],
        query: {},
        loading: false,
        total_profit: null,
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
    loading: state => state.loading,
    total_profit: state => state.total_profit,
}

const actions = {
    fetchData({ commit, state }) {
        commit('setLoading', true)

        axios.get('/api/v1/cases')
            .then(response => {
                commit('thousandsSeparators', parseFloat(response.data.data[0]['opening_balance']).toFixed(2));
                response.data.data[0]['opening_balance'] = state.temp
                commit('thousandsSeparators', parseFloat(response.data.data[0]['current_balance']).toFixed(2));
                response.data.data[0]['current_balance'] = state.temp
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
    fetchProfit({ commit, state }) {
        commit('setLoading', true)
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        let date_from_to = '1900-01-01:' + today

        axios.get('/api/v1/profit/' + date_from_to)
            .then(response => {
                let total_profit = 0
                response.data.forEach(element => {
                    total_profit += parseFloat(element.currency_profit)
                });
                commit('thousandsSeparators', total_profit.toFixed(2));
                total_profit = state.temp
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
    destroyData({ commit, state }, id) {
        axios.delete('/api/v1/cases/' + id)
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
    setTotalProfit(state, value) {
        state.total_profit = value
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
