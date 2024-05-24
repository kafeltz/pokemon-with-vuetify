/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
  routes: [
    { path: '/', name: 'home', component: () => import('../pages/index.vue') },
    // { path: '/list', name: 'pokemon-list', components: () => import('../pages/list.vue') },
    // { path: '/list/:page', name: 'pokemon-list-paged', components: () => import('../pages/list.vue') },
  ],
})

export default router
