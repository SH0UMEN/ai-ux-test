import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/ai-ux-test',
		name: 'home',
		component: () => import('@/pages/Home.vue')
	},
	{
		path: '/ai-ux-test/order',
		name: 'order',
		component: () => import('@/pages/Order.vue')
	}
	// Add more routes here...
];

const router = createRouter({
	history: createWebHistory(),
	base: '/ai-ux-test/',
	routes
});

export default router;