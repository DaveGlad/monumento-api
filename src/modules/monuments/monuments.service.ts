import { Monument } from "../../config/database";
import { Op } from "sequelize";

/**
 * Service for monuments management
 */
export class MonumentsService {
  /**
   * Find all monuments
   * @returns List of all monuments
   */
  async findAll(): Promise<any[]> {
    return Monument.findAll();
  }

  /**
   * Search monuments by criteria
   * @param criteria - Search criteria
   * @returns List of monuments matching criteria
   */
  async search(criteria: {
    title?: string;
    country?: string;
    city?: string;
  }): Promise<any[]> {
    const where: any = {};

    if (criteria.title) {
      where.title = { [Op.like]: `%${criteria.title}%` };
    }

    if (criteria.country) {
      where.country = { [Op.like]: `%${criteria.country}%` };
    }

    if (criteria.city) {
      where.city = { [Op.like]: `%${criteria.city}%` };
    }

    return Monument.findAll({ where });
  }

  /**
   * Find monument by ID
   * @param id - Monument ID
   * @returns Monument if found, null otherwise
   */
  async findById(id: number): Promise<any | null> {
    return Monument.findByPk(id);
  }

  /**
   * Create a new monument
   * @param monumentData - Monument data
   * @returns Created monument
   */
  async create(monumentData: any): Promise<any> {
    return Monument.create(monumentData);
  }

  /**
   * Update an existing monument
   * @param id - Monument ID
   * @param monumentData - Monument data
   * @returns Updated monument if found, null otherwise
   */
  async update(id: number, monumentData: any): Promise<any | null> {
    const monument = await Monument.findByPk(id);

    if (!monument) {
      return null;
    }

    return monument.update(monumentData);
  }

  /**
   * Delete a monument
   * @param id - Monument ID
   * @returns true if deleted, false if not found
   */
  async delete(id: number): Promise<boolean> {
    const monument = await Monument.findByPk(id);

    if (!monument) {
      return false;
    }

    await monument.destroy();
    return true;
  }
}
