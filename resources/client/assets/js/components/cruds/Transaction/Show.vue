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
                                                <th>Currency Name</th>
                                                <td>{{ item.customer_id }}</td>
                                            </tr>
                                            <tr>
                                                <th>Current Balance</th>
                                                <td>{{ item.amount }}</td>
                                                </tr>
                                            <tr>
                                                <th>Currency Name</th>
                                                <td>{{ item.rate }}</td>
                                            </tr>
                                            <tr>
                                                <th>Opening Balance</th>
                                                <td>{{ item.total }}</td>
                                            </tr>
                                            <tr>
                                                <th>Current Balance</th>
                                                <td>{{ item.paid_by_client }}</td>
                                                </tr>
                                            <tr>
                                                <th>Currency Name</th>
                                                <td>{{ item.return_to_client }}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="col-md-6">
                                        <table class="table table-bordered table-striped">
                                            <tbody>                  
                                            <tr>
                                                <th>Opening Balance</th>
                                                <td>{{ item.currency_code }}</td>
                                            </tr>                          
                                            <tr>
                                                <th>Opening Balance</th>
                                                <td>{{ item.name }}</td>
                                            </tr>
                                            <tr>
                                                <th>Current Balance</th>
                                                <td>{{ item.current_balance }}</td>
                                                </tr>
                                            <tr>
                                                <th>Current Balance</th>
                                                <td>{{ item.last_avg_rate }}</td>
                                                </tr>
                                            <tr>
                                                <th>Currency Name</th>
                                                <td>{{ item.profit }}</td>
                                            </tr>
                                            <tr>
                                                <th>Opening Balance</th>
                                                <td>{{ item.ttl_bs }}</td>
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
            flag_image_show: false
        };
    },
    computed: {
        ...mapGetters('TransactionSingle', ['item', 'loading']),
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
        ...mapActions('TransactionSingle', [ 'fetchData' ])
    }
}
</script>


<style scoped>

</style>
