import OpenAI from "openai";
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
export async function chatResponse(req, res) {
	const { message } = req.body;
	const response = await chatGPTResponse(message);
	return res.status(200).json(response);
}

// replace with literally anything better
async function chatbotResponse(message) {
	const response =
		"I'm sorry, I don't understand that. Please try again.";
	message = message.toLowerCase();
	if (message.includes("hello")) {
		response = "Hello! How can I help you today?";
	} else if (message.includes("help")) {
		response =
			"I can help you with the following:\n\n1. Book a ticket\n2. Cancel a ticket\n3. Check ticket status\n4. Get information about the event\n5. Contact support";
	} else if (message.includes("book a ticket")) {
		response =
			"Sure! Please provide me with the following information:\n\n1. Number of tickets\n2. Type of ticket (e.g. VIP, General Admission, etc.)\n3. Names of the attendees";
	} else if (message.includes("cancel a ticket")) {
		response =
			"Sure! Please provide me with the ticket number you would like to cancel";
	} else if (message.includes("check ticket status")) {
		response =
			"Sure! Please provide me with the ticket number you would like to check";
	} else if (
		message.includes("get information about the event")
	) {
		response =
			"The event will take place on Saturday, June 12th, 2021 at 7:00 PM. The venue is the Convention Center. Please let me know if you need more information.";
	} else if (message.includes("contact support")) {
		response =
			"You can contact support by emailing" +
			context.supportEmail +
			" or calling " +
			context.supportPhone;
	} else if (message.includes("thank you")) {
		response = "You're welcome!";
	} else if (message.includes("temple name")) {
		response = context.templeName;
	} else if (message.includes("temple location")) {
		response = context.templeLocation;
	}
	return new Promise((resolve) => resolve(response));
}

const context = {
	supportEmail: "abc@xyz.com",
	supportPhone: "123-456-7890",
	templeName: "Temple of the Sacred Tooth Relic",
	templeLocation: "DG2 hostel, IIT(BHU)",
};

const system_prompt =
	`The following is a conversation with an AI assistant helping users with information regarding a temple ticketing system. The assistant is helpful, creative, clever, and very friendly. Limit your responses to around 120 words each. The context needed to answer the queries is provided in the json format below:\n\n` +
	JSON.stringify(context);

async function chatGPTResponse(message) {
	try {
		const prompt = message;
		const completion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{ role: "system", content: system_prompt },
				{ role: "user", content: prompt },
			],
			maxTokens: 150,
		});
		return completion.data.choices[0].text;
	} catch (err) {
		console.log(err);
		return await chatbotResponse(message);
	}
}
