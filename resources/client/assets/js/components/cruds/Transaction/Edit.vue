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
                                            <label for="customer">Customer <span class="label label-danger" v-if="item.customer_code == null || item.customer_code == ''"> * required</span></label>
                                            <v-select
                                                    name="customer"
                                                    label="customer"
                                                    @input="updateCustomer"
                                                    :value="item.customer_id"
                                                    :options="customer_all"
                                                    />
                                            <input 
                                                    type="hidden"
                                                    name="customer_code"
                                                    :value="item.customer_code"
                                                    >
                                        </div>    
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="currency_code">Currency Code <span class="label label-danger" v-if="item.type != '0' && item.type != '1'"> * required</span></label>
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
                                            <input 
                                                    type="hidden"
                                                    name="rate_from"
                                                    :value="item.rate_from"
                                                    >
                                            <input 
                                                    type="hidden"
                                                    name="rate_to"
                                                    :value="item.rate_to"
                                                    >
                                            <input 
                                                    type="hidden"
                                                    name="bs_amount_dec_limit"
                                                    :value="item.bs_amount_dec_limit"
                                                    >
                                            <input 
                                                    type="hidden"
                                                    name="avg_rate_dec_limit"
                                                    :value="item.avg_rate_dec_limit"
                                                    >
                                        </div>
                                    </div>  
                                    <div class="col-md-2"></div>
                                </div>                    
                                <div class="row">
                                    <div class="col-md-2"></div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="amount">Buy / Sell Amount <span class="label label-danger" v-if="item.amount == null || item.amount == ''"> * required</span></label>
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
                                            <label for="rate">Buy / Sell Rate <span class="label label-danger" v-if="!rate_status"> Rate must be between {{item.rate_from}} and {{item.rate_to}}</span><span class="label label-danger" v-if="item.rate == null || item.rate == ''"> * required</span></label>
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
                                                    readonly
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
                                                    readonly
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
                                                    readonly
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
                                                    readonly
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
                                                    readonly
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
                                                    readonly
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
            flag_image_show: false,
            amount_status: true,
            rate_status: true,
        };
    },
    computed: {
        ...mapGetters('TransactionSingle', ['item', 'loading', 'currency_all', 'customer_all', 'case']),
    },
    mounted() {
        window.addEventListener("keypress", this.saveKeyAction)
    },
    created() {
        this.fetchData(this.$route.params.id)
        this.fetchCurrencyAll()
        this.fetchCustomerAll()
        this.fetchCase()
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
        "setCustomerCode",
        "fetchCurrencyAll",
        "fetchCurrencyData",
        "fetchCustomerAll",
        "fetchCase"
        ]),
        updateCurrencyCode(value) {
            if (value != null) {
                let currency_data = value.split("-")
                this.fetchCurrencyData(currency_data[3]+'-'+currency_data[0])
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
            else {
                this.fetchCurrencyData(null)
            }
        },
        updateCustomer(value) {
            if (value != null) {
                let customer_data = value.split("-")
                this.setCustomerCode(customer_data[0])
            }
            else
            {
                this.setCustomerCode('')
            }
        },
        updateBSAmount(e) {
            this.setBSAmount(e.target.value)
            if (this.item.rate > 0) {
                switch (this.item.calc_type) {
                    case 'Multiplication':
                        this.setTotal(this.item.amount * e.target.value)
                        break;
                    case 'Division':
                        this.setTotal(this.item.amount / e.target.value)
                        break;
                    case 'Special':
                        this.setTotal(this.item.amount * e.target.value)
                        break;
                
                    default:
                        break;
                }
            }
            if (!this.item.type && parseFloat(this.case) < parseFloat(this.item.total)) {
                alert("please check your case's current balance - your current balance is not enough - " + this.item.case);
            }
        },
        updateBSRate(e) {
            this.rate_status = true
            
            if ( e.target.value >= this.item.rate_from && e.target.value <= this.item.rate_to )
            {
                this.setBSRate(e.target.value)
                if (this.item.amount > 0) {
                    switch (this.item.calc_type) {
                        case 'Multiplication':
                            this.setTotal(this.item.amount * e.target.value)
                            break;
                        case 'Division':
                            this.setTotal(this.item.amount / e.target.value)
                            break;
                        case 'Special':
                            this.setTotal(this.item.amount * e.target.value)
                            break;
                    
                        default:
                            break;
                    }
                }
            }
            else
            { 
                this.setBSRate(e.target.value)
                if (this.item.amount > 0) {
                    switch (this.item.calc_type) {
                        case 'Multiplication':
                            this.setTotal(this.item.amount * e.target.value)
                            break;
                        case 'Division':
                            this.setTotal(this.item.amount / e.target.value)
                            break;
                        case 'Special':
                            this.setTotal(this.item.amount * e.target.value)
                            break;
                    
                        default:
                            break;
                    }
                }
                
                if (!this.item.type && parseFloat(this.case) < parseFloat(this.item.total)) {
                    alert("please check your case's current balance - your current balance is not enough - " + this.item.case);
                }
                this.rate_status = false
            }
        },
        updatePaidByClient(e) {
            this.setPaidByClient(e.target.value)
            this.setReturnToClient(e.target.value - this.item.total)
        },
        submitForm() {

            if ($('.label-danger').length)
                return

            let amount_validation = $('.label-danger').css('border-color')
            let rate_validation = $('input[name="rate"]').css('border-color')
            if (amount_validation == 'rgb(255, 0, 0)' || rate_validation == 'rgb(255, 0, 0)') {
                alert('Please check your amount or rate!!')
                return false;
            }
            
            this.$swal({
                title: 'Are you sure?',
                text: 'Your current balance will be updated!',
                type: 'info',
                showCancelButton: true,
                confirmButtonText: 'OK',
                confirmButtonColor: '#0084af',
                focusCancel: true,
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    this.updateData()
                    .then(() => {
                        this.$router.push({ name: 'transaction.index' })
                        this.$eventHub.$emit('update-success')
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                }
            })
        },
        saveKeyAction(e) {
            if (e.keyCode == 17)
                this.submitForm()
        }
    }
}
</script>


<style scoped>

</style>
