<script setup lang="ts">

defineProps<{
    label: string,
    done: boolean
}>()

</script>

<template>
    <li class="flex flex-row justify-between" :class="{ 'done': done }">
        <div>
            {{ label }}
        </div>
        <slot>
            Bonjour
        </slot>
        <slot name="buttons"></slot>
    </li>
</template>

<style scoped>
.done {
    text-decoration: line-through;
    color: gray;
}
</style>
