import { describe, it, expect, beforeEach, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import TodoListItem from '@/components/todo/TodoListItem.vue'
import { createPinia, setActivePinia } from 'pinia'
import useStore from '@/composables/useStore'

const testProps = {
  label: 'Todo 1',
  done: false,
  index: 1
}

beforeEach(() => {
  setActivePinia(createPinia())
  const store = useStore()
  store.state.list.push({
    label: 'Todo 1',
    done: false,
  })
  store.state.list.push({
    label: 'Todo X',
    done: false,
  })
})

describe('Todo List Item', () => {
  it('renders properly', () => {
    const wrapper = mount(TodoListItem, {
      props: testProps
    })
    expect(wrapper.text()).toContain('Todo 1')
  })
  
  it('have done class if props done is true', () => {
    const wrapper = mount(TodoListItem, {
      props: {
        label: 'Todo 1',
        done: true,
        index: 1
      }
    })
    expect(wrapper.classes().indexOf('done')).toBeGreaterThan(-1)
    // better: expect(wrapper.classes()).toContain('done')
  })
  
  it('do not have done class if props done is false', () => {
    const wrapper = mount(TodoListItem, {
      props: testProps
    })
    expect(wrapper.classes().indexOf('done')).toBe(-1)
    // better: expect(wrapper.classes()).not.toContain('done')
  })
  
  it('emit click:done when click done button', () => {
    const wrapper = mount(TodoListItem, {
      props: testProps
    })
    
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(3)
    
    const doneButton = buttons[1]
    doneButton.trigger('click')
    
    expect(wrapper.emitted('click:done')?.length).toBe(1)
  })
  
  it('emit click:delete when click delete button', () => {
    const wrapper = mount(TodoListItem, {
      props: testProps
    })
    
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(3)
    
    const doneButton = buttons[2]
    doneButton.trigger('click')
    
    expect(wrapper.emitted('click:delete')?.length).toBe(1)
  })
  
  it('show an input containing the label when click edit', async () => {
    const wrapper = mount(TodoListItem, {
      props: testProps
    })
    
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(3)
    
    const doneButton = buttons[0]
    
    // check if we cannot edit
    expect(wrapper.findComponent({ name: 'TodoListEdit' }).exists()).toBeFalsy()
    
    doneButton.trigger('click')
    await wrapper.vm.$nextTick()
    
    // check if can edit after nextTick
    expect(wrapper.findComponent({ name: 'TodoListEdit' }).exists()).toBeTruthy()
  })
  
  it('editing the label works', async () => {
    const store = useStore()
    
    
    const wrapper = mount(TodoListItem, {
      props: testProps
    })
    
    // @ts-ignore (CHEAT)
    const spyOnEditLabel = vi.spyOn(wrapper.vm.store, 'editLabel')
    
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(3)
    const editButton = buttons[0]
    editButton.trigger('click')
    await wrapper.vm.$nextTick()
    
    wrapper.find('input').setValue('Test 2')
    wrapper.setProps({ label: 'Test 2' })
    editButton.trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.text()).toContain('Test 2')
    expect(wrapper.find('input').exists()).toBeFalsy()
    expect(store.state.list[1].label).toBe('Test 2')
    expect(spyOnEditLabel).toHaveBeenCalledOnce()
  })
})
