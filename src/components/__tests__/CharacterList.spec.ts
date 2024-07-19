import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import CharacterList from './../CharacterList.vue'
import SearchForm from '@/components/SearchForm.vue'
import SimpleSpinner from '@/components/ui/SimpleSpinner.vue'
import { getCharacters } from '@/api/rickAndMorty'

vi.mock('@/api/rickAndMorty', () => ({
  getCharacters: vi.fn()
}))

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: {} }]
})

describe('CharacterList', () => {
  let wrapper: any

  beforeEach(() => {
    ;(getCharacters as any).mockResolvedValue({
      results: [],
      info: { pages: 1 }
    })

    wrapper = mount(CharacterList, {
      global: {
        plugins: [router],
        stubs: ['router-link']
      }
    })
  })

  it('displays loading spinner when loading', async () => {
    ;(getCharacters as any).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    )
    wrapper.vm.fetchCharacters()
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(SimpleSpinner).exists()).toBe(true)
  })

  it('displays no results message when characters array is empty', async () => {
    await flushPromises()
    expect(wrapper.find('.no-results').exists()).toBe(true)
  })

  it('displays character grid when characters are available', async () => {
    ;(getCharacters as any).mockResolvedValueOnce({
      results: [
        { id: 1, name: 'Rick', image: 'rick.jpg' },
        { id: 2, name: 'Morty', image: 'morty.jpg' }
      ],
      info: { pages: 1 }
    })
    await wrapper.vm.fetchCharacters()
    await flushPromises()
    expect(wrapper.find('.character-grid').exists()).toBe(true)
    expect(wrapper.findAll('.character-card').length).toBe(2)
  })

  it('updates search and fetches characters', async () => {
    const searchForm = wrapper.findComponent(SearchForm)
    await searchForm.vm.$emit('update', 'Rick', 'Alive')
    await flushPromises()

    expect(wrapper.vm.searchName).toBe('Rick')
    expect(wrapper.vm.searchStatus).toBe('Alive')
    expect(wrapper.vm.currentPage).toBe(1)
    expect(getCharacters).toHaveBeenCalledWith(1, 'Rick', 'Alive')
  })

  it('resets search and fetches characters', async () => {
    const searchForm = wrapper.findComponent(SearchForm)
    await searchForm.vm.$emit('reset')
    await flushPromises()

    expect(wrapper.vm.searchName).toBe('')
    expect(wrapper.vm.searchStatus).toBe('')
    expect(wrapper.vm.currentPage).toBe(1)
    expect(getCharacters).toHaveBeenCalledWith(1, '', '')
  })

  it('handles 404 error from API', async () => {
    ;(getCharacters as any).mockRejectedValueOnce({ response: { status: 404 } })

    await wrapper.vm.fetchCharacters()
    await flushPromises()

    expect(wrapper.vm.characters).toEqual([])
    expect(wrapper.vm.totalPages).toBe(0)
  })
})
