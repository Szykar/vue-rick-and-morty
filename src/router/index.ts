import { createRouter, createWebHistory } from 'vue-router'
import CharacterList from '@/components/CharacterList.vue'
import CharacterDetail from '@/components/CharacterDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'CharacterList',
      component: CharacterList
    },
    {
      path: '/character/:id',
      name: 'CharacterDetail',
      component: CharacterDetail
    }
  ]
})

export default router
