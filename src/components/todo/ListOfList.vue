<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTodosStore } from '@/stores/todos';

const { list } = storeToRefs(useTodosStore())

</script>

<template>
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
