<template>
    <div>
        <span class="label label-info" v-if="row.type == 'income'">
           Income
        </span>
        <span class="label label-warning" v-if="row.type == 'payment'">
           Payment
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

