<script setup lang="ts">
import { provide, ref } from 'vue';
import type { ITodoItem } from '@/types/todo.types'
import TodoListItem from './TodoListItem.vue';
import { EditLabelKey } from '@/types/inject.types';
import useStore from '@/composables/useStore'

const store = useStore()

const list = ref<ITodoItem[]>([])
const newItem = ref('')

const handleSubmit = () => {
    list.value.push({
        label: newItem.value,
        done: false,
    })
    newItem.value = ''
}

const handleDelete = (i: number) => {
    list.value.splice(i, 1)
}

const handleDone = (i: number) => {
    list.value[i].done = !list.value[i].done
}

const editLabel = (i: number, value: string) => {
    list.value[i].label = value
}

provide(EditLabelKey, editLabel)
</script>

<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <input type="text" v-model="newItem">
        </form>
        <ul v-if="list.length > 0">
            <TodoListItem
                v-for="(item, i) in list" :key="i"
                v-bind="item"
                :index="i"
                @click:delete="handleDelete(i)"
                @click:done="handleDone(i)"
                @edit:label="editLabel(i, $event)"
            >
            </TodoListItem>
        </ul>
        <p v-else>Rien a faire</p>
    </div>
</template>

<style scoped>

</style>
