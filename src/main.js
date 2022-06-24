import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faStar, 
  faRightFromBracket,
  faArrowTrendUp,
  faFire,
  faHouse,
  faAlignJustify,
  faArrowRight,
  faArrowLeft,
  faMagnifyingGlass,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faStar,
  faRightFromBracket,
  faArrowTrendUp,
  faFire,
  faHouse,
  faAlignJustify,
  faArrowRight,
  faArrowLeft,
  faMagnifyingGlass,
  faTrashCan
  );
  
const app = createApp(App);

app.directive('clickoutside', {
  mounted: function (el, binding) {
    el.outsideHandler = (e) => {
      if (!(e.target === el || el.contains(e.target))) {
        binding.value();
      }
    };

    document.body.addEventListener('click', el.outsideHandler);
  },
  unmounted: function (el) {
    document.body.removeEventListener('click', el.outsideHandler);
  }
});

app.use(router);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount('#app');
