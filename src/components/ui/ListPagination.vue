<template>
  <div class="pagination">
    <button @click="onPrevious" :disabled="currentPage === 1">Previous</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="onNext" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'previous'): void
  (e: 'next'): void
}>()

const onPrevious = () => {
  emit('previous')
}

const onNext = () => {
  emit('next')
}
</script>

<style lang="scss" scoped>
.pagination {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 10px;

  button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background-color: #0056b3;
    }
  }
}
</style>
