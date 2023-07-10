<script setup lang="ts">
import { ref } from 'vue';
import IconTrash from '../icons/IconTrash.vue';
import IconDone from '../icons/IconDone.vue';
import TodoListItem from './TodoListItem.vue';
import type { ITodoItem } from '@/types/todo.types'


const listEls = ref<InstanceType<typeof TodoListItem>[]>([])
const list = ref<ITodoItem[]>([])
const newItem = ref('')

const handleSubmit = () => {
    list.value.push(new TodoListItem({ props: {  } }))
    newItem.value = ''
}

const handleDelete = (i: number) => {
    list.value.splice(i, 1)
}

const handleDone = (i: number) => {
    list.value[i].done = !list.value[i].done
}
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
                @click:delete="handleDelete(i)"
                @click:done="handleDone(i)"
                ref="listEls"
            >
            </TodoListItem>
        </ul>
        <p v-else>Rien a faire</p>
    </div>
</template>

<style scoped>

</style>
