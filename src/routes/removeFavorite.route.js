const { FavoriteModel, UserModel, MonumentModel } = require('../db/sequelize');
const { handleError } = require('../../helper');

module.exports = (app) => {
    app.delete('/api/favorites/:monumentId', async (req, res) => {
        const monumentId = parseInt(req.params.monumentId);
        const username = req.user.userName;

        try {
            // Get user ID from username
            const user = await UserModel.findOne({ where: { username } });
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé", data: null });
            }
            const userId = user.id;
            
            console.log(`🔍 Suppression du monument ${monumentId} des favoris de l'utilisateur ${username} (ID: ${userId})`);

            // Find the favorite
            const favorite = await FavoriteModel.findOne({
                where: {
                    userId: userId,
                    monumentId: monumentId
                }
            });

            if (!favorite) {
                return res.status(404).json({ message: "Ce monument n'est pas dans vos favoris", data: null });
            }

            // Get monument details before deleting the favorite
            const monument = await MonumentModel.findByPk(monumentId);
            
            // Delete the favorite
            await favorite.destroy();
            
            console.log(`✅ Monument ${monumentId} retiré des favoris de l'utilisateur ${username}`);

            const message = `Le monument a été retiré de vos favoris.`;
            res.json({ message, data: monument });

        } catch (error) {
            const message = "Le monument n'a pas pu être retiré des favoris. Réessayez dans quelques instants.";
            return handleError(res, error, message);
        }
    });
};
