import { createRouter, createWebHistory } from "vue-router"
import TrendingBlock from '@/content-blocks/TrendingBlock.vue'
import PopularBlock from '@/content-blocks/PopularBlock.vue'
import FavouritesBlock from '@/content-blocks/FavouritesBlock.vue'

const routes = [
  { path: '/popular', component: PopularBlock },
  { path: '/trending', component: TrendingBlock },
  { path: '/favourites', component: FavouritesBlock }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;