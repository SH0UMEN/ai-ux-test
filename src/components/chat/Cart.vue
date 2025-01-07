<template>
	<v-list>
		<v-list-item v-for="product in cart" :key="product.id">
			<template v-slot:prepend>
				<v-avatar size="40" class="mr-2">
					<v-img :src="itemsMap[product.id].image" alt="ItemImage" cover></v-img>
				</v-avatar>
			</template>

			{{ itemsMap[product.id].name }}
			<span v-if="product.toppings != null && product.toppings.length > 0"> ({{ getToppingsByIds(product.toppings).map(topping => topping.name).join(', ') }})</span>
			<span> - {{ itemsMap[product.id].price }} ₽</span>
		</v-list-item>

		<v-list-subheader>Всего: {{ total }} ₽</v-list-subheader>
	</v-list>
</template>

<script setup>
	import { useStore } from '@/store';
	import { computed } from 'vue';
	import { storeToRefs } from 'pinia';

	const store = useStore();
	const { cart } = storeToRefs(store);

	const getProductById = (id) => store.getItemById(id);
	const getToppingsByIds = (id) => store.getToppingsByIds(id);

	const itemsMap = computed(() => {
		return Object.fromEntries(cart.value.map(item => [item.id, getProductById(item.id)]))
	})

	const total = computed(() => {
		return cart.value.reduce((acc, item) => {
			const product = getProductById(item.id);
			return acc + product.price;
		}, 0);
	});
</script>