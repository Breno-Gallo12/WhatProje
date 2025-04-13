const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoint para enviar mensagens
app.post('/send-message', async (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).send({ error: 'Número e mensagem são obrigatórios!' });
    }

    const chatId = `${number}@c.us`;
    try {
        await client.sendMessage(chatId, message);
        res.send({ success: `Mensagem enviada para ${number}` });
    } catch (err) {
        res.status(500).send({ error: `Erro ao enviar mensagem: ${err.message}` });
    }
});

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});