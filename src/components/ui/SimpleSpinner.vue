<template>
  <div class="spinner" :style="spinnerStyle"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: Number,
    default: 40
  },
  color: {
    type: String,
    default: '#000000'
  }
})

const spinnerStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  border: `4px solid ${props.color}20`,
  borderTop: `4px solid ${props.color}`,
  borderRadius: '50%'
}))
</script>

<style scoped>
.spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
