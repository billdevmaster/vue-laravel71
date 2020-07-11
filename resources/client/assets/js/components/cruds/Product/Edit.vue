<template>
    <section class="content-wrapper" style="min-height: 960px;">
        <section class="content-header">
            <h1>Companies</h1>
        </section>

        <section class="content">
            <div class="row">
                <div class="col-xs-12">
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
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input
                                            type="text"
                                            class="form-control"
                                            name="name"
                                            placeholder="Enter Name"
                                            :value="item.name"
                                            @input="updateName"
                                            >
                                </div>
                                <div class="form-group">
                                    <label for="status">Status</label>
                                    <input 
                                            type="checkbox"  
                                            id="checkbox" 
                                            name="status"
                                            value="item.status"
                                            checked
                                            @input="updateStatus"
                                            v-if="item.status == 1" 
                                            >
                                    <input 
                                            type="checkbox"  
                                            id="checkbox" 
                                            name="status"
                                            value="item.status"
                                            @input="updateStatus"
                                            v-if="item.status != 1"
                                            >
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
            // Code...
        }
    },
    computed: {
        ...mapGetters('ProductSingle', ['item', 'loading']),
    },
    created() {
        this.fetchData(this.$route.params.id)
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
        ...mapActions('ProductSingle', ['fetchData', 'updateData', 'resetState', 'setName', 'setStatus']),
        updateName(e) {
            this.setName(e.target.value)
        },
        updateStatus(e) {
            if (e.target.checked)
                this.setStatus(1)
            else
                this.setStatus(0)
        },
        submitForm() {
            this.updateData()
                .then(() => {
                    this.$router.push({ name: 'product.index' })
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
