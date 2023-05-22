import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChatView from '../views/ChatView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import FriendsView from '../views/FriendsView.vue'
import { useAuth } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: RegisterView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/chat/:id',
      name: 'privateChat',
      component: ChatView,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/friends',
      name: 'friends',
      component: FriendsView,
      meta: {
        requireAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useAuth();
  const isAuth = store.token;

  if (to.meta.requireAuth && !isAuth) {
    next('login')
  } else if ((to.name === 'login' || to.name === 'register') && isAuth) {
    next('/')
  } else {
    next()
  }


})

export default router
