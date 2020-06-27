<template>
    <section class="content-wrapper" style="min-height: 960px;">
        <section class="content-header">
            <h1>Profit</h1>
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
                                <button type="button" class="btn btn-default btn-sm" @click="fetchData">
                                    <i class="fa fa-refresh" :class="{'fa-spin': loading}"></i> Refresh
                                </button>
                            </div>
                        </div>
                        <div class="box-body">
                            <form class="row" @submit.prevent="submitForm" enctype="multipart/form-data">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <v-date-picker
                                            name="from"
                                            label="From"
                                            @input="updateFrom"
                                            :value="item.from"
                                            :config="{format: 'YYYY-MM-DD'}"
                                            />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <v-date-picker
                                            name="to"
                                            label="To"
                                            @input="updateTo"
                                            :value="item.to"
                                            :config="{format: 'YYYY-MM-DD'}"
                                            />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <vue-button-spinner
                                        class="btn btn-primary btn-sm"
                                        :isLoading="loading"
                                        :disabled="loading"
                                        >
                                        Search
                                        </vue-button-spinner>
                                    </div>
                                </div>
                            </form>
                            <div class="row" v-if="loading">
                                <div class="col-xs-4 col-xs-offset-4">
                                    <div class="alert text-center">
                                        <i class="fa fa-spin fa-refresh"></i> Loading
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-4">
                                    <div class="callout callout-info text-left">
                                        Total Profit : {{total_profit}}
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
                { title: 'CurrencyID', field: 'id', sortable: true },
                { title: 'CurrencyName', field: 'currency_name', sortable: true },
                { title: 'CurrencyProfit', field: 'currency_profit', sortable: true },
            ],
            query: { sort: 'id', order: 'desc' },
            xprops: {
                module: 'ProfitIndex',
                route: 'profit'
            }
        }
    },
    created() {
        this.fetchData()
    },
    destroyed() {
        this.resetState()
    },
    computed: {
        ...mapGetters('ProfitIndex', ['data', 'total', 'loading', 'relationships', 'item', 'total_profit']),
    },
    watch: {
        query: {
            handler(query) {
                this.setQuery(query)
            },
            deep: true
        }
    },
    methods: {
        ...mapActions('ProfitIndex', ['fetchData', 'setQuery', 'resetState', 'setAll', 'setFrom', 'setTo']),

        updateFrom (value) {
            this.setFrom(value)
        },
        updateTo (value) {
            this.setTo(value)
        },
        submitForm() {
            this.fetchData()
        }
    }
}
</script>


<style scoped>

</style>
