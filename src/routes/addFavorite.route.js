const { FavoriteModel, MonumentModel, UserModel } = require('../db/sequelize');
const { handleError } = require('../../helper');

module.exports = (app) => {
    app.post('/api/favorites/:monumentId', async (req, res) => {
        const monumentId = parseInt(req.params.monumentId);
        const username = req.user.userName;

        try {
            // Get user ID from username
            const user = await UserModel.findOne({ where: { username } });
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé", data: null });
            }
            const userId = user.id;
            
            console.log(`🔍 Ajout du monument ${monumentId} aux favoris de l'utilisateur ${username} (ID: ${userId})`);

            // Check if monument exists
            const monument = await MonumentModel.findByPk(monumentId);
            if (!monument) {
                return res.status(404).json({ message: "Monument non trouvé", data: null });
            }

            // Create favorite
            const favorite = await FavoriteModel.create({
                userId: userId,
                monumentId: monumentId
            });
            
            console.log(`✅ Monument ${monumentId} ajouté aux favoris de l'utilisateur ${username}`);

            // Get complete monument details to return in response
            const completeMonument = await MonumentModel.findByPk(monumentId);

            const message = `Le monument a été ajouté à vos favoris.`;
            res.status(201).json({ 
                message, 
                data: {
                    favorite,
                    monument: completeMonument
                }
            });

        } catch (error) {
            // Check for unique constraint violation (already in favorites)
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ 
                    message: "Ce monument est déjà dans vos favoris", 
                    data: null 
                });
            }

            const message = "Le monument n'a pas pu être ajouté aux favoris. Réessayez dans quelques instants.";
            return handleError(res, error, message);
        }
    });
};
