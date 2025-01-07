import Formatter from '@/services/gpt/formatter.js';

class Interpreter {
	static mentionsRegExp = /<([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})>/g;
	static commandsRegExp = /<(gotoorder)>/g;
	static linksRegExp = /【.*?\.txt】/g;

	static parse(message) {
		const mentions = [];
		for(let match of message.matchAll(this.mentionsRegExp))
			mentions.push(match[1]);

		message = message.replace(new RegExp('\\s*' + this.mentionsRegExp.source, 'g'), '');

		const commands = message.matchAll(this.commandsRegExp);

		if(commands.length != 0)
			message = message.replace(new RegExp('\\s*' + this.commandsRegExp.source, 'g'), '');

		message = message.replace(/【.*?\.txt】/g, '');

		const cartStartIndex = message.indexOf('<--');
		const cartEndIndex = message.indexOf('-->');

		let cart;

		if(cartStartIndex != -1 && cartEndIndex != -1) {
			cart = message.slice(cartStartIndex + 3, cartEndIndex);
			message = [message.slice(0, cartStartIndex), message.slice(cartEndIndex + 3)];
		}

		return {
			cart: this.parseCart(cart),
			commands: this.parseCommands(commands),
			mentions: mentions,
			message: Formatter.formatMessage(message)
		};
	}

	static parseCommands(matches) {
		const commands = [];
		for(let match of matches)
			commands.push(match[1].trim());

		return commands;
	}

	static parseCart(cart) {
		if(cart == null)
			return null;

		const items = cart.trim().split('|'), result = [];

		for(let item of items) {
			const [id, toppingIds] = item.trim().split(':');
			result.push({ id: id.trim(), toppings: toppingIds == null || toppingIds == '' ? [] : toppingIds.split(',').map(x => x.trim()) });
		}

		return result;
	}
}

export default Interpreter;