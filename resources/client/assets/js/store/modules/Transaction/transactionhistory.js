import {json2excel, excel2json} from 'js2excel'
import { countBy } from 'lodash';

function initialState() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return {
        all: [],
        data_all: [],
        item: {
            transaction_type: null,
            calculation_type: null,
            modified_date: today,
            customer: null,
            currency: null,
            operation_type: null,            
        },
        customers: [],
        currencies: [],
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
    data_all:      state => state.data_all,
    item:          state => state.item,
    customers:     state => state.customers,
    currencies:    state => state.currencies,
    total:         state => state.all.length,
    loading:       state => state.loading
}

const actions = {
    fetchDataList({ commit, state }) {
        commit('setLoading', true)
        
        axios.get('/api/v1/transactionhistory')
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
                commit('setDataAll', response.data)
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
    fetchCustomers({ commit, state }) {
        commit('setLoading', true)
        
        axios.get('/api/v1/users/customer')
            .then(response => {
                let users = Array();
                response.data.data.forEach(element => {
                    let user = { 'name': element.first_name, 'customer_code': element.customer_code }
                    users.push(user)
                });
                commit('setCustomers', users)
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
    fetchCurrency({ commit, state }) {
        commit('setLoading', true)
        
        axios.get('/api/v1/currency')
            .then(response => {

                let currencies = Array();
                response.data.data.forEach(element => {
                    let currency = { 'id': element.id, 'name': element.name }
                    currencies.push(currency)
                });
                
                commit('setCurrencies', currencies)
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

        axios.delete('/api/v1/transactionhistory/all')
            .then(response => {
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
    setAll({ commit }, items) {
        commit('setAll', items)
    },
    setQuery({ commit }, value) {
        commit('setQuery', purify(value))
    },
    setModifiedDate({ commit }, value) {
        commit('setModifiedDate', value)
    },
    setTransactionType({ commit }, value) {
        commit('setTransactionType', value)
    },
    setCalculationType({ commit }, value) {
        commit('setCalculationType', value)
    },
    setCustomer({ commit }, value) {
        commit('setCustomer', value)
    },
    setCurrency({ commit }, value) {
        commit('setCurrency', value)
    },
    setOperationType({ commit }, value) {
        commit('setOperationType', value)
    },
    resetState({ commit }) {
        commit('resetState')
    },
    emptyItem({ commit }) {
        commit('emptyItem')
    }
}

const mutations = {
    setAll(state, items) {
        state.all = items
    },
    setDataAll(state, items) {
        state.data_all = items
    },
    setLoading(state, loading) {
        state.loading = loading
    },
    setQuery(state, query) {
        state.query = query
    },
    setModifiedDate(state, modified_date) {
        state.item.modified_date = modified_date
    },
    setTransactionType(state, transaction_type) {
        state.item.transaction_type = transaction_type
    },
    setCalculationType(state, calculation_type) {
        state.item.calculation_type = calculation_type
    },
    setOperationType(state, operation_type) {
        state.item.operation_type = operation_type
    },
    setCustomer(state, customer) {
        state.item.customer = customer
    },
    setCurrency(state, currency) {
        state.item.currency = currency
    },
    setCustomers(state, customers) {
        state.customers = customers
    },
    setCurrencies(state, currencies) {
        state.currencies = currencies
    },
    resetState(state) {
        state = Object.assign(state, initialState())
    },
    emptyItem(state) {
        var today = new Date()
        var dd = String(today.getDate()).padStart(2, '0')
        var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd
        state.item = {
            transaction_type: null,
            calculation_type: null,
            modified_date: today,
            customer: null,
            currency: null,
            operation_type: null,
        }
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
