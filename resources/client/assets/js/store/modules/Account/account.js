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
        item: {
            id: null,
            serial_number: null,
            user: null,
            product: null,
            amount: null,
            note: null,
            create_date: today,
            type: null,            
        },
        users: [],
        products: [],
        query: {},
        loading: false,
        type: null,
        selected_user: null
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
    item:          state => state.item,
    users:         state => state.users,
    products:      state => state.products,
    total:         state => state.all.length,
    loading:       state => state.loading,
    type:          state => state.type,
    selected_user: state => state.selected_user
}

const actions = {
    fetchDataList({ commit, state }) {
        commit('setLoading', true)
        
        axios.get('/api/v1/account/' + state.type)
            .then(response => {
                commit('setAll', response.data)
                if (response.data.length)
                    commit('setCurrentSerialNumber', parseInt( response.data[response.data.length - 1]['serial_number'] ) + 1)
                else
                    commit('setCurrentSerialNumber', 100000)
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
    fetchData({ commit, dispatch }, id) {
        axios.get('/api/v1/account/' + id)
            .then(response => {
                if (response.data.length) {
                    commit('setItem', response.data[0])
                }
            })        
    },      
    storeData({ commit, state, dispatch }) {
        commit('setLoading', true)
        dispatch('Alert/resetState', null, { root: true })

        return new Promise((resolve, reject) => {
            let params = _.cloneDeep(state.item)

            axios.post('/api/v1/account', params)
                .then(response => {
                    dispatch('fetchDataList')
                    dispatch('emptyItem')
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
    updateData({ commit, state, dispatch }, id) {
        commit('setLoading', true)
        dispatch('Alert/resetState', null, { root: true })

        return new Promise((resolve, reject) => {
            let params = _.cloneDeep(state.item)

            axios.put('/api/v1/account/' + id, params)
                .then(response => {
                    dispatch('fetchDataList')
                    dispatch('emptyItem')
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
    destroyData({ commit, state }, id) {
        axios.delete('/api/v1/account/' + id)
            .then(response => {
                let params = id.split('-');
                
                commit('setAll', state.all.filter((item) => {
                    return item.id != params[0]
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
    setType({ commit }, value) {
        commit('setType', value)
    },
    setCreateDate({ commit }, value) {
        commit('setCreateDate', value)
    },
    setUser({ commit }, value) {
        commit('setUser', value)
    },
    setProduct({ commit }, value) {
        commit('setProduct', value)
    },
    setAmount({ commit }, value) {
        commit('setAmount', value)
    },
    setNote({ commit }, value) {
        commit('setNote', value)
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
    setItem(state, item) {
        state.item.id               = item['id']
        state.item.serial_number    = item['serial_number']
        state.item.user             = { 'name': item['user_name'], 'id': item['user_id'] }
        state.item.product          = { 'name': item['product_name'], 'id': item['product_id'] }
        state.item.amount           = item['amount']
        state.item.note             = item['note']
        state.item.create_date      = item['create_date']
    },
    setLoading(state, loading) {
        state.loading = loading
    },
    setType(state, type) {
        state.type = type
        state.item.type = type
    },
    setCurrentSerialNumber(state, serial_number) {
        if (state.item.serial_number == null) {
            state.item.serial_number = serial_number
        }
    },
    setQuery(state, query) {
        state.query = query
    },
    setCreateDate(state, create_date) {
        state.item.create_date = create_date
    },
    setUser(state, user) {
        state.item.user = user
    },
    setProduct(state, product) {
        state.item.product  = product
    },
    setAmount(state, amount) {
        state.item.amount = amount
    },
    setNote(state, note) {
        state.item.note = note
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
            id: null,
            serial_number: null,
            user: null,
            product: null,
            amount: null,
            note: null,
            create_date: today,
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
