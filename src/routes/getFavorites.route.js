const { FavoriteModel, MonumentModel, UserModel } = require('../db/sequelize');
const { handleError } = require('../../helper');

module.exports = (app) => {
    app.get('/api/favorites', async (req, res) => {
        const username = req.user.userName;

        try {
            // Get user ID from username
            const user = await UserModel.findOne({ where: { username } });
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé", data: null });
            }
            const userId = user.id;
            
            console.log(`🔍 Récupération des favoris de l'utilisateur ${username} (ID: ${userId})`);

            // Get user's favorite monuments with full monument details
            const favorites = await FavoriteModel.findAll({
                where: { userId: userId }
            });
            
            // Si aucun favori n'est trouvé
            if (favorites.length === 0) {
                return res.json({ 
                    message: "Vous n'avez pas encore de monuments favoris", 
                    data: { favorites: [], monuments: [] } 
                });
            }
            
            // Get monument IDs from favorites
            const monumentIds = favorites.map(favorite => favorite.monumentId);
            
            // Fetch the actual monuments
            const monuments = await MonumentModel.findAll({
                where: {
                    id: monumentIds
                }
            });
            
            // Créer un mapping pour faciliter l'association
            const monumentsById = {};
            monuments.forEach(monument => {
                monumentsById[monument.id] = monument;
            });
            
            // Associer chaque favori avec son monument correspondant
            const favoritesWithMonuments = favorites.map(favorite => ({
                favorite: favorite,
                monument: monumentsById[favorite.monumentId]
            }));
            
            console.log(`✅ ${monuments.length} monuments favoris récupérés pour l'utilisateur ${username}`);

            const message = "Liste des monuments favoris récupérée avec succès";
            res.json({ 
                message, 
                data: {
                    favorites: favorites,
                    monuments: monuments,
                    favoritesWithMonuments: favoritesWithMonuments
                }
            });

        } catch (error) {
            const message = "La liste des favoris n'a pas pu être récupérée. Réessayez dans quelques instants.";
            return handleError(res, error, message);
        }
    });
};
