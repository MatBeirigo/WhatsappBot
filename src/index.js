const { venomClient } = require('./VenomClient');
// const { chatGPT } = require('./chatGPT');

const bot = new venomClient();
// const chat = new chatGPT();
bot.createVenomClient().then((client) => start(client)).catch((erro) => { console.log(erro); });

function start(client) {
    client.onMessage(async (message) => {
        
        const { body, from, type, isGroupMsg  } = message;
        console.log(`Mensagem recebida de ${from}: ${body}`);

        if (type !== 'chat' || body.length < 1) {
        return;
        }

        if (isGroupMsg) {
            console.log(`Mensagem de grupo recebida de ${from}, ignorando.`);
            return;
        }

        if (body === '!help') {
            const response = 'Olá! Eu sou o Beirigo Júnior, assistente do Beirigo. No momento o Matheus pode não estar socialmente disponível, mas eu estou aqui para ajudar. Digite qualquer coisa e eu responderei.';
            await client.sendText(from, response);
            console.log(`Mensagem enviada para ${from}: ${response}`);
            return;
        }

        // const response = await chat.response(body.message);

        // try {
        //     await client.sendText(from, response);
        //     console.log(`Mensagem enviada para ${from}: ${response}`);
        // } catch (error) {
        //     console.error(`Erro ao enviar mensagem para ${from}: ${error.message}`);
        //         await client.sendText(from, 'Desculpe, houve um erro ao enviar a mensagem.');
        // }

        const greetingRegex = /bom dia|boa tarde|boa noite/i;
        if (greetingRegex.test(body)) {
            const response = 'Olá! Eu sou o Beirigo Júnior, assistente do Beirigo. No momento o Matheus pode não estar socialmente disponível, mas eu estou aqui para ajudar. Digite qualquer coisa e eu responderei.';
            const message = await client.sendText(from, response);

            // await client.sendText(from, response);

            const buttons = [
            {
                "Muito urgente": {
                "displayText": "O Matheus será notificado agora mesmo!"
                }
                },
            {
                "Nada de urgente": {
                "displayText": "Logo o Matheus será notificado"
                }
                },
            {
                "Não é urgente": {
                "displayText": "Sua mensagem logo será respondida"
                }
                }
            ]
            await client.sendButtons(from, 'Title', buttons, 'Description')
            .then((result) => {
                console.log('Result: ', result);
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); 
            });
            return result;
        }
    });
}