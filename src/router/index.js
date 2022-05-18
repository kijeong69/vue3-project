import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/index.vue';
import Todos from '../pages/todos/index.vue';

const router = createRouter({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/todos',
            name: 'Todos',
            component: Todos
        },
        {
            path: '/todos/create',
            name: '',
            component: ''
        },
        {
            path: '/todos/:id',
            name: '',
            component: ''
        }
    ],
    history: createWebHistory()
});

// 1: /home 2: /todos 3: /todos/create 4: /todos/:id
export default router;

// import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
// import MyUser from './components/MyUser.vue'

// const isServer = typeof window === 'undefined'

// const history = isServer ? createMemoryHistory() : createWebHistory()

// const routes = [{ path: '/user', component: MyUser }]

// export default function() {
//   return createRouter({ routes, history })
// }