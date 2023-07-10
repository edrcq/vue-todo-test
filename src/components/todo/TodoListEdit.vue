<script setup lang="ts">
defineProps<{
    labelValue: string
}>()
const emit = defineEmits<{
    (e: 'update:label-value', value: string): void
}>()

const handleInput = (e: Event) => {
    if (e.target instanceof HTMLInputElement)
        emit('update:label-value', e.target.value) // met a jour le v-model:label-value ou v-model:labelValue
    else
        throw new Error('Not possible if handleInput is used as intented')
}

</script>

<template>
    <div>
        <p>{{ labelValue }}</p>
        <input :value="labelValue" @input="handleInput" />
    </div>
</template>

<style scoped>

</style>
