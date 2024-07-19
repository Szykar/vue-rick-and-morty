import { mount, VueWrapper } from '@vue/test-utils'
import SearchForm from '../SearchForm.vue'
import { describe, it, expect, beforeEach } from 'vitest'

describe('SearchForm', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(SearchForm, {
      propsData: {
        name: 'Test name',
        status: 'alive'
      }
    })
  })

  it('Renders the correct input values from props', () => {
    const inputField = wrapper.find('input')
    const selectField = wrapper.find('select')

    expect(inputField.element.value).toBe('Test name')
    expect(selectField.element.value).toBe('alive')
  })

  it('Emits the correct event and payload on input change', async () => {
    const inputField = wrapper.find('input')

    await inputField.setValue('ChangedValue')

    const emittedEvent = wrapper.emitted()
    expect(emittedEvent.update.length).toBe(1)
    expect(emittedEvent.update[0]).toEqual(['ChangedValue', 'alive'])
  })

  it('Emits the correct event and payload on select change', async () => {
    const selectField = wrapper.find('select')

    await selectField.setValue('dead')

    const emittedEvent = wrapper.emitted()
    expect(emittedEvent.update.length).toBe(1)
    expect(emittedEvent.update[0]).toEqual(['Test name', 'dead'])
  })

  it('Emits the correct event and payload on reset button click', async () => {
    const resetButton = wrapper.find('button')

    await resetButton.trigger('click')

    expect(wrapper.emitted().reset).toBeTruthy()
  })
})
