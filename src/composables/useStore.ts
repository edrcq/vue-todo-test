import type { ITodoItem } from "@/types/todo.types"
import { reactive } from "vue"

const state = reactive<{ list: ITodoItem[] }>({
    list: []
})

function useStore() {
    const addItem = (value: string) => {
        state.list.push({
            label: value,
            done: false,
        })
    }
    
    const deleteItem = (i: number) => {
        state.list.splice(i, 1)
    }
    
    const doIt = (i: number) => {
        state.list[i].done = !state.list[i].done
    }
    
    const editLabel = (i: number, value: string) => {
        state.list[i].label = value
    }
    
    return {
        state,
        deleteItem,
        doIt,
        editLabel,
        addItem,
        // ref, reactive, methods, computed
    }
}

export default useStore
