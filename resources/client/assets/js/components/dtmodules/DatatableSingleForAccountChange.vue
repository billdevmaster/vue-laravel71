<template>
    <div>
        <span class="label label-info" v-if="row.operation_type == 'Create'">
           Create
        </span>
        <span class="label label-warning" v-if="row.operation_type == 'Edit'">
           Edit
        </span>
        <span class="label label-danger" v-if="row.operation_type == 'Delete'">
           Delelet
        </span>
    </div>
</template>


<script>
export default {
    props: ['row']
}
</script>


<style scoped>

</style>

