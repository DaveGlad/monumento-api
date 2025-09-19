const { MonumentModel } = require('../db/sequelize');
const { handleError } = require('../../helper');
const { notifyNewMonument } = require('../socket');

module.exports = (app) => {
    app.post('/api/monuments', async (req, res) => {
        const { monument } = req.body;

        try {

            console.log('🏰 Création d\'un nouveau monument:', monument.title);
            const createdMonument = await MonumentModel.create(monument);
            console.log('💾 Monument créé avec succès, ID:', createdMonument.id);

            // Send WebSocket notification to all connected clients
            console.log('📢 Envoi de la notification aux clients connectés...');
            notifyNewMonument(createdMonument);

            const message = `Le monument ${createdMonument.title} a bien été créé.`;
            res.status(201).json({ message, data: createdMonument });

        } catch (error) {
            const message = "Le monument n'a pas pu être créé. Réessayez dans quelques instants.";
            return handleError(res, error, message);
        }
    });
}   