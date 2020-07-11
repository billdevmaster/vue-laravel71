<template>
    <section class="content-wrapper" style="min-height: 960px;">
        <section class="content-header">            
            <h1 v-if="type == 'income'">Income</h1>
            <h1 v-if="type == 'payment'">Payment</h1>
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
                            <div class="col-md-1">
                                <div class="form-group">                                    
                                    <div class="callout callout-info text-left" style="padding: 7px 5px;">
                                        {{ item.serial_number }}
                                    </div>
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
                                            name="user_id"
                                            id="user_id"
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
                                            name="product_id"
                                            id="product_id"
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
                                    <input 
                                            type="text"  
                                            id="amount" 
                                            name="amount"
                                            class="form-control"
                                            :value="item.amount"
                                            @input="updateAmount" 
                                            placeholder="Amount"
                                            >                                    
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <input 
                                            type="text"  
                                            id="note" 
                                            name="note"
                                            class="form-control"
                                            :value="item.note"
                                            @input="updateNote"
                                            placeholder="Note"
                                            >                                    
                                </div>
                            </div>
                            <div class="col-md-1">
                                <div class="form-group">
                                    <vue-button-spinner
                                            class="btn btn-primary btn-sm"
                                            :isLoading="loading"
                                            :disabled="loading"
                                            >
                                        Save
                                    </vue-button-spinner>                                    
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
                { title: 'Create Date', field: 'create_date', sortable: true },
                { title: 'Actions', tdComp: 'DatatableActionsForAccount', visible: true, thClass: 'text-right', tdClass: 'text-right', colStyle: 'width: 130px;' }
            ],
            query: { sort: 'id', order: 'desc' },
            xprops: {
                module: 'AccountIndex',
                route: 'account'
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
        ...mapGetters('AccountIndex', ['data', 'item', 'total', 'loading', 'type', 'users', 'products']),
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
        ...mapActions('AccountIndex', ['fetchDataList', 'fetchUsers', 'fetchProducts', 'setQuery', 'resetState', 'setType', 'setCreateDate', 'setUser', 'setProduct', 'setAmount', 'setNote', 'emptyItem', 'storeData', 'updateData']),
        updateCreateDate(value)
        {
            this.setCreateDate(value)
        },
        updateUser(value)
        {
            this.setUser(value)
            if (this.item.user == null)
                $('#user_id').css('border', '1px solid red')
            else
                $('#user_id').css('border', '')
        },
        updateProduct(value)
        {
            this.setProduct(value)
            if (this.item.product == null)
                $('#product_id').css('border', '1px solid red')
            else
                $('#product_id').css('border', '')
        },
        updateAmount(e)
        {
            this.setAmount(e.target.value)
        },
        updateNote(e)
        {
            this.setNote(e.target.value)
        },
        submitForm() {
            if (this.item.user == null) {
                alert('Select User')
                $('#user_id').css('border', '1px solid red')
                return false
            }

            if (this.item.product == null) {
                alert('Select Product')
                $('#product_id').css('border', '1px solid red')
                return false
            }
            if (this.item.id == null)
                this.storeData()
                    .then(() => {
                        this.$eventHub.$emit("create-success");
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            else                
                this.updateData(this.item.id)
                    .then(() => {
                        this.$eventHub.$emit("update-success");
                    })
                    .catch((error) => {
                        console.error(error);
                    });
        }
    }
}
</script>


<style scoped>

</style>
