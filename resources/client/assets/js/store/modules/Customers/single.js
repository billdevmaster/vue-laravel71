function initialState() {
    return {
        item: {
            id: null,
            first_name: null,
            last_name: null,
            email: null,
            phone: null,
            company_name: null,
            mobile: null,
            customer_code: null,
            fax: null, 
            birthday: null, 
            eco_ben: null,
            address: null,
            city: null,
            country: null,
            password: null,
            name_id: null,
            id_type: null,
            id_number: null,
            place_issue: null,
            place_birthday: null,
            national: null,
            expire_date: null,
            role_id: 3,
            id_img: null,
            company_img: null,
            mix_img: null,

        },
        loading: false,
    }
}

const getters = {
    item: state => state.item,
    loading: state => state.loading,
}

const actions = {
    storeData({ commit, state, dispatch }) {
        commit('setLoading', true)
        dispatch('Alert/resetState', null, { root: true })

        return new Promise((resolve, reject) => {
            let params = _.cloneDeep(state.item)
            console.log(params);
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            }
            let formData = new FormData();
            Object.keys(params).forEach(function (key) {
                if(params[key] !== null)
                    formData.append(key, params[key]);
            });
            axios.post('/api/v1/customers', formData, config)
                .then(response => {
                    commit('resetState')
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
            
            axios.post('/api/v1/customers/' + params.id, formData, config)
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
        axios.get('/api/v1/customers/' + id)
            .then(response => {
                response.data.data.password = null
                commit('setItem', response.data.data)
            })
    },

    setFirst_name({ commit }, value) {
        commit('setFirst_name', value)
    },
    setLast_name({ commit }, value) {
        commit('setLast_name', value)
    },
    setEmail({ commit }, value) {
        commit('setEmail', value)
    },
    setPhone({ commit }, value) {
        commit('setPhone', value)
    },
    setCompanyName({ commit }, value) {
        commit('setCompanyName', value)
    },
    setMobile({ commit }, value) {
        commit('setMobile', value)
    },
    setFax({ commit }, value) {
        commit('setFax', value)
    },
    setBirthday({ commit }, value) {
        commit('setBirthday', value)
    },
    setEco_ben({ commit }, value) {
        commit('setEco_ben', value)
    },
    setAddress({ commit }, value) {
        commit('setAddress', value)
    },
    setCity({ commit }, value) {
        commit('setCity', value)
    },
    setCoutry({ commit }, value) {
        commit('setCoutry', value)
    },
    setPassword({ commit }, value) {
        commit('setPassword', value)
    },
    setName_id({ commit }, value) {
        commit('setName_id', value)
    },
    setID_type({ commit }, value) {
        commit('setID_type', value)
    },
    setID_number({ commit }, value) {
        commit('setID_number', value)
    },
    setPlace_issue({ commit }, value) {
        commit('setPlace_issue', value)
    },
    setPlace_birthday({ commit }, value) {
        commit('setPlace_birthday', value)
    },
    setNational({ commit }, value) {
        commit('setNational', value)
    },
    setExpire_date({ commit }, value) {
        commit('setExpire_date', value)
    },
    setId_img({ commit }, value) {
        commit('setId_img', value)
    },
    setComapny_img({ commit }, value) {
        commit('setComapny_img', value)
    },
    setMix_img({ commit }, value) {
        commit('setMix_img', value)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {

    setItem(state, item) {
        state.item = item
    },
    setFirst_name(state, value) {
        state.item.first_name = value
    },
    setLast_name(state, value) {
        state.item.last_name = value
    },
    setEmail(state, value) {
        state.item.email = value
    },
    setPhone(state, value) {
        state.item.phone = value
    },
    setCustomerCode(state, value) {
        state.item.customer_code = value
    },
    setCompanyName(state, value) {
        state.item.company_name = value
    },
    setMobile(state, value) {
        state.item.mobile = value
    },
    setFax(state, value) {
        state.item.fax = value
    },
    setBirthday(state, value) {
        state.item.birthday = value
    },
    setEco_ben(state, value) {
        state.item.eco_ben = value
    },
    setAddress(state, value) {
        state.item.address = value
    },
    setCity(state, value) {
        state.item.address = value
    },
    setCoutry(state, value) {
        state.item.country = value
    },
    setPassword(state, value) {
        state.item.password = value
    },
    setName_id(state, value) {
        state.item.name_id = value
    },
    setID_type(state, value) {
        state.item.id_type = value
    },
    setID_number(state, value) {
        state.item.id_number = value
    },
    setPlace_issue(state, value) {
        state.item.place_issue = value
    },
    setPlace_birthday(state, value) {
        state.item.place_birthday = value
    },
    setNational(state, value) {
        state.item.national = value
    },
    setExpire_date(state, value) {
        state.item.expire_date = value
    },
    setId_img(state, value) {
        state.item.id_img = value
    },
    setComapny_img(state, value) {
        state.item.company_img = value
    },
    setMix_img(state, value) {
        state.item.mix_img = value
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
