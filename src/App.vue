<template>
	<v-app>
		<v-app-bar app>
			<v-btn :to="{ name: 'home' }" color="white" variant="plain" dark>New ux test</v-btn>

			<v-spacer></v-spacer>

			<v-btn icon dark color="plain" class="mr-5" :disabled="cart.length == 0" @click="drawer = !drawer">
				<v-badge color="primary" :content="cart.length">
					<v-icon>mdi-cart-outline</v-icon>
				</v-badge>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" location="right" temporary>
			<cart :cart="[]"></cart>

			<div class="px-4">
				<v-btn color="primary" :to="{ name: 'order' }" block>Оформить заказ</v-btn>
				<v-btn color="red" @click="clearCart" block class="mt-4">Очистить корзину</v-btn>
			</div>
		</v-navigation-drawer>

		<v-main class="px-2">
			<router-view></router-view>
		</v-main>

		<div class="position-fixed bottom-0 right-0 mb-8 mr-6">
			<v-btn v-if="!chatOpened" fab icon dark color="primary" @click="chatOpened = true">
				<v-icon>mdi-chat</v-icon>
			</v-btn>

			<chat v-else @close="chatOpened = false" class="chat"/>
		</div>
	</v-app>f
</template>

<script setup>
	import Chat from '@/components/chat/Chat.vue';
	import Cart from '@/components/chat/Cart.vue';
	import { useStore } from '@/store.js';
	import { storeToRefs } from 'pinia';
	import { ref } from 'vue';

	const chatOpened = ref(false);
	const drawer = ref(false);
	const store = useStore();
	const { cart } = storeToRefs(store);

	const clearCart = () => {
		store.setCart([]);
		drawer.value = false;
	};
</script>

<style scoped>
	.chat {
		width: 450px;
		height: 500px;
	}
</style>
