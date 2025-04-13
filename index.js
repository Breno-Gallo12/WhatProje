const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('ready', () => {
    console.log('Bot pronto para uso!');

    // Lista de números para enviar a mensagem (formato internacional, sem "+" e sem espaços)
    const numbers = [''];

    // Caminho para a imagem que será enviada
    const imagePath = './images.png';

    // Mensagem padrão
    const messageText = 'Oi! Teste do bot.';

    // Lê a imagem e envia para cada número
    const media = MessageMedia.fromFilePath(imagePath);
    numbers.forEach(number => {
        const chatId = `${number}@c.us`; // Formato do ID do chat
        client.sendMessage(chatId, media, { caption: messageText })
            .then(() => console.log(`Mensagem enviada para ${number}`))
            .catch(err => console.error(`Erro ao enviar para ${number}:`, err));
    });
});

// Gera o QR Code para autenticação
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.initialize();