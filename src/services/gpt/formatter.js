class Formatter {
	static formatMessage(message) {
		if(typeof message == 'string')
			return message.replace(/\n+/g, '\n');

		for(let i = 0; i < message.length; i++)
			message[i] = message[i].replace(/\n+/g, '\n');

		return message;
	}
}

export default Formatter;