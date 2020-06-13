<template>
    <section class="content-wrapper" style="min-height: 960px;">
        <section class="content-header">
            <h1>Transaction</h1>
        </section>

        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <form @submit.prevent="submitForm">
                        <div class="box">
                            <div class="box-header with-border">
                                <h3 class="box-title">Edit</h3>
                            </div>

                            <div class="box-body">
                                <back-buttton></back-buttton>
                            </div>

                            <bootstrap-alert />
                            
                            <div class="box-body">
                                <div class="row">
                                    <div class="col-md-2"></div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="currency_code">Currency Code</label>
                                            <v-select
                                                    name="currency_code"
                                                    label="currency_code"
                                                    @input="updateCurrencyCode"
                                                    :value="item.currency_code"
                                                    :options="currency_all"
                                                    />
                                            <input 
                                                    type="hidden"
                                                    name="type"
                                                    :value="item.type"
                                                    >
                                            <input 
                                                    type="hidden"
                                                    name="currency_id"
                                                    :value="item.currency_id"
                                                    >
                                            <input 
                                                    type="hidden"
                                                    name="calc_type"
                                                    :value="item.calc_type"
                                                    >
                                        </div>         
                                    </div>                                    
                                    <div class="col-md-4">
                                    </div>
                                    <div class="col-md-2"></div>
                                </div>                    
                                <div class="row">
                                    <div class="col-md-2"></div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="amount">Buy / Sell Amount</label>
                                            <input
                                                    type="text"
                                                    class="form-control"
                                                    name="amount"
                                                    placeholder="Enter Buy / Sell Amount"
                                                    :value="item.amount"
                                                    @input="updateBSAmount"
                                                    >
                                        </div>
                                        <div class="form-group">
                                            <label for="rate">Buy / Sell Rate</label>
                                            <input
                                                    type="text"
                                                    class="form-control"
                                                    name="rate"
                                                    placeholder="Enter Buy / Sell Rate"
                                                    :value="item.rate"
                                                    @input="updateBSRate"
                                                    >
                                        </div>
                                        <div class="form-group">
                                            <label for="total">Total</label>
                                            <input
                                                    type="text"
                                                    class="form-control"
                                                    name="total"
                                                    :value="item.total"
                                                    >
                                        </div>
                                        <div class="form-group">
                                            <label for="paid_by_client">Paid By Client</label>
                                            <input
                                                    type="text"
                                                    class="form-control"
                                                    name="paid_by_client"
                                                    placeholder="Enter Paid By Client"
                                                    :value="item.paid_by_client"
                                                    @input="updatePaidByClient"
                                                    >
                                        </div>
                                        <div class="form-group">
                                            <label for="return_to_client">Return To Client</label>
                                            <input
                                                    type="text"
                                                    class="form-control"
                                                    name="return_to_client"
                                                    placeholder="Enter Return To Client"
                                                    :value="item.return_to_client"
                                                    >
                                        </div>
                                    </div>     
                                    <div class="col-md-4">         
                                        <div class="form-group">
                                            <label for="name">Currency Name</label>
                                            <input
                                                    type="text"
                                                    class="form-control"
                                                    name="name"
                                                    placeholder="Enter Currency Name"
                                                    :value="item.name"
                                                    >
                                        </div>
                                        <div class="form-group">
                                            <label for="current_balance">Current Balance</label>
                                            <input
                                                    type="text"
                                                    class="form-control"
                                                    name="current_balance"
                                                    placeholder="Enter Current Balance"
                                                    :value="item.current_balance"
                                                    >
                                        </div>
                                        <div class="form-group">
                                            <label for="last_avg_rate">Currency Average Rate</label>
                                            <input
                                                    type="text"
                                                    class="form-control"
                                                    name="last_avg_rate"
                                                    placeholder="Enter Currency Average Rate"
                                                    :value="item.last_avg_rate"
                                                    >
                                        </div>
                                        <div class="form-group">
                                            <label for="profit">Total Profit</label>
                                            <input
                                                    type="text"
                                                    class="form-control"
                                                    name="profit"
                                                    placeholder="Enter Total Profit"
                                                    :value="item.profit"
                                                    >
                                        </div>
                                        <div class="form-group">
                                            <label for="ttl_bs">Today TTL Buy / Sell</label>
                                            <input
                                                    type="text"
                                                    class="form-control"
                                                    name="ttl_bs"
                                                    placeholder="Enter Today TTL Buy / Sell"
                                                    :value="item.ttl_bs"
                                                    >
                                        </div>
                                    </div>                                       
                                    <div class="col-md-2"></div>
                                </div>                     
                            </div>

                            <div class="box-footer">
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
            </div>
        </section>
    </section>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            flag_image_show: false
        };
    },
    computed: {
        ...mapGetters('TransactionSingle', ['item', 'loading', 'currency_all']),
    },
    created() {
        this.fetchData(this.$route.params.id)
        this.fetchCurrencyAll()
    },
    destroyed() {
        this.resetState()
    },
    watch: {
        "$route.params.id": function() {
            this.resetState()
            this.fetchData(this.$route.params.id)
        }
    },
    methods: {
        ...mapActions('TransactionSingle', [ 'fetchData', 
        'updateData', 
        'resetState', 
        "setBSAmount",
        "setBSRate",
        "setPaidByClient",
        "setReturnToClient",
        "setType",
        "setTotal",
        "fetchCurrencyAll",
        "fetchCurrencyData"
        ]),
        updateCurrencyCode(value) {
            if (value != null) {
                let currency_data = value.split("-")
                this.fetchCurrencyData(currency_data[3])
                if (currency_data[0] == 'Buy')
                {
                    this.setType(0)
                    $('input[name="paid_by_client"]').attr('disabled', 'disabled')
                    $('input[name="return_to_client"]').attr('disabled', 'disabled')
                }
                else
                {
                    this.setType(1)
                    $('input[name="paid_by_client"]').removeAttr('disabled')
                    $('input[name="return_to_client"]').removeAttr('disabled')
                }
            }
            else 
            {
                this.resetState()
            }
        },
        updateBSAmount(e) {
            this.setBSAmount(e.target.value)
            if (this.item.rate > 0) {
                this.setTotal(this.item.rate * e.target.value)
            }
        },
        updateBSRate(e) {
            this.setBSRate(e.target.value)
            if (this.item.amount > 0) {
                this.setTotal(this.item.amount * e.target.value)
            }
        },
        updatePaidByClient(e) {
            this.setPaidByClient(e.target.value)
            this.setReturnToClient(e.target.value - this.item.total)
        },
        submitForm() {
            this.updateData()
                .then(() => {
                    this.$router.push({ name: 'transaction.index' })
                    this.$eventHub.$emit('update-success')
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }
}
</script>


<style scoped>

</style>
