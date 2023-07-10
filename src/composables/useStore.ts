import type { ITodoItem } from "@/types/todo.types"
import { reactive } from "vue"

const state = reactive<{ list: ITodoItem[] }>({
    list: []
})

function useStore() {
    
    
    return {
        state,
        // ref, reactive, methods, computed
    }
}

export default useStore
