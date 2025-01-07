<template>
	<v-card class="d-flex flex-column">
		<v-card-title class="d-flex justify-space-between">
			AI Ассистент
			<v-btn density="comfortable" icon="$close" variant="plain" @click="onClose"></v-btn>
		</v-card-title>

		<div class="overflow-y-scroll flex-1-1-100" ref="container">
			<v-list>
				<v-list-item v-for="(message, index) in messages" :key="index" class="mb-2">
					<div :class="['d-flex', message.isUser ? 'flex-row-reverse' : 'flex-row']">
						<v-avatar v-if="!isSameAuthor(index)" color="primary" class="white--text">O</v-avatar>
						<div :class="[!isSameAuthor(index) ? 'mt-2' : '', (message.isUser ? 'mr-' : 'ml-') + (isSameAuthor(index) ? '14' : '4'), 'text-pre-line']">
							<span v-if="!Array.isArray(message.content)">{{ message.content }}</span>
							<template v-else>
								<span v-if="message.content[0].length > 0">{{ message.content[0] }}</span>

								<v-card variant="outlined" class="mt-4">
									<cart></cart>
								</v-card>

								<span v-if="message.content[1].length > 0">{{ message.content[1] }}</span>
							</template>
						</div>
					</div>
				</v-list-item>
			</v-list>
		</div>

		<v-text-field v-model="newMessage" label="Введите сообщение" @keydown.enter="send" hide-details ref="input">
			<template v-slot:append-inner>
				<v-btn @mousedown="onSpeechMouseDown" @mouseup="onSpeechMouseUp" variant="plain" icon="mdi-microphone"></v-btn>
			</template>
		</v-text-field>
	</v-card>
</template>

<script setup>
	import { ref, nextTick, onMounted, onUnmounted } from 'vue';
	import GPT from '@/services/gpt/openai.js';
	import Interpreter from '@/services/gpt/interpreter.js';
	import Commands from '@/types/commands.js';
	import router from '@/plugins/router.js';
	import Cart from '@/components/chat/Cart.vue';
	import { useStore } from '@/store.js';

	const messages = ref([{ content: 'Бу. Испугался? Не бойся! Я друг. Я помогу тебе определиться с кушаньем, если тебе самому тяжеловато' }]);
	const newMessage = ref('');
	const container = ref(null);
	const input = ref(null);

	const emit = defineEmits(['close']);
	const store = useStore();

	const synth = window.speechSynthesis;
	const recognition = new webkitSpeechRecognition();

	const gpt = new GPT();

	recognition.lang = 'ru-RU';
	recognition.maxResults = 10;
	recognition.addEventListener('result', (event) => {
		newMessage.value = event.results[0][0].transcript;
		send();
	});

	const send = async () => {
		synth.cancel();

		messages.value.push({ content: newMessage.value, isUser: true });
		messages.value.push({ content: 'Печатает...' });
		request();

		newMessage.value = '';

		scrollToBottom();
	};

	const scrollToBottom = async () => {
		await nextTick();
		container.value.scrollTop = container.value.scrollHeight;
	};

	const request = async () => {
		let message = await gpt.sendMessage(messages.value[messages.value.length - 2].content);
		const parsed = Interpreter.parse(message);

		message = parsed.message;

		handleCommands(parsed.commands);

		if(message.length == 0)
			return messages.value.pop();

		messages.value[messages.value.length - 1].content = parsed.message;
		store.setCart(parsed.cart || []);

		speak(parsed.message);
		scrollToBottom();
	};

	const handleCommands = (commands) => {
		for(let command of commands) {
			switch(command) {
				case Commands.GoToOrder:
					router.push({ name: 'order' });
					onClose();
					break;
			}
		}
	};

	const onClose = () => {
		emit('close');
	};

	const onSpeechMouseDown = () => {
		if(!('webkitSpeechRecognition' in window))
			return console.log('Аудиораспознавание не поддерживается');

		synth.cancel();
		recognition.start();
	};

	const onSpeechMouseUp = () => {
		recognition.stop();
	};

	const speak = (message) => {
		const utterance = new SpeechSynthesisUtterance(message);
		synth.speak(utterance);
	};

	const isSameAuthor = (index) => {
		return index != 0 && messages.value[index - 1].isUser == messages.value[index].isUser;
	};

	onMounted(() => {
		speak(messages.value[0].content);
		input.value.focus();
	});

	onUnmounted(() => {
		synth.cancel();
	});
</script>