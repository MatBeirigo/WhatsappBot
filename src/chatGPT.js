const axios = require('axios');
require('dotenv').config();

class chatGPT {
    async response(text) {
        try {
            // const apiKey = process.env.OPENAI_API_KEY;
            const apiUrl = 'https://api.openai.com/v1/chat/completions';

            const response = await axios.post(apiUrl, {
                model: "text-davinci-002",
                messages: [
                    { role: 'system', content: 'Você é um assistente útil.' },
                    { role: 'user', content: text },
                ],
                max_tokens: 60,
                n: 1,
                temperature: 0.5,
                frequency_penalty: 0,
                presence_penalty: 0,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            });

            const choices = response?.data?.choices;
            const answer = choices ? choices[0].text : '';
            return answer || "Erro";
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            return "Erro";
        }
    }
}

module.exports = { chatGPT };
