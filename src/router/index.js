import { createRouter, createWebHistory } from 'vue-router'
import CatalogView from '../views/CatalogView.vue'
import CatalogItem from '../views/CatalogItem.vue'

const routes = [
  {
    path: '/',
    name: 'catalog',
    component: CatalogView
  },
  {
    path: '/cart',
    name: 'cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CartView.vue'),
    props: true
  },
  {
    path: '/:id',
    name: 'catalog_item',
    component: CatalogItem,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
