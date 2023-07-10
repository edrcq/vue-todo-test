<script setup lang="ts">
import { ref } from 'vue';
import ListCourseItem from './ListCourseItem.vue';

const newItem = ref('')
const list = ref<string[]>([])

const handleSubmit = () => {
    // e.preventDefault()
    list.value.push(newItem.value)
    newItem.value = ''
}

const handleClickDelete = () => {
    alert('click delete')
}
</script>

<template>
    <div>
        <p v-if="list.length === 0">Liste vide</p>
        <ul v-else>
            <ListCourseItem
                v-for="(item, i) in list"
                :key="i"
                :label="item"
                @click:delete="handleClickDelete"
            >
            </ListCourseItem>
        </ul>
        <form @submit.prevent="handleSubmit">
            <input type="text" v-model="newItem">
        </form>
    </div>
</template>

<style scoped>

</style>
