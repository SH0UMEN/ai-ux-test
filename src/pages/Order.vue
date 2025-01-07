<template>
	<v-form ref="form" v-model="valid">
		<v-container>
			<v-row>
				<v-col cols="12">
					<v-text-field
						v-model="name"
						:rules="nameRules"
						label="Имя"
						required
					></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field
						v-model="phone"
						:rules="phoneRules"
						label="Телефон"
						required
					></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field
						v-model="cardNumber"
						:rules="cardNumberRules"
						label="Номер карты"
						required
					></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-btn
						:disabled="!valid"
						color="success"
						block
						@click="submitForm"
					>
						Оформить заказ
					</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
	<v-dialog v-model="dialog" max-width="300">
		<v-card>
			<v-card-title class="text-h5">
				Ваня Охотников - петух
			</v-card-title>
		</v-card>
	</v-dialog>
</template>

<script setup>
	import { ref } from 'vue';

	const valid = ref(false);
	const name = ref('');
	const phone = ref('');
	const cardNumber = ref('');
	const nameRules = [(v) => !!v || 'Имя обязательно'];
	const phoneRules = [(v) => !!v || 'Телефон обязательно'];
	const cardNumberRules = [(v) => !!v || 'Номер карты обязательно'];
	const dialog = ref(false);

	const submitForm = () => {
		if (valid.value) {
			dialog.value = true;
		}
	};
</script>