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
            serial_number: '',
            create_date: today,
            user: null,
            product: null,
            operation_type: null,
            type: null,            
        },
        users: [],
        products: [],
        query: {},
        loading: false,
        type: null
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
    users:         state => state.users,
    products:      state => state.products,
    total:         state => state.all.length,
    loading:       state => state.loading,
    type:          state => state.type
}

const actions = {
    fetchDataList({ commit, state }) {
        commit('setLoading', true)
        
        axios.get('/api/v1/accountchange/' + state.type)
            .then(response => {
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
    fetchUsers({ commit, state }) {
        commit('setLoading', true)
        
        axios.get('/api/v1/users/user')
            .then(response => {

                let users = Array();
                response.data.data.forEach(element => {
                    let user = { 'name': element.name, 'id': element.id }
                    users.push(user)
                });
                
                commit('setUsers', users)
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
    fetchProducts({ commit, state }) {
        commit('setLoading', true)
        
        axios.get('/api/v1/product/active')
            .then(response => {

                let products = Array();
                response.data.data.forEach(element => {
                    let product = { 'id': element.id, 'name': element.name }
                    products.push(product)
                });
                
                commit('setProducts', products)
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
    setType({ commit }, value) {
        commit('setType', value)
    },
    setCreateDate({ commit }, value) {
        commit('setCreateDate', value)
    },
    setSerialNumber({ commit }, value) {
        commit('setSerialNumber', value)
    },
    setUser({ commit }, value) {
        commit('setUser', value)
    },
    setProduct({ commit }, value) {
        commit('setProduct', value)
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
    setType(state, type) {
        state.type = type
        state.item.type = type
    },
    setSerialNumber(state, serial_number) {
        state.item.serial_number = serial_number
    },
    setCreateDate(state, create_date) {
        state.item.create_date = create_date
    },
    setUser(state, user) {
        state.item.user = user
    },
    setProduct(state, product) {
        state.item.product = product
    },
    setOperationType(state, operation_type) {
        state.item.operation_type = operation_type
    },
    setUsers(state, users) {
        state.users = users
    },
    setProducts(state, products) {
        state.products = products
    },
    resetState(state) {
        state = Object.assign(state, initialState())
    },
    emptyItem(state) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        state.item = {
            serial_number: '',
            create_date: today,
            user: null,
            product: null,
            operation_type: null,
            type: state.type,
        }
    }
}

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
