<template>
    <div>
        <span class="label label-warning" v-if="row.status == 0">
           Deactive
        </span>
        <span class="label label-info" v-if="row.status == 1">
           Active
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

