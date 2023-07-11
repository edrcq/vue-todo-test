<script setup lang="ts">
import { ref } from 'vue';
import TodoListItem from './TodoListItem.vue';
import { useTodosStore } from '@/stores/todos';

const props = defineProps<{
    slug: string
}>()

const todoStore = useTodosStore()

const todolist = todoStore.getBySlug(props.slug)

const newItem = ref('')

const handleSubmit = () => {
    todoStore.addItem(props.slug, newItem.value)
    newItem.value = ''
}
</script>

<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <input type="text" v-model="newItem">
        </form>
        <ul v-if="todolist.items.length > 0">
            <TodoListItem
                v-for="(item, i) in todolist.items" :key="i"
                v-bind="item"
                :index="i"
                @click:delete="todoStore.deleteItem(slug, i)"
                @click:done="todoStore.doIt(slug, i)"
            >
            </TodoListItem>
        </ul>
        <p v-else>Rien a faire</p>
    </div>
</template>

<style scoped>

</style>
