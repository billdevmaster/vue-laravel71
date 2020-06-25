function initialState() {
    return {
        item: {
            name: null,
            customer_id: null,
            customer_code: null,
            currency_id: null,
            currency_code: null,
            calc_type: null,
            amount: null,
            rate: null,
            paid_by_client: null,
            return_to_client: null,
            description: null,
            profit: null,
            type: null,
            last_avg_rate: null,
            rate_from: null,
            rate_to: null,
            bs_amount_dec_limit: null,
            avg_rate_dec_limit: null,
            current_balance: null            
        },
        currency_all: [],
        customer_all: [],
        loading: false,
    }
}

const getters = {
    item: state => state.item,
    loading: state => state.loading,
    currency_all: state => state.currency_all,
    customer_all: state => state.customer_all,
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
                    console.log(response.data)
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
                commit('setItem', response.data)
            })

        dispatch('fetchCurrencyAll')
    },
    fetchCurrencyAll({ commit }) {
        axios.get('/api/v1/currency')
            .then(response => {
                let currency_all = Array();
                response.data.data.forEach(element => {
                    currency_all.push("Buy-" + element.buy_code + "-" + element.name + "-" + element.id)
                    currency_all.push("Sell-" + element.sell_code + "-" + element.name + "-" + element.id)
                });
                commit('setCurrencyAll', currency_all)
            })
    },
    fetchCustomerAll({ commit }) {
        axios.get('/api/v1/customers')
            .then(response => {
                let customer_all = Array();
                response.data.data.forEach(element => {
                    customer_all.push(element.customer_code + "-" + element.first_name + " " + element.last_name)
                });
                commit('setCustomerAll', customer_all)
            })
    },
    fetchCurrencyData({ commit }, value) {
        
        if (value == null) {
            commit('setCurrencyName', '')
            commit('setCurrentBalance', '')
            commit('setLastAverageRate', '')
            commit('setCurrencyID', '')
            commit('setCurrencyCalculationType', '')
            commit('setAmountDecLimit', '')
            commit('setRateDecLimit', '')
            commit('setType', '')
            commit('setRateFrom', '')
            commit('setRateTo', '')
            commit('setPaidByClient', '')
            commit('setReturnToClient', '')
            return
        }
        let data = value.split('-')

        axios.get('/api/v1/currency/' + data[0])
            .then(response => {
                commit('setCurrencyName', response.data.data.name)
                commit('setCurrentBalance', response.data.data.current_balance)
                commit('setLastAverageRate', response.data.data.last_avg_rate)
                commit('setCurrencyID', response.data.data.id)
                commit('setCurrencyCalculationType', response.data.data.calc_type)
                commit('setAmountDecLimit', response.data.data.bs_amount_dec_limit)
                commit('setRateDecLimit', response.data.data.avg_rate_dec_limit)
                
                if (data[1] == 'Buy') {
                    commit('setRateFrom', response.data.data.buy_rate_from)
                    commit('setRateTo', response.data.data.buy_rate_to)
                    commit('setPaidByClient', 0)
                    commit('setReturnToClient', 0)
                } else {
                    commit('setRateFrom', response.data.data.sell_rate_from)
                    commit('setRateTo', response.data.data.sell_rate_to)
                }
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
    setTotal({ commit }, value) {
        commit('setTotal', value)
    },
    setRateFrom({ commit }, value) {
        commit('setRateFrom', value)
    },
    setRateTo({ commit }, value) {
        commit('setRateTo', value)
    },
    setAmountDecLimit({ commit }, value) {
        commit('setAmountDecLimit', value)
    },
    setRateDecLimit({ commit }, value) {
        commit('setRateDecLimit', value)
    },
    setCustomerCode({ commit }, value) {
        commit('setCustomerCode', value)
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
    setCustomerAll(state, value) {
        state.customer_all = value
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
    setCustomerCode(state, value) {
        state.item.customer_code = value
    },
    setCurrencyID(state, value) {
        state.item.currency_id = value
    },
    setTotal(state, value) {
        state.item.total = value
    },
    setRateFrom(state, value) {
        state.item.rate_from = value
    },
    setRateTo(state, value) {
        state.item.rate_to = value
    },
    setAmountDecLimit(state, value) {
        state.item.bs_amount_dec_limit = value
    },
    setRateDecLimit(state, value) {
        state.item.avg_rate_dec_limit = value
    },
    setCurrencyCalculationType(state, value) {
        state.item.calc_type = value
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
