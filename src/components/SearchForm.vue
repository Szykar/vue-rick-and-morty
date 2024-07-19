<template>
  <div class="search-form">
    <input v-model="localName" @input="emitUpdate" placeholder="Search by name" />
    <select v-model="localStatus" @change="emitUpdate">
      <option value="">All</option>
      <option value="alive">Alive</option>
      <option value="dead">Dead</option>
      <option value="unknown">Unknown</option>
    </select>
    <button @click="resetSearch">Reset</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  name: string
  status: string
}>()

const emit = defineEmits<{
  (e: 'update', name: string, status: string): void
  (e: 'reset'): void
}>()

const localName = ref(props.name)
const localStatus = ref(props.status)

watch(
  () => props.name,
  (newValue) => {
    localName.value = newValue
  }
)

watch(
  () => props.status,
  (newValue) => {
    localStatus.value = newValue
  }
)

const emitUpdate = () => {
  emit('update', localName.value, localStatus.value)
}

const resetSearch = () => {
  localName.value = ''
  localStatus.value = ''
  emit('reset')
}
</script>

<style lang="scss" scoped>
.search-form {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
