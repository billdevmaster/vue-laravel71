<template>
    <section class="content-wrapper" style="min-height: 960px;">
        <section class="content-header">            
            <h1>Transaction History</h1>
        </section>

        <section class="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h3 class="box-title">List</h3>
                        </div>

                        <div class="box-body">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default btn-sm" @click="fetchDataList">
                                    <i class="fa fa-refresh" :class="{'fa-spin': loading}"></i> Refresh
                                </button>                           
                                <button type="button" class="btn btn-danger btn-sm" @click="removeAllData">
                                    <i class="fa fa-times" :class="{'fa-spin': loading}"></i> Remove All History
                                </button>
                            </div>
                        </div>

                        <div class="box-body row">
                            <form @submit.prevent="submitForm" enctype="multipart/form-data">
                            <div class="col-md-2">
                                <div class="form-group">
                                    <v-select
                                            name="transaction_type"
                                            :options="[{'id':0, 'name': 'Buy'}, {'id':1, 'name': 'Sell'}]"
                                            :reduce="transaction_type => transaction_type.id"
                                            label="name"
                                            @input="updateTransactionType"
                                            :value="item.transaction_type"
                                            placeholder="Transaction Type"
                                            />                                   
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <v-select
                                            name="calculation_type"
                                            :options="['Multiplication', 'Division', 'Special']"
                                            @input="updateCalculationType"
                                            :value="item.calculation_type"
                                            placeholder="Calculation Type"
                                            />                                   
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">                                
                                    <v-date-picker
                                            name="modified_date"
                                            label="modified_date"
                                            @input="updateModifiedDate"
                                            :value="item.modified_date"
                                            :config="{format: 'YYYY-MM-DD'}"
                                            />
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <v-select
                                            name="currency"
                                            :options="currencies"
                                            :reduce="currency => currency.id"
                                            label="name"
                                            @input="updateCurrency"
                                            :value="item.currency"
                                            placeholder="Currency"
                                            />                      
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <v-select
                                            name="customer"
                                            :options="customers"
                                            :reduce="customer => customer.customer_code"
                                            label="name"
                                            @input="updateCustomer"
                                            :value="item.customer"
                                            placeholder="Customer"
                                            />                                    
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <v-select
                                            name="operation_type"
                                            :options="['Create', 'Edit', 'Delete']"
                                            @input="updateOperationType"
                                            :value="item.operation_type"
                                            placeholder="Operation Type"
                                            />                                   
                                </div>
                            </div>
                            </form>
                        </div>

                        <div class="box-body">
                            <div class="row" v-if="loading">
                                <div class="col-xs-4 col-xs-offset-4">
                                    <div class="alert text-center">
                                        <i class="fa fa-spin fa-refresh"></i> Loading
                                    </div>
                                </div>
                            </div>

                            <datatable
                                    v-if="!loading"
                                    :columns="columns"
                                    :data="data"
                                    :total="total"
                                    :query="query"
                                    :xprops="xprops"
                                    :support-backup="true"
                                    />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import components from '../../dtmodules/'

export default {
    components,
    data() {
        return {
            columns: [
                { title: '#', field: 'id', sortable: true, colStyle: 'width: 50px;' },
                { title: 'Transaction Type', field: 'type', tdComp: 'DatatableSingle', sortable: true },
                { title: 'Operation Type', field: 'operation_type', tdComp: 'DatatableSingleForAccountChange', sortable: true },
                { title: 'Calculation Type', field: 'calc_type', sortable: true },
                { title: 'Customer Name', field: 'customer_first_name', sortable: true },
                { title: 'DateTime', field: 'created_at', sortable: true },
                { title: 'Currency', field: 'name', sortable: true },
                { title: 'Buy / Sell Amount', field: 'amount', sortable: true },
                { title: 'TTL For Buy / Sell', field: 'total', sortable: true },
                { title: 'B / S Rate', field: 'rate', sortable: true },
                { title: 'Profit', field: 'profit', sortable: true },
                { title: 'Current Balance', field: 'current_balance', sortable: true },
                { title: 'Last Average Rate', field: 'last_avg_rate', sortable: true },
                { title: 'Paid By Client', field: 'paid_by_client', sortable: true },
                { title: 'Return To Client', field: 'return_to_client', sortable: true },
            ],
            query: { sort: 'id', order: 'desc' },
            xprops: {
                module: 'TransactionHistory',
                route: 'transactionhistory'
            }
        }
    },
    created() {        
    },
    mounted() {
        this.fetchDataList()
        this.fetchCustomers()
        this.fetchCurrency()
    },
    destroyed() {
        this.resetState()
    },
    computed: {
        ...mapGetters('TransactionHistory', ['data', 'data_all', 'item', 'total', 'loading', 'customers', 'currencies']),
    },
    watch: {
        query: {
            handler(query) {
                this.setQuery(query)
            },
            deep: true
        },
        "$route": function() {
            this.emptyItem()
        }
        
    },
    methods: {
        ...mapActions('TransactionHistory', ['fetchDataList', 'fetchCustomers', 'fetchCurrency', 'setAll', 'setQuery', 'resetState', 'setModifiedDate', 'setTransactionType', 'setCalculationType', 'setCustomer', 'setCurrency', 'setOperationType', 'emptyItem', 'removeAllData']),
        updateModifiedDate(value)
        {
            this.setModifiedDate(value)
            this.filterData()
        },
        updateTransactionType(value)
        {
            this.setTransactionType(value)
            this.filterData()
        },
        updateCalculationType(value)
        {
            this.setCalculationType(value)
            this.filterData()
        },
        updateCustomer(value)
        {
            this.setCustomer(value)
            this.filterData()
        },
        updateCurrency(value)
        {
            this.setCurrency(value)
            this.filterData()
        },
        updateOperationType(value)
        {
            this.setOperationType(value)
            this.filterData()
        },
        filterData()
        {
            let data = this.data_all
            console.log(data)
            data = data.filter((item) => {
                return item.modified_date.includes( this.item.modified_date )
            })
            console.log(data)
            if (this.item.transaction_type != null)                  
                data = data.filter((item) => {
                    return item.type == this.item.transaction_type.id
                })  
            console.log(data)
            if (this.item.calculation_type != null)
                data = data.filter((item) => {
                    return item.calc_type == this.item.calculation_type
                })  
            console.log(data)
            if (this.item.customer != null)                  
                data = data.filter((item) => {
                    return item.customer_code == this.item.customer.customer_code
                }) 
            console.log(data)
            if (this.item.currency != null)                  
                data = data.filter((item) => {
                    return item.currency_id == this.item.currency.id
                })       
            console.log(data)                
            if (this.item.operation_type != null) 
                data = data.filter((item) => { 
                    return item.operation_type == this.item.operation_type
                })
            console.log(data)
            this.setAll(data)            
        }
    }
}
</script>


<style scoped>

</style>
