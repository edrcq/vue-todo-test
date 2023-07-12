import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TodoListEdit from '@/components/todo/TodoListEdit.vue'

const testProps = {
  labelValue: 'Todo 1'
}

describe('Todo List Edit', () => {
  it('renders properly', () => {
    const wrapper = mount(TodoListEdit, {
        props: testProps
    })
    
    expect(wrapper.text()).toContain('Todo 1')
    expect(wrapper.find('input').exists()).toBeTruthy()
  })
  
})
