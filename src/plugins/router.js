import { createRouter, createWebHistory } from 'vue-router';
import Order from '@/pages/Order.vue';
import Home from '@/pages/Home.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/order',
		name: 'order',
		component: Order
	}
	// Add more routes here...
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;