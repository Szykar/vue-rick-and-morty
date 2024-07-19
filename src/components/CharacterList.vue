<template>
  <div>
    <SearchForm
      :name="searchName"
      :status="searchStatus"
      @update="updateSearch"
      @reset="resetSearch"
    />
    <transition-group name="fade" tag="div">
      <div v-if="loading" class="loading">
        <SimpleSpinner :size="100" color="#007bff" />
      </div>
      <div v-else-if="characters.length === 0" class="no-results">
        <p>No characters found. Try a different search.</p>
        <button @click="resetSearch">Clear search and try again</button>
      </div>
      <div v-else class="character-grid">
        <div v-for="character in characters" :key="character.id" class="character-card">
          <router-link :to="`/character/${character.id}`">
            <img :src="character.image" :alt="character.name" />
            <h3>{{ character.name }}</h3>
          </router-link>
        </div>
      </div>
    </transition-group>
    <ListPagination
      v-if="!error && characters.length > 0"
      :total-pages="totalPages"
      :current-page="currentPage"
      @previous="prevPage"
      @next="nextPage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getCharacters } from '@/api/rickAndMorty'
import { useRoute, useRouter } from 'vue-router'
import type { Character } from '@/types/rickAndMorty'
import ListPagination from '@/components/ui/ListPagination.vue'
import SearchForm from '@/components/SearchForm.vue'
import SimpleSpinner from '@/components/ui/SimpleSpinner.vue'

const router = useRouter()
const route = useRoute()

const characters = ref<Character[]>([])
const currentPage = ref(Number(route.query.page) || 1)
const totalPages = ref(1)
const searchName = ref((route.query.name as string) || '')
const searchStatus = ref((route.query.status as string) || '')
const loading = ref(false)
const error = ref<string | null>(null)

const fetchCharacters = async () => {
  try {
    error.value = null
    loading.value = true
    const result = await getCharacters(currentPage.value, searchName.value, searchStatus.value)
    characters.value = result.results
    totalPages.value = result.info.pages
  } catch (err: any) {
    if (err.response && err.response.status === 404) {
      characters.value = []
      totalPages.value = 0
    } else {
      error.value = 'An error occurred while fetching characters. Please try again later.'
    }
  } finally {
    loading.value = false
  }
}

watch([currentPage, searchName, searchStatus], fetchCharacters)

const setQueryPage = () => {
  router.push({ query: { ...route.query, page: currentPage.value } })
}

const updateSearch = (name: string, status: string) => {
  searchName.value = name
  searchStatus.value = status
  currentPage.value = 1

  router.push({
    query: { page: String(currentPage.value), name: searchName.value, status: searchStatus.value }
  })
}

const resetSearch = () => {
  searchName.value = ''
  searchStatus.value = ''
  currentPage.value = 1
  error.value = null
  fetchCharacters()

  router.push({ query: { page: '1' } })
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++

  setQueryPage()
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--

  setQueryPage()
}

fetchCharacters()
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.loading {
  color: #000;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.character-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: white;

  img {
    border: 0;
    width: 100%;
    min-height: 214px;
    height: auto;
  }

  h3 {
    padding: 10px;
    margin: 0;
    text-align: center;
  }
}

.error-message,
.no-results {
  text-align: center;
  padding: 20px;
  background-color: #527ba0;
  border: 1px solid #3c7cc2;
  color: #000000;
  border-radius: 4px;
  margin: 20px 0;

  p {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
}
</style>
