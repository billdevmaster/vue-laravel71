<template>
    <div>
        <span class="label label-info" v-if="row.role.id == 1">
           {{ row.role.title }}
        </span>
        <span class="label label-warning" v-if="row.role.id != 1">
           {{ row.role.title }}
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

