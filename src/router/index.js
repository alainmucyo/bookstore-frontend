import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Register from "@/views/Register";
import Welcome from "@/views/Welcome.vue";
import BookDetails from "@/views/BookDetails.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: Welcome,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/book/:id',
        name: 'BookDetails',
        component: BookDetails,
        meta: {
            requiresAuth: false
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        setTimeout(() => {
            if (router.app.$store.getters.isAuth)
                next();
            else
                next("login")
        }, 1)

    } else {
        setTimeout(() => {
            if (router.app.$store.getters.isAuth)
                next("/");
            else
                next()
        }, 1)
    }
})
export default router
