<script setup lang="ts">
import { ref, reactive, toRaw, computed, watch, watchEffect } from 'vue'

const counter = ref<number>(0)

const state = reactive({
    count: 0,
    newCount: 0
})

const double = computed(() => counter.value * 2)


const increment = () => {
    counter.value++
    state.count++
    
    console.log(counter.value, toRaw(state))
}

const handleUpdate = () => {
    state.count = state.newCount
}

watch(counter, (newCounter, oldCounter) => {
    alert(`Counter updated from ${oldCounter} to ${newCounter}`)
})

watchEffect(() => {
    console.log(`Counter updated to ${counter.value}`)
})
watchEffect(() => {
    console.log(`[SYNC] Counter updated to ${counter.value}`)
}, { flush: 'sync' })
watchEffect(() => {
    console.log(`[POST] Counter updated to ${counter.value}`)
}, { flush: 'post' })

</script>

<template>
    <div>
        <p>Counter: {{ counter }}</p>
        <p>State: {{ state.count }}</p>
        <p>Double: {{ double }}</p>
        <div>
            <button @click="increment">Increment</button>
        </div>
        <div>
            <input type="number" v-model="state.newCount">
            <button @click="handleUpdate">Update</button>
        </div>
    </div>
    <div>
        
    </div>
</template>

<style scoped>

</style>
