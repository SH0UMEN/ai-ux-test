import OpenAI from "openai";

class OpenAIAPIService {
	static baseUrl = "https://api.openai.com/v1";

	async sendMessage(message) {
		const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

		if(this.thread == null)
			this.thread = await openai.beta.threads.create();

		await openai.beta.threads.messages.create(this.thread.id, { role: "user", content: message });

		const run = await openai.beta.threads.runs.createAndPoll(this.thread.id, { assistant_id: import.meta.env.VITE_ASSISTANT_ID });

		if(run.status != 'completed')
			throw new Error('Run not completed');

		const messages = await openai.beta.threads.messages.list(run.thread_id);

		return messages.data[0].content[0].text.value;
	}
}

export default OpenAIAPIService;