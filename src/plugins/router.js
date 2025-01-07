import { createRouter, createWebHistory } from 'vue-router';
import Order from '@/pages/Order.vue';
import Home from '@/pages/Home.vue';

const routes = [
	{
		path: '/ai-ux-test',
		name: 'home',
		component: Home
	},
	{
		path: '/ai-ux-test/order',
		name: 'order',
		component: Order
	}
	// Add more routes here...
];

const router = createRouter({
	history: createWebHistory(),
	base: '/ai-ux-test/',
	routes
});

export default router;