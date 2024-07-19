<template>
  <div v-if="character">
    <h2>{{ character.name }}</h2>
    <img :src="character.image" :alt="character.name" />
    <p><strong>Type:</strong> {{ character.type || 'Unknown' }}</p>
    <p><strong>Gender:</strong> {{ character.gender }}</p>
    <p><strong>Status:</strong> {{ character.status }}</p>
    <button @click="router.back">Back</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCharacter } from '@/api/rickAndMorty'
import type { Character } from '@/types/rickAndMorty'

const route = useRoute()
const router = useRouter()
const character = ref<Character | null>(null)

onMounted(async () => {
  const id = Number(route.params.id)
  character.value = await getCharacter(id)
})
</script>

<style lang="scss" scoped>
img {
  max-width: 300px;
  height: auto;
  border-radius: 5px;
}
</style>
