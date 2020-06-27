<template>
    <section class="content-wrapper" style="min-height: 960px;">
        <section class="content-header">
            <h1>Currency</h1>
        </section>

        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <form @submit.prevent="submitForm">
                        <div class="box">
                            <div class="box-header with-border">
                                <h3 class="box-title">Create</h3>
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
                                            <label for="calc_type">Calculate Type</label>
                                            <v-select
                                                    name="calc_type"
                                                    label="calc_type"
                                                    @input="updateCalculateType"
                                                    :value="item.calc_type"
                                                    :options="['Multiplication', 'Division', 'Special']"
                                                    />
                                        </div>                               
                                        <div class="form-group">
                                            <label for="name">Currency Name</label>
                                            <input
                                                    type="text"
                                                    class="form-control"
                                                    name="name"
                                                    placeholder="Enter Currency Name"
                                                    :value="item.name"
                                                    @input="updateName"
                                                    >
                                        </div>
                                        <div class="form-group">
                                            <label for="code">Currency Code</label>
                                            <input
                                                    type="text"
                                                    class="form-control"
                                                    name="code"
                                                    placeholder="Enter Currency Code"
                                                    :value="item.code"
                                                    @input="updateCode"
                                                    >
                                        </div>
                                        <div class="form-group">
                                            <label for="buy_code">Buy Code</label>
                                            <input
                                                    type="buy_code"
                                                    class="form-control"
                                                    name="buy_code"
                                                    placeholder="Enter Buy Code"
                                                    :value="item.buy_code"
                                                    @input="updateBuyCode"
                                                    >
                                        </div>
                                        <div class="form-group">
                                            <label for="sell_code">Sell Code</label>
                                            <input
                                                    type="text"
                                                    class="form-control"
                                                    name="sell_code"
                                                    placeholder="Enter Sell Code"
                                                    :value="item.sell_code"
                                                    @input="updateSellCode"
                                                    >
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">                                                
                                                <div class="form-group">
                                                    <label for="buy_rate_from">Buy Rate From</label>
                                                    <input
                                                            type="text"
                                                            class="form-control"
                                                            name="buy_rate_from"
                                                            placeholder="Enter Buy Rate From"
                                                            :value="item.buy_rate_from"
                                                            @input="updateBuyRateFrom"
                                                            >
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="buy_rate_to">Buy Rate To</label>
                                                    <input
                                                            type="text"
                                                            class="form-control"
                                                            name="buy_rate_to"
                                                            placeholder="Enter Buy Rate To"
                                                            :value="item.buy_rate_to"
                                                            @input="updateBuyRateTo"
                                                            >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">                  
                                                <div class="form-group">
                                                    <label for="sell_rate_from">Sell Rate From</label>
                                                    <input
                                                            type="text"
                                                            class="form-control"
                                                            name="sell_rate_from"
                                                            placeholder="Enter Sell Rate From"
                                                            :value="item.sell_rate_from"
                                                            @input="updateSellRateFrom"
                                                            >
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="sell_rate_to">Sell Rate To</label>
                                                    <input
                                                            type="text"
                                                            class="form-control"
                                                            name="sell_rate_to"
                                                            placeholder="Enter Sell Rate To"
                                                            :value="item.sell_rate_to"
                                                            @input="updateSellRateTo"
                                                            >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="opening_balance">Opening Balance</label>
                                            <input
                                                    type="text"
                                                    class="form-control"
                                                    name="opening_balance"
                                                    placeholder="Enter Opening Balance"
                                                    :value="item.opening_balance"
                                                    @input="updateOpeningBalance"
                                                    >
                                        </div>
                                        <!-- <div class="form-group">
                                            <label for="current_balance">Current Balance</label>
                                            <input
                                                    type="text"
                                                    class="form-control"
                                                    name="current_balance"
                                                    placeholder="Enter Current Balance"
                                                    :value="item.current_balance"
                                                    @input="updateCurrentBalance"
                                                    >
                                        </div> -->
                                        <div class="form-group">
                                            <label for="opening_avg_rate">Opening Average Rate</label>
                                            <input
                                                    type="text"
                                                    class="form-control"
                                                    name="opening_avg_rate"
                                                    placeholder="Enter Opening Average Rate"
                                                    :value="item.opening_avg_rate"
                                                    @input="updateOpeningAverageRate"
                                                    >
                                        </div>
                                        <!-- <div class="form-group">
                                            <label for="last_avg_rate">Last Average Rate</label>
                                            <input
                                                    type="text"
                                                    class="form-control"
                                                    name="last_avg_rate"
                                                    placeholder="Enter Last Average Rate"
                                                    :value="item.last_avg_rate"
                                                    @input="updateLastAverageRate"
                                                    >
                                        </div> -->
                                    </div>     
                                    <div class="col-md-4">         
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label for="bs_amount_dec_limit">Currency Flag Image</label>
                                                    <input id="flag_img" type="file" class="form-control" v-on:change="updateFlagImage">
                                                    <img :src="flag_image_show" id="flag-img-tag" style="width:100%; margin-top: 10px"/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="bs_amount_dec_limit">BS Amount Dec Limit</label>
                                                    <input
                                                            type="text"
                                                            class="form-control"
                                                            name="bs_amount_dec_limit"
                                                            placeholder="Enter BS Amount Dec Limit"
                                                            :value="item.bs_amount_dec_limit"
                                                            @input="updateBSAmountDecLimit"
                                                            >
                                                </div>
                                                <div class="form-group">
                                                    <label for="avg_rate_dec_limit">Average Rate Dec Limit</label>
                                                    <input
                                                            type="text"
                                                            class="form-control"
                                                            name="avg_rate_dec_limit"
                                                            placeholder="Enter Average Rate Dec Limit"
                                                            :value="item.avg_rate_dec_limit"
                                                            @input="updateAverageRateDecLimit"
                                                            >
                                                </div>
                                                <div class="form-group">
                                                    <label for="balance_dec_limit">Balance Dec Limit</label>
                                                    <input
                                                            type="text"
                                                            class="form-control"
                                                            name="balance_dec_limit"
                                                            placeholder="Enter Balance Dec Limit"
                                                            :value="item.balance_dec_limit"
                                                            @input="updateBalanceDecLimit"
                                                            >
                                                </div>
                                                <div class="form-group">
                                                    <label for="last_avg_rate_dec_limit">Last Average Rate Dec Limit</label>
                                                    <input
                                                            type="text"
                                                            class="form-control"
                                                            name="last_avg_rate_dec_limit"
                                                            placeholder="Enter Last Average Rate Dec Limit"
                                                            :value="item.last_avg_rate_dec_limit"
                                                            @input="updataLastAverageRateDecLimit"
                                                            >
                                                </div>
                                            </div>
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
        };
    },
    computed: {
        ...mapGetters('CurrencySingle', ['item', 'loading']),
    },
    created() {
    },
    destroyed() {
        this.resetState()
    },
    methods: {
        ...mapActions('CurrencySingle', [ 
        'storeData', 
        'resetState', 
        "setFlagImage",
        "setName",
        "setCode",
        "setBuyCode",
        "setSellCode",
        "setBuyRateFrom",
        "setBuyRateTo",
        "setSellRateFrom",
        "setSellRateTo",
        "setOpeningBalance",
        "setCurrentBalance",
        "setOpeningAverageRate",
        "setLastAverageRate",
        "setCalculateType",
        "setBSAmountDecLimit",
        "setAverageRateDecLimit",
        "setBalanceDecLimit",
        "setLastAverageRateDecLimit"
        ]),
        updateFlagImage(e) {
            this.setFlagImage(e.target.files[0]);
            var image = new Image();
            var reader = new FileReader();
            reader.onload = (e) => {
                this.flag_image_show = e.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        },
        updateName(e) {
            this.setName(e.target.value)
        },
        updateCode(e) {
            this.setCode(e.target.value)
        },
        updateBuyCode(e) {
            this.setBuyCode(e.target.value)
        },
        updateSellCode(e) {
            this.setSellCode(e.target.value)
        },
        updateBuyRateFrom(e) {
            this.setBuyRateFrom(e.target.value)
        },
        updateBuyRateTo(e) {
            this.setBuyRateTo(e.target.value)
        },
        updateSellRateFrom(e) {
            this.setSellRateFrom(e.target.value)
        },
        updateSellRateTo(e) {
            this.setSellRateTo(e.target.value)
        },
        updateOpeningBalance(e) {
            this.setOpeningBalance(e.target.value)
            this.setCurrentBalance(e.target.value)
        },
        updateCurrentBalance(e) {
            this.setCurrentBalance(e.target.value)
        },
        updateOpeningAverageRate(e) {
            this.setOpeningAverageRate(e.target.value)
            this.setLastAverageRate(e.target.value)
        },
        updateLastAverageRate(e) {
            this.setLastAverageRate(e.target.value)
        },
        updateCalculateType(value) {
            this.setCalculateType(value)
        },
        updateBSAmountDecLimit(e) {
            this.setBSAmountDecLimit(e.target.value)
        },
        updateAverageRateDecLimit(e) {
            this.setAverageRateDecLimit(e.target.value)
        },
        updateBalanceDecLimit(e) {
            this.setBalanceDecLimit(e.target.value)
        },
        updataLastAverageRateDecLimit(e) {
            this.setLastAverageRateDecLimit(e.target.value)
        },
        submitForm() {
            this.storeData()
                .then(() => {
                    this.$router.push({ name: 'currency.index' })
                    this.$eventHub.$emit('create-success')
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
