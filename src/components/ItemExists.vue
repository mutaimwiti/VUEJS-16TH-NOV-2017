<template>
    <div>
        <template v-if="exists">
            <br>
            <label>Task already exists!!!</label>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'item-exists',

        props: [
            'exists'
        ]
    }
</script>