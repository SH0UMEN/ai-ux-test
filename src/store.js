import { defineStore } from 'pinia';

export const useStore = defineStore('products', {
	state: () => ({
		cart: [],
		toppings: [
			{
				id: '57E1EA3E-A8EA-4997-A5ED-847B757E66A3',
				name: 'Тонкое тесто'
			},
			{
				id: '78EF64BB-4377-4E49-BF17-C2D2FC8317B8',
				name: 'Толстое тесто'
			},
			{
				id: '16C2A014-79C8-415F-A786-CE98D2D0E888',
				name: 'Дополнительный сыр'
			},
			{
				id: '0B46D45C-6AF2-47B8-B368-456929650500',
				name: 'Пепперони'
			},
			{
				id: '73D9D370-EF55-4CD5-A803-5D0DD53F866D',
				name: 'Ветчина'
			},
			{
				id: '61C682E3-546D-4E99-839D-F0248893E9FB',
				name: 'Шампиньоны'
			},
			{
				id: '5C3AED45-08D7-44A0-A894-C80AA16BFCEA',
				name: 'Авокадо'
			},
			{
				id: '7E86AA88-1114-4D7F-B66A-8F365371AD11',
				name: 'Огурец'
			}
		],
		items: [
			{
				id: '814C1831-28FD-49D2-86C3-FF50D7004910',
				name: 'Пицца "Маргарита"',
				description: 'Состав - тесто, сыр моцарелла, томатный соус, базилик',
				image: '/ai-ux-test/ritapizza.png',
				price: 1000
			},
			{
				id: '0F530E92-66F5-40BB-887A-56A7A7C5C8C1',
				name: 'Пицца "Пепперони"',
				description: 'Состав - тесто, сыр моцарелла, томатный соус, салями пепперони',
				image: '/ai-ux-test/peppepizza.jpg',
				price: 1200
			},
			{
				id: 'E1503516-318F-47F6-84A2-D730FFEFDB4E',
				name: 'Роллы "Филадельфия"',
				description: 'Состав - рис, водоросли нори, лосось, сыр филадельфия, огурец или авокадо',
				image: '/ai-ux-test/philarolls.jpeg',
				price: 500
			},
			{
				id: '93044B07-6FD7-4EB4-8349-5F094DE5DEA8',
				name: 'Роллы "Калифорния"',
				description: 'Состав - рис, водоросли нори, лосось, сыр филадельфия, авокадо, икра тобико',
				image: '/ai-ux-test/calirolls.jpg',
				price: 400
			},
			{
				id: '39A2C18D-BCF1-464A-9BD5-F03C76122076',
				name: 'Роллы "Маки" с лососем',
				description: 'Состав - рис, водоросли нори, лосось',
				image: '/ai-ux-test/makirolls.webp',
				price: 300
			},
			{
				id: '31A50353-98F1-4C50-8C9D-1EA1E8E1E499',
				name: 'Шаверма',
				description: 'Состав - лаваш, жаренная куриная грудка, салат, кефирно-чесночный соус',
				image: '/ai-ux-test/shava.jpg',
				price: 200
			},
			{
				id: '947B20BA-F9A3-4BE5-9F23-12F9F7993996',
				name: 'Котлета по-киевски',
				description: 'Состав - куриное филе, сливочное масло, укроп, чеснок, панированные сухари, яйцо, мука',
				image: '/ai-ux-test/kievankotlete.jpg',
				price: 60
			},
			{
				id: '1779C78E-7BF7-4341-8B71-10B3E5B9485E',
				name: 'Хот-дог',
				description: 'Состав - мягкая булочка, сосиска домашняя, маринованный лук, горчица, кетчуп',
				image: '/ai-ux-test/hotdogs.webp',
				price: 100
			}
		]
	}),
	actions: {
		setCart(cart) {
			this.cart = cart;
		},

		addToCart(item) {
			this.cart.push({ id: item.id });
		}
	},
	getters: {
		getToppingsByIds: (state) => (ids) => state.toppings.filter((topping) => ids.includes(topping.id)),
		getItemById: (state) => (id) => state.items.find((item) => item.id === id),
		getItemsByIds: (state) => (ids) => state.items.filter((item) => ids.includes(item.id)),
	}
});