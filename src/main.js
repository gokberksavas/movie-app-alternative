import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App);

library.add(faStar, faRightFromBracket );

app.use(router);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount('#app');
