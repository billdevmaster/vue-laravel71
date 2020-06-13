function initialState() {
    return {
        item: {
            name: null,
            opening_balance: null,
            current_balance: null
        },
        loading: false,
    }
}

const getters = {
    item: state => state.item,
    loading: state => state.loading
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
            axios.post('/api/v1/cases', formData, config)
                .then(response => {
                    if (!response.data.hasCase)
                    {
                        let message = response.data.errors
                        let errors = response.data.errors

                        dispatch(
                            'Alert/setAlert', {
                                message: message,
                                color: 'danger'
                            }, {
                                root: true
                            })
                    }
                    else
                    {
                        commit('resetState')
                        resolve()
                    }
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
            
            axios.post('/api/v1/cases/' + params.id, formData, config)
                .then(response => {
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
        axios.get('/api/v1/cases/' + id)
            .then(response => {
                response.data.data.password = null
                commit('setItem', response.data.data)
            })
    },

    setName({ commit }, value) {
        commit('setName', value)
    },
    setOpening_balance({ commit }, value) {
        commit('setOpening_balance', value)
    },
    setCurrent_balance({ commit }, value) {
        commit('setCurrent_balance', value)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setItem(state, item) {
        state.item = item
    },
    setName(state, value) {
        state.item.name = value
    },
    setOpening_balance(state, value) {
        state.item.opening_balance = value
    },
    setCurrent_balance(state, value) {
        state.item.current_balance = value
    },
    setLoading(state, loading) {
        state.loading = loading
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
