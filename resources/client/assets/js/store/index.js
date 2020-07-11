import Vue from 'vue'
import Vuex from 'vuex'

import RolesIndex from './modules/Roles'
import RolesSingle from './modules/Roles/single'
import UsersIndex from './modules/Users'
import UsersSingle from './modules/Users/single'
import CompaniesIndex from './modules/Companies'
import CompaniesSingle from './modules/Companies/single'
import EmployeesIndex from './modules/Employees'
import EmployeesSingle from './modules/Employees/single'

import CustomersIndex from './modules/Customers'
import CustomersSingle from './modules/Customers/single'
import CasesIndex from './modules/Cases'
import CasesSingle from './modules/Cases/single'
import CurrencyIndex from './modules/Currency'
import CurrencySingle from './modules/Currency/single'
import TransactionIndex from './modules/Transaction'
import TransactionSingle from './modules/Transaction/single'
import ProfitIndex from './modules/Profit'

import AccountIndex from './modules/Account/account'
import HistoryIndex from './modules/Account/history'
import AccountChangeIndex from './modules/Account/accountchange'

import LoginHistoryIndex from './modules/Account/loginhistory'

import ProductIndex from './modules/Product'
import ProductSingle from './modules/Product/single'

import Alert from './modules/alert'
import ChangePassword from './modules/change_password'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        Alert,
        ChangePassword,
        RolesIndex,
        RolesSingle,
        UsersIndex,
        UsersSingle,
        CompaniesIndex,
        CompaniesSingle,
        EmployeesIndex,
        EmployeesSingle,
        CustomersIndex,
        CustomersSingle,
        CasesIndex,
        CasesSingle,
        CurrencyIndex,
        CurrencySingle,
        TransactionIndex,
        TransactionSingle,
        ProfitIndex,
        AccountIndex,
        AccountChangeIndex,
        HistoryIndex,
        LoginHistoryIndex,
        ProductIndex,
        ProductSingle,
    },
    strict: debug,
})
