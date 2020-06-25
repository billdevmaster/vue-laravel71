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
                                <h3 class="box-title">Show</h3>
                            </div>

                            <div class="box-body">
                                <back-buttton></back-buttton>
                            </div>

                            <bootstrap-alert />

                            <div class="box-body">                    
                                <div class="row">
                                    <div class="col-md-6">
                                        <table class="table table-bordered table-striped">
                                            <tbody>
                                            <tr>
                                                <th>Calculation Type</th>
                                                <td>{{ item.calc_type }}</td>
                                            </tr>
                                            <tr>
                                                <th>Currency Name</th>
                                                <td>{{ item.name }}</td>
                                            </tr>
                                            <tr>
                                                <th>Currency Code</th>
                                                <td>{{ item.code }}</td>
                                                </tr>
                                            <tr>
                                                <th>Buy Code</th>
                                                <td>{{ item.buy_code }}</td>
                                            </tr>
                                            <tr>
                                                <th>Sell Code</th>
                                                <td>{{ item.sell_code }}</td>
                                            </tr>
                                            <tr>
                                                <th>Buy Rate From</th>
                                                <td>{{ item.buy_rate_from }}</td>
                                                </tr>
                                            <tr>
                                                <th>Buy Rate to</th>
                                                <td>{{ item.buy_rate_to }}</td>
                                            </tr>
                                            <tr>
                                                <th>Sell Rate From</th>
                                                <td>{{ item.sell_rate_from }}</td>
                                            </tr>
                                            <tr>
                                                <th>Sell Rate To</th>
                                                <td>{{ item.sell_rate_to }}</td>
                                                </tr>
                                            <tr>
                                                <th>Opening Balance</th>
                                                <td>{{ item.opening_balance }}</td>
                                                </tr>
                                            <tr>
                                                <th>Current Balance</th>
                                                <td>{{ item.current_balance }}</td>
                                            </tr>
                                            <tr>
                                                <th>Opening Average Rate</th>
                                                <td>{{ item.opening_avg_rate }}</td>
                                            </tr>
                                            <tr>
                                                <th>Last Average Rate</th>
                                                <td>{{ item.last_avg_rate }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="col-md-6">
                                        <table class="table table-bordered table-striped">
                                            <tbody>
                                            <tr>
                                                <th>Currency Image</th>
                                                <td><img :src="getFlagImage()" id="flag-img-tag" style="width:100%; margin-top: 10px"/></td>
                                            </tr>
                                            <tr>
                                                <th>BS Amount Decimal Limit</th>
                                                <td>
                                                    {{ item.bs_amount_dec_limit }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Average Rate Decimal Limit</th>
                                                <td>{{ item.avg_rate_dec_limit }}</td>
                                                </tr>
                                            <tr>
                                                <th>Balance Decimal Limit</th>
                                                <td>{{ item.balance_dec_limit }}</td>
                                            </tr>
                                            <tr>
                                                <th>Last Average Rate Decimal Limit</th>
                                                <td>
                                                    {{ item.last_avg_rate_dec_limit }}
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>                     
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
        this.fetchData(this.$route.params.id)
    },
    watch: {
        "$route.params.id": function() {
            this.fetchData(this.$route.params.id)
        }
    },
    methods: {
        ...mapActions('CurrencySingle', ['fetchData']),
        getFlagImage() {
            let photo = (this.flag_image_show.length > 100) ? this.flag_image_show : "/images/flag/"+ this.item.flag_img;
                return photo;
        }
    }
}
</script>


<style scoped>

</style>
