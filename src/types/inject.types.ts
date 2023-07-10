import { type InjectionKey } from 'vue'

/*
const editLabel = (i: number, value: string) => {
    list.value[i].label = value
}
*/

export type editLabelFunc = (i: number, value: string) => void

export const EditLabelKey: InjectionKey<editLabelFunc> = Symbol('editLabel')

// const maCleDinjection = 'editLabel'
// const saCleDinjection = 'editLabel'


// interface ISome {
//     'test': () => void
// }

// const x: ISome = {
//     'test': () => {}
// }
