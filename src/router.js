import { createRouter, createWebHistory } from "vue-router"
import TrendingBlock from '@/content-blocks/TrendingBlock.vue'
import PopularBlock from '@/content-blocks/PopularBlock.vue' 

const routes = [
  { path: '/popular', component: PopularBlock },
  { path: '/trending', component: TrendingBlock }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;