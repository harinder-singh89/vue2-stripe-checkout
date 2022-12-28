import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/plan',
    name: 'Plan',
    props: true,
    component: () => import('../views/Plan.vue'),
  },
  {
    path: '/checkout',
    name: 'Checkout',
    props: true,
    component: () => import('../views/Checkout.vue'),
  },
  {
    path: '/thankyou',
    name: 'ThankYou',
    props: true,
    component: () => import('../views/ThankYou.vue'),
  },
  {
    path: '/success',
    name: 'success',
    props: true,
    component: () => import('../views/success.vue'),
  }, {
    path: '/error',
    name: 'error',
    props: true,
    component: () => import('../views/error.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
