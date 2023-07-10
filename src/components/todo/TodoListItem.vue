<script setup lang="ts">
import IconTrash from '../icons/IconTrash.vue';
import IconDone from '../icons/IconDone.vue';
import { computed, ref } from 'vue';
import TodoListEdit from './TodoListEdit.vue';
import IconEdit from '../icons/IconEdit.vue';
import useStore from '@/composables/useStore'

const store = useStore()

const props = defineProps<{
    label: string,
    done: boolean,
    index: number
}>()

const emit = defineEmits<{
    (e: 'click:delete'): void,
    (e: 'click:done'): void,
}>()

const editing = ref(false)
const tempValue = ref('')

const handleEdit = () => {
    if (editing.value) {
        // save
        store.editLabel(props.index, tempValue.value);
        editing.value = false
    } else {
        tempValue.value = props.label
        editing.value = true
    }
}

const elementName = computed(() => editing.value === true ? TodoListEdit : 'div')

</script>

<template>
    <li class="flex flex-row justify-between" :class="[{ 'done': done }]">
        <component :is="elementName" v-model:labelValue="tempValue">
            {{ label }}
        </component>
        <div>
            <button
                @click="handleEdit"
            ><IconEdit width="20px" height="20px" /></button>
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
