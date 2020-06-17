<template>
    <section class="content-wrapper" style="min-height: 960px;">
        <section class="content-header">
            <h1>Cases</h1>
        </section>

        <section class="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h3 class="box-title">View</h3>
                        </div>

                        <div class="box-body">
                            <back-buttton></back-buttton>
                        </div>

                        <div class="box-body">
                            <div class="row">
                                <div class="col-xs-6">
                                    <table class="table table-bordered table-striped">
                                        <tbody>
                                        <tr>
                                            <th>Currency Name</th>
                                            <td>{{ item.name }}</td>
                                        </tr>
                                        <tr>
                                            <th>Opening Balance</th>
                                            <td>
                                                <span class="label label-info" v-if="item.company !== null">
                                                    {{ item.opening_balance }}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Current Balance</th>
                                            <td>{{ item.current_balance }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
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
            // Code...
        }
    },
    computed: {
        ...mapGetters('CasesSingle', ['item', 'loading']),
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
        ...mapActions('CasesSingle', ['fetchData'])
    }
}
</script>


<style scoped>

</style>
