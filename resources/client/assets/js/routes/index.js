import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home.vue'
import ChangePassword from '../components/ChangePassword.vue'
import RolesIndex from '../components/cruds/Roles/Index.vue'
import RolesCreate from '../components/cruds/Roles/Create.vue'
import RolesShow from '../components/cruds/Roles/Show.vue'
import RolesEdit from '../components/cruds/Roles/Edit.vue'
import UsersIndex from '../components/cruds/Users/Index.vue'
import UsersCreate from '../components/cruds/Users/Create.vue'
import UsersShow from '../components/cruds/Users/Show.vue'
import UsersEdit from '../components/cruds/Users/Edit.vue'
import CompaniesIndex from '../components/cruds/Companies/Index.vue'
import CompaniesCreate from '../components/cruds/Companies/Create.vue'
import CompaniesShow from '../components/cruds/Companies/Show.vue'
import CompaniesEdit from '../components/cruds/Companies/Edit.vue'
import EmployeesIndex from '../components/cruds/Employees/Index.vue'
import EmployeesCreate from '../components/cruds/Employees/Create.vue'
import EmployeesShow from '../components/cruds/Employees/Show.vue'
import EmployeesEdit from '../components/cruds/Employees/Edit.vue'

import CustomersIndex from '../components/cruds/Customers/Index.vue'
import CustomersCreate from '../components/cruds/Customers/Create.vue'
import CustomersShow from '../components/cruds/Customers/Show.vue'
import CustomersEdit from '../components/cruds/Customers/Edit.vue'

import CasesIndex from '../components/cruds/Cases/Index.vue'
import CasesCreate from '../components/cruds/Cases/Create.vue'
import CasesShow from '../components/cruds/Cases/Show.vue'
import CasesEdit from '../components/cruds/Cases/Edit.vue'

import CurrencyIndex from '../components/cruds/Currency/Index.vue'
import CurrencyCreate from '../components/cruds/Currency/Create.vue'
import CurrencyShow from '../components/cruds/Currency/Show.vue'
import CurrencyEdit from '../components/cruds/Currency/Edit.vue'

import TransactionIndex from '../components/cruds/Transaction/Index.vue'
import TransactionCreate from '../components/cruds/Transaction/Create.vue'
import TransactionShow from '../components/cruds/Transaction/Show.vue'
import TransactionEdit from '../components/cruds/Transaction/Edit.vue'

import ProfitIndex from '../components/cruds/Profit/Index.vue'

import AccountIndex from '../components/cruds/Account/Account.vue'
import HistoryIndex from '../components/cruds/Account/History.vue'
import AccountChangeIndex from '../components/cruds/Account/AccountChange.vue'

import LoginHistoryIndex from '../components/cruds/Account/LoginHistory.vue'

import ProductIndex from '../components/cruds/Product/Index.vue'
import ProductCreate from '../components/cruds/Product/Create.vue'
import ProductShow from '../components/cruds/Product/Show.vue'
import ProductEdit from '../components/cruds/Product/Edit.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/home', component: Home, name: 'home.index' },
    { path: '/change-password', component: ChangePassword, name: 'auth.change_password' },
    { path: '/roles', component: RolesIndex, name: 'roles.index' },
    { path: '/roles/create', component: RolesCreate, name: 'roles.create' },
    { path: '/roles/:id', component: RolesShow, name: 'roles.show' },
    { path: '/roles/:id/edit', component: RolesEdit, name: 'roles.edit' },
    { path: '/users', component: UsersIndex, name: 'users.index' },
    { path: '/users/create', component: UsersCreate, name: 'users.create' },
    { path: '/users/:id', component: UsersShow, name: 'users.show' },
    { path: '/users/:id/edit', component: UsersEdit, name: 'users.edit' },
    { path: '/companies', component: CompaniesIndex, name: 'companies.index' },
    { path: '/companies/create', component: CompaniesCreate, name: 'companies.create' },
    { path: '/companies/:id', component: CompaniesShow, name: 'companies.show' },
    { path: '/companies/:id/edit', component: CompaniesEdit, name: 'companies.edit' },
    { path: '/employees', component: EmployeesIndex, name: 'employees.index' },
    { path: '/employees/create', component: EmployeesCreate, name: 'employees.create' },
    { path: '/employees/:id', component: EmployeesShow, name: 'employees.show' },
    { path: '/employees/:id/edit', component: EmployeesEdit, name: 'employees.edit' },

    { path: '/customers', component: CustomersIndex, name: 'customers.index' },
    { path: '/customers/create', component: CustomersCreate, name: 'customers.create' },
    { path: '/customers/:id', component: CustomersShow, name: 'customers.show' },
    { path: '/customers/:id/edit', component: CustomersEdit, name: 'customers.edit' },
    
    { path: '/cases', component: CasesIndex, name: 'cases.index' },
    { path: '/cases/create', component: CasesCreate, name: 'cases.create' },
    { path: '/cases/:id', component: CasesShow, name: 'cases.show' },
    { path: '/cases/:id/edit', component: CasesEdit, name: 'cases.edit' },

    { path: '/currency', component: CurrencyIndex, name: 'currency.index' },
    { path: '/currency/create', component: CurrencyCreate, name: 'currency.create' },
    { path: '/currency/:id', component: CurrencyShow, name: 'currency.show' },
    { path: '/currency/:id/edit', component: CurrencyEdit, name: 'currency.edit' },

    { path: '/transaction', component: TransactionIndex, name: 'transaction.index' },
    { path: '/transaction/create', component: TransactionCreate, name: 'transaction.create' },
    { path: '/transaction/:id', component: TransactionShow, name: 'transaction.show' },
    { path: '/transaction/:id/edit', component: TransactionEdit, name: 'transaction.edit' },

    { path: '/profit', component: ProfitIndex, name: 'profit.index' },

    { path: '/account/:type', component: AccountIndex, name: 'account.index' },
    { path: '/history', component: HistoryIndex, name: 'account.history' },
    { path: '/accountchange/:type', component: AccountChangeIndex, name: 'accountchange.index' },

    { path: '/loginhistory', component: LoginHistoryIndex, name: 'loginhistory.index' },

    { path: '/product', component: ProductIndex, name: 'product.index' },
    { path: '/product/create', component: ProductCreate, name: 'product.create' },
    { path: '/product/:id', component: ProductShow, name: 'product.show' },
    { path: '/product/:id/edit', component: ProductEdit, name: 'product.edit' }
]

export default new VueRouter({
    mode: 'history',
    base: '/admin',
    routes
})
