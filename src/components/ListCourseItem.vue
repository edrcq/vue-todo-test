<script setup lang="ts">
import IconTrash from './icons/IconTrash.vue';

defineProps<{
    label: string
}>()

const emit = defineEmits<{
    (e: 'click:delete', event: Event): void
}>()

const handleClickDelete = (e: Event) => {
    emit('click:delete', e)
}
</script>

<template>
    <li
        class="flex flex-row justify-between"
    >
        {{ label }}
        <button
            @click="handleClickDelete"
        ><IconTrash width="20px" height="20px" /></button>
    </li>
</template>
<style scoped>

</style>
