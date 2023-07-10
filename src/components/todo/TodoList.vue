<script setup lang="ts">
import { provide, ref, toRef } from 'vue';
import type { ITodoItem } from '@/types/todo.types'
import TodoListItem from './TodoListItem.vue';
import { EditLabelKey } from '@/types/inject.types';
import useStore from '@/composables/useStore'

const store = useStore()

// const list = ref<ITodoItem[]>([])
const newItem = ref('')

const handleSubmit = () => {
    store.addItem(newItem.value)
    newItem.value = ''
}
</script>

<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <input type="text" v-model="newItem">
        </form>
        <ul v-if="store.state.list.length > 0">
            <TodoListItem
                v-for="(item, i) in store.state.list" :key="i"
                v-bind="item"
                :index="i"
                @click:delete="store.deleteItem(i)"
                @click:done="store.doIt(i)"
            >
            </TodoListItem>
        </ul>
        <p v-else>Rien a faire</p>
    </div>
</template>

<style scoped>

</style>
