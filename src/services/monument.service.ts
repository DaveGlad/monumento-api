import { Monument } from '../config/database';
import { MonumentInstance } from '../types/models';
import { WebSocketService } from '../websockets/websocket.service';
import { Op } from 'sequelize';

/**
 * Service pour la gestion des monuments
 */
export class MonumentService {
  /**
   * Crée un nouveau monument
   * @param monumentData - Données du monument à créer
   * @returns Le monument créé
   */
  static async createMonument(monumentData: any): Promise<MonumentInstance> {
    console.log('🏰 Création d\'un nouveau monument:', monumentData.title);
    
    const monument = await Monument.create(monumentData);
    
    console.log('💾 Monument créé avec succès, ID:', monument.id);
    
    // Envoyer une notification WebSocket
    console.log('📢 Envoi de la notification aux clients connectés...');
    WebSocketService.notifyNewMonument(monument);
    
    return monument;
  }

  /**
   * Récupère tous les monuments
   * @returns Liste de tous les monuments
   */
  static async getAllMonuments(): Promise<MonumentInstance[]> {
    return await Monument.findAll();
  }

  /**
   * Récupère un monument par son ID
   * @param id - ID du monument à récupérer
   * @returns Le monument trouvé ou null
   */
  static async getMonumentById(id: number): Promise<MonumentInstance | null> {
    return await Monument.findByPk(id);
  }

  /**
   * Met à jour un monument
   * @param id - ID du monument à mettre à jour
   * @param monumentData - Nouvelles données du monument
   * @returns Le monument mis à jour
   */
  static async updateMonument(id: number, monumentData: any): Promise<MonumentInstance | null> {
    const monument = await Monument.findByPk(id);
    
    if (!monument) {
      return null;
    }
    
    return await monument.update(monumentData);
  }

  /**
   * Supprime un monument
   * @param id - ID du monument à supprimer
   * @returns true si le monument a été supprimé, false sinon
   */
  static async deleteMonument(id: number): Promise<boolean> {
    const monument = await Monument.findByPk(id);
    
    if (!monument) {
      return false;
    }
    
    await monument.destroy();
    return true;
  }

  /**
   * Recherche des monuments par critères
   * @param criteria - Critères de recherche
   * @returns Liste des monuments correspondant aux critères
   */
  static async searchMonuments(criteria: any): Promise<MonumentInstance[]> {
    const whereClause: any = {};
    
    if (criteria.title) {
      whereClause.title = { [Op.like]: `%${criteria.title}%` };
    }
    
    if (criteria.country) {
      whereClause.country = { [Op.like]: `%${criteria.country}%` };
    }
    
    if (criteria.city) {
      whereClause.city = { [Op.like]: `%${criteria.city}%` };
    }
    
    return await Monument.findAll({ where: whereClause });
  }
}
