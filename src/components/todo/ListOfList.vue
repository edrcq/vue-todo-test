<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTodosStore } from '@/stores/todos';
import FormAddList from './FormAddList.vue';

const { list } = storeToRefs(useTodosStore())

</script>

<template>
    <div>
        <FormAddList />
    </div>
    <ul>
        <li
            v-for="(item, i) in list"
            :key="i"
        >
            <RouterLink
                :to="{ name: 'one-list', params: { slug: item.slug } }"
            >See List: {{ item.name }}</RouterLink>
        </li>
    </ul>
</template>

<style scoped>

</style>
