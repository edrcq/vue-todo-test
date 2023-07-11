<script setup lang="ts">
import { useRoute } from 'vue-router';
import TodoList from '@/components/todo/TodoList.vue';

const route = useRoute()
</script>

<template>
    <div>
        {{ route.params }}
        <TodoList
            :key="(route.params.slug as string)"
            :slug="(route.params.slug as string)">
        </TodoList>
    </div>
</template>

<style scoped>

</style>
