<template>
    <div class="btn-group btn-group-xs">
        <button @click="updateData(row.id)" type="button" class="btn btn-warning">
            Edit
        </button>
        <button @click="destroyData(row.id)" type="button" class="btn btn-danger">
            Delete
        </button>
   </div>
</template>


<script>
export default {
    props: ['row', 'xprops'],
    data() {
        return {
            // Code...
        }
    },
    created() {
        // Code...
    },
    methods: {
        updateData(id) {
            let params = id + '-' + $('.content-header h1').text()
            this.$store.dispatch(
                this.xprops.module + '/fetchData',
                params
            ).then(result => {
                console.log(result)
            })
        },
        destroyData(id) {
            let params = id + '-' + $('.content-header h1').text()
            this.$swal({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Delete',
                confirmButtonColor: '#dd4b39',
                focusCancel: true,
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    this.$store.dispatch(
                        this.xprops.module + '/destroyData',
                        params
                    ).then(result => {
                        this.$eventHub.$emit('delete-success')
                    })
                }
            })
        }
    }
}
</script>


<style scoped>

</style>
