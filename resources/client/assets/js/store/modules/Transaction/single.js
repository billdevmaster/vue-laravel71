function initialState() {
    return {
        item: {
            name: null,
            currency_id: null,
            amount: null,
            rate: null,
            paid_by_client: null,
            return_to_client: null,
            description: null,
            profit: null,
            type: null,
            last_avg_rate: null,
            current_balance: null            
        },
        currency_all: [],
        loading: false,
    }
}

const getters = {
    item: state => state.item,
    loading: state => state.loading,
    currency_all: state => state.currency_all,
}

const actions = {
    storeData({ commit, state, dispatch }) {
        commit('setLoading', true)
        dispatch('Alert/resetState', null, { root: true })

        return new Promise((resolve, reject) => {
            let params = _.cloneDeep(state.item)
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            let formData = new FormData();
            Object.keys(params).forEach(function (key) {
                if (params[key] !== null)
                    formData.append(key, params[key]);
            });
            axios.post('/api/v1/transaction', formData, config)
                .then(response => {
                    commit('resetState')
                    resolve()
                })
                .catch(error => {
                    let message = error.response.data.message || error.message
                    let errors = error.response.data.errors

                    dispatch(
                        'Alert/setAlert', {
                            message: message,
                            errors: errors,
                            color: 'danger'
                        }, {
                            root: true
                        })

                    reject(error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        })
    },
    updateData({ commit, state, dispatch }) {
        commit('setLoading', true)
        dispatch('Alert/resetState', null, { root: true })

        return new Promise((resolve, reject) => {
            let params = _.cloneDeep(state.item)
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            }
            let formData = new FormData();
            formData.append("_method", "PATCH");
            Object.keys(params).forEach(function (key) {
                if(params[key] !== null)
                    formData.append(key, params[key]);
            });
            axios.post('/api/v1/transaction/' + params.id, formData, config)
                .then(response => {
                    console.log(response)
                    commit('setItem', response.data.data)
                    resolve()
                })
                .catch(error => {
                    let message = error.response.data.message || error.message
                    let errors  = error.response.data.errors

                    dispatch(
                        'Alert/setAlert',
                        { message: message, errors: errors, color: 'danger' },
                        { root: true })

                    reject(error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        })
    },
    fetchData({ commit, dispatch }, id) {
        axios.get('/api/v1/transaction/' + id)
            .then(response => {
                commit('setItem', response.data.data)
            })

        dispatch('fetchCurrencyAll')
    },
    fetchCurrencyAll({ commit }) {
        axios.get('/api/v1/currency')
            .then(response => {
                let currency_all = Array();
                response.data.data.forEach(element => {
                    currency_all.push( "Buy-" + element.buy_code + "-" + element.name + "-" + element.id )
                    currency_all.push( "Sell-" + element.sell_code + "-" + element.name + "-" + element.id )
                });
                commit('setCurrencyAll', currency_all)
            })
    },
    fetchCurrencyData({ commit }, id) {
        axios.get('/api/v1/currency/' + id)
            .then(response => {
                commit('setCurrencyName', response.data.data.name)
                commit('setCurrentBalance', response.data.data.current_balance)
                commit('setLastAverageRate', response.data.data.last_avg_rate)
            })
    },
    setBSAmount({ commit }, value) {
        commit('setBSAmount', value)
    },
    setBSRate({ commit }, value) {
        commit('setBSRate', value)
    },
    setPaidByClient({ commit }, value) {
        commit('setPaidByClient', value)
    },
    setReturnToClient({ commit }, value) {
        commit('setReturnToClient', value)
    },
    setType({ commit }, value) {
        commit('setType', value)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setItem(state, item) {
        state.item = item
    },
    setBSAmount(state, value) {
        state.item.amount = value
    },
    setBSRate(state, value) {
        state.item.rate = value
    },
    setPaidByClient(state, value) {
        state.item.paid_by_client = value
    },
    setReturnToClient(state, value) {
        state.item.return_to_client = value
    },
    setLoading(state, loading) {
        state.loading = loading
    },
    setCurrencyAll(state, value) {
        state.currency_all = value
    },
    setCurrencyName(state, value) {
        state.item.name = value
    },
    setCurrentBalance(state, value) {
        state.item.current_balance = value
    },
    setLastAverageRate(state, value) {
        state.item.last_avg_rate = value
    },
    setType(state, value) {
        state.item.type = value
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
