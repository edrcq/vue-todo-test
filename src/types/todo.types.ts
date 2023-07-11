export interface ITodoItem {
    label: string,
    done: boolean
}

export interface ITodoList {
    name: string
    slug: string
    items: ITodoItem[]
}
