<template>
    <section class="content-wrapper" style="min-height: 960px;">
        <section class="content-header">            
            <h1 v-if="type == 'income'">Income Changes</h1>
            <h1 v-if="type == 'payment'">Payment Changes</h1>
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
                            </div>
                        </div>

                        <div class="box-body row">
                            <form @submit.prevent="submitForm" enctype="multipart/form-data">
                            <div class="col-md-2">                           
                                <div class="callout callout-info text-left" style="padding: 7px 5px;">
                                    Search Options
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">                                                
                                    <input 
                                            type="text"  
                                            id="serial_number" 
                                            name="serial_number"
                                            class="form-control"
                                            :value="item.serial_number"
                                            @input="updateSerialNumber" 
                                            placeholder="Serial Number"
                                            > 
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">                                
                                    <v-date-picker
                                            name="create_date"
                                            label="create_date"
                                            @input="updateCreateDate"
                                            :value="item.create_date"
                                            :config="{format: 'YYYY-MM-DD'}"
                                            />
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <v-select
                                            name="user"
                                            :options="users"
                                            :reduce="user => user.id"
                                            label="name"
                                            @input="updateUser"
                                            :value="item.user"
                                            placeholder="User"
                                            />                      
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <v-select
                                            name="product"
                                            :options="products"
                                            :reduce="product => product.id"
                                            label="name"
                                            @input="updateProduct"
                                            :value="item.product"
                                            placeholder="Product"
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
                { title: 'Serial Number', field: 'serial_number', sortable: true },
                { title: 'User Name', field: 'user_name', sortable: true },
                { title: 'Product', field: 'product_name', sortable: true },
                { title: 'Amount', field: 'amount', sortable: true },
                { title: 'Note', field: 'note', sortable: true },
                { title: 'Create Date', field: 'invoice_date', sortable: true },
                { title: 'Modify Date', field: 'modify_date', sortable: true },
                { title: 'Operation Type', field: 'operation_type', tdComp: 'DatatableSingleForAccountChange', sortable: true },
                { title: 'Modify By', field: 'modify_by', sortable: true },
            ],
            query: { sort: 'id', order: 'desc' },
            xprops: {
                module: 'AccountChangeIndex',
                route: 'accountchange'
            }
        }
    },
    created() {        
    },
    mounted() {
        this.setType( this.$route.params.type )
        this.fetchDataList()
        this.fetchUsers()
        this.fetchProducts()
    },
    destroyed() {
        this.resetState()
    },
    computed: {
        ...mapGetters('AccountChangeIndex', ['data', 'data_all', 'item', 'total', 'loading', 'type', 'users', 'products']),
    },
    watch: {
        query: {
            handler(query) {
                this.setQuery(query)
            },
            deep: true
        },
        "$route.params.type": function() {
            this.setType( this.$route.params.type )
            this.emptyItem()
            this.fetchDataList()
        }
        
    },
    methods: {
        ...mapActions('AccountChangeIndex', ['fetchDataList', 'fetchUsers', 'fetchProducts', 'setAll', 'setQuery', 'resetState', 'setType', 'setCreateDate', 'setSerialNumber', 'setUser', 'setProduct', 'setOperationType', 'emptyItem']),
        updateCreateDate(value)
        {
            this.setCreateDate(value)
            this.filterData()
        },
        updateSerialNumber(e)
        {
            this.setSerialNumber(e.target.value)
            this.filterData()
        },
        updateUser(value)
        {
            this.setUser(value)
            this.filterData()
        },
        updateProduct(value)
        {
            this.setProduct(value)
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
            data = data.filter((item) => {
                return item.invoice_date == this.item.create_date
            })
            data = data.filter((item) => {
                return item.serial_number.includes( this.item.serial_number )
            })
            if (this.item.user != null)                  
                data = data.filter((item) => {
                    return item.user_id == this.item.user.id
                })       
            if (this.item.product != null)
                data = data.filter((item) => {
                    return item.product_id == this.item.product.id
                })                   
            if (this.item.operation_type != null) 
                data = data.filter((item) => { 
                    return item.operation_type == this.item.operation_type
                })
            this.setAll(data)            
        }
    }
}
</script>


<style scoped>

</style>
