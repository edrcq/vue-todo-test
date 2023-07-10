<script setup lang="ts">
import IconTrash from '../icons/IconTrash.vue';
import IconDone from '../icons/IconDone.vue';

defineProps<{
    label: string,
    done: boolean
}>()

defineEmits<{
    (e: 'click:delete'): void,
    (e: 'click:done'): void,
}>()
</script>

<template>
    <li class="flex flex-row justify-between" :class="{ 'done': done }">
        <div>
            {{ label }}
        </div>
        <div>
            <button
                @click="$emit('click:done')"
            ><IconDone width="20px" height="20px" /></button>
            <button
                @click="$emit('click:delete')"
            ><IconTrash width="20px" height="20px" /></button>
        </div>
    </li>
</template>

<style scoped>
.done {
    text-decoration: line-through;
    color: gray;
}
</style>
