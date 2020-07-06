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
                            <h3 class="box-title">List</h3>
                        </div>

                        <div class="box-body">
                            <div class="btn-group">
                                <router-link :to="{ name: xprops.route + '.create' }" class="btn btn-success btn-sm" v-if="total == 0">
                                    <i class="fa fa-plus"></i> Add new
                                </router-link>
                                <button type="button" class="btn btn-default btn-sm" @click="fetchData">
                                    <i class="fa fa-refresh" :class="{'fa-spin': loading}"></i> Refresh
                                </button>
                            </div>
                        </div>

                        <div class="box-body">
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
                                        Total Profit : <b style="font-size: 120%">{{total_profit}}</b>
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
                { title: 'Name', field: 'name', sortable: true },
                { title: 'Opening Balance', field: 'opening_balance', sortable: true },
                { title: 'Creation Date', field: 'created_at', sortable: true },
                { title: 'Current Balance', field: 'current_balance', sortable: true },
                { title: 'Last Edit', field: 'updated_at', sortable: true },
                { title: 'Actions', tdComp: 'DatatableActions', visible: true, thClass: 'text-right', tdClass: 'text-right', colStyle: 'width: 130px;' }
            ],
            query: { sort: 'id', order: 'desc' },
            xprops: {
                module: 'CasesIndex',
                route: 'cases'
            }
        }
    },
    created() {
        this.fetchData()
        this.fetchProfit()
    },
    destroyed() {
        this.resetState()
    },
    computed: {
        ...mapGetters('CasesIndex', ['data', 'total', 'loading', 'relationships', 'total_profit']),
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
        ...mapActions('CasesIndex', ['fetchData', 'fetchProfit', 'setQuery', 'resetState']),
    }
}
</script>


<style scoped>

</style>
