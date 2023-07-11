import type { ITodoList } from "@/types/todo.types";
import { defineStore } from "pinia";

interface TodoStoreState {
    list: ITodoList[]
}

export const useTodosStore = defineStore('todos', {
    state: (): TodoStoreState => ({
        list: [
            {
                name: 'List 1',
                slug: 'list-1',
                items: []
            },
            {
                name: 'List 2',
                slug: 'list-2',
                items: []
            }
        ],
    }),
    actions: {
        getBySlug(slug: string): ITodoList {
            return this.list.find(l => l.slug === slug)
                ?? { name: 'Default', items: [], slug: '' }
        },
        getIndexBySlug(slug: string) {
            return this.list.findIndex(l => l.slug === slug)
        },
        addItem(slug: string, value: string) {
            const listIndex = this.getIndexBySlug(slug)
            if (listIndex === -1) return ;
            this.list[listIndex].items.push({
                label: value,
                done: false,
            })
        },
        
        deleteItem(slug: string, i: number) {
            const list = this.getBySlug(slug)
            list.items.splice(i, 1)
        },
        
        doIt(slug: string, i: number) {
            const list = this.getBySlug(slug)
            list.items[i].done = !list.items[i].done
        },
    }
})
