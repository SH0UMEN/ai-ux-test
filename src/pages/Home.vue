<template>
	<v-container class="my-2" fluid>
		<v-row>
			<v-col v-for="(item, index) in items" :key="index" cols="12" sm="6" md="4" lg="3">
				<v-card>
					<v-img :src="item.image" height="200px"></v-img>
					<v-card-title>{{ item.name }}</v-card-title>
					<v-card-text>{{ item.description }}</v-card-text>
					<v-card-actions>
						<v-btn color="primary" @click="addToCart(item)">Добавить в корзину</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
	import { useStore } from '@/store.js';
	import { storeToRefs } from 'pinia';

	const store = useStore();
	const { items } = storeToRefs(store);

	const addToCart = (item) => {
		store.addToCart(item);
	};
</script>