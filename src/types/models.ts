import { Model, Optional } from 'sequelize';

// Interface pour User
export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  refreshToken?: string | null;
  refreshTokenExpiry?: Date | null;
  created?: Date;
  updated?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'created' | 'updated' | 'refreshToken' | 'refreshTokenExpiry'> {}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

// Interface pour Monument
export interface MonumentAttributes {
  id: number;
  title: string;
  country: string;
  city: string;
  buildYear?: number | null;
  picture?: string | null;
  description?: string | null;
  created?: Date;
}

export interface MonumentCreationAttributes extends Optional<MonumentAttributes, 'id' | 'created' | 'buildYear' | 'picture' | 'description'> {}

export interface MonumentInstance extends Model<MonumentAttributes, MonumentCreationAttributes>, MonumentAttributes {}

// Interface pour Anecdote
export interface AnecdoteAttributes {
  id: number;
  content: string;
  monument_id: number;
  created?: Date;
  updated?: Date;
}

export interface AnecdoteCreationAttributes extends Optional<AnecdoteAttributes, 'id' | 'created' | 'updated'> {}

export interface AnecdoteInstance extends Model<AnecdoteAttributes, AnecdoteCreationAttributes>, AnecdoteAttributes {}

// Interface pour Favorite
export interface FavoriteAttributes {
  id: number;
  userId: number;
  monumentId: number;
  created?: Date;
}

export interface FavoriteCreationAttributes extends Optional<FavoriteAttributes, 'id' | 'created'> {}

export interface FavoriteInstance extends Model<FavoriteAttributes, FavoriteCreationAttributes>, FavoriteAttributes {}
