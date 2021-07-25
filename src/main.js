import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faMinusSquare, faPlusSquare, faCoffee);

createApp(App).use(router).use(store).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            console.log('not logged in!');
            next({name: 'Login'});
        }
        else
            next();
    }
    else
        next();
});

