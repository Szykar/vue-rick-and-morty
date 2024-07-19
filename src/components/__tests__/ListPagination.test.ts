import { mount } from '@vue/test-utils'
import ListPagination from '../ui/ListPagination.vue'
import { describe, it, expect } from 'vitest'

describe('ListPagination.vue', () => {
  it("disables the 'Previous' button and enables the 'Next' button when currentPage is 1", async () => {
    const wrapper = mount(ListPagination, {
      props: {
        currentPage: 1,
        totalPages: 3
      }
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[0].element.disabled).toBeTruthy()
    expect(buttons[1].element.disabled).toBeFalsy()
  })

  it("disables the 'Next' button and enables the 'Previous' button when currentPage equals totalPages", async () => {
    const wrapper = mount(ListPagination, {
      props: {
        currentPage: 3,
        totalPages: 3
      }
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[0].element.disabled).toBeFalsy()
    expect(buttons[1].element.disabled).toBeTruthy()
  })

  it("emits a 'previous' event when the 'Previous' button is clicked", async () => {
    const wrapper = mount(ListPagination, {
      props: {
        currentPage: 2,
        totalPages: 3
      }
    })

    await wrapper.findAll('button')[0].trigger('click')

    expect(wrapper.emitted()).toHaveProperty('previous')
  })

  it("emits a 'next' event when the 'Next' button is clicked", async () => {
    const wrapper = mount(ListPagination, {
      props: {
        currentPage: 2,
        totalPages: 3
      }
    })

    await wrapper.findAll('button')[1].trigger('click')

    expect(wrapper.emitted()).toHaveProperty('next')
  })
})
