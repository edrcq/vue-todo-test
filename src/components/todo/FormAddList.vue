<script setup lang="ts">
import { ref } from 'vue';
import slug from 'slug'
import { useTodosStore } from '@/stores/todos';

const todosStore = useTodosStore()

const listName = ref('')

const handleFormAddList = () => {
    todosStore.list.push({
        name: listName.value,
        slug: slug(listName.value),
        items: []
    })
}

</script>

<template>
    <form @submit.prevent="handleFormAddList">
        <p>Create a new todolist</p>
        <div>
            Name: <input v-model="listName">
        </div>
    </form>
</template>

<style scoped>

</style>
