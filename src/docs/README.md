# Documentation Swagger pour Monumento API

Ce dossier contient la documentation Swagger pour l'API Monumento, séparée du code source principal.

## Structure

```
docs/
└── swagger/
    ├── index.ts       # Point d'entrée qui importe tous les fichiers de documentation
    ├── schemas.ts     # Définitions des schémas (User, Monument, Favorite, etc.)
    ├── auth.ts        # Documentation des endpoints d'authentification
    ├── monuments.ts   # Documentation des endpoints de monuments
    ├── favorites.ts   # Documentation des endpoints de favoris
    ├── users.ts       # Documentation des endpoints d'utilisateurs
    └── websocket.ts   # Documentation des WebSockets
```

## Avantages de cette approche

1. **Séparation des préoccupations** : La documentation est séparée du code métier
2. **Meilleure maintenabilité** : Modifications de la documentation sans toucher au code source
3. **Organisation claire** : Documentation regroupée par module
4. **Moins de bruit dans le code source** : Pas d'annotations JSDoc volumineuses dans les fichiers de code

## Comment utiliser

### Ajouter de nouveaux endpoints

Pour documenter un nouvel endpoint, ajoutez les annotations Swagger dans le fichier correspondant du dossier `swagger/`.

Exemple pour un nouvel endpoint d'authentification :

```typescript
/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User logout
 *     description: Invalidates the user's refresh token
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout successful
 *                 data:
 *                   type: null
 */
```

### Ajouter un nouveau schéma

Pour ajouter un nouveau schéma, modifiez le fichier `schemas.ts` :

```typescript
/**
 * @swagger
 * components:
 *   schemas:
 *     NewSchema:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID
 *         name:
 *           type: string
 *           description: Name
 */
```

### Nettoyer les annotations Swagger du code source

Si vous avez des annotations Swagger dans votre code source et souhaitez les supprimer :

```bash
npm run clean-swagger
```

Ce script parcourt tous les fichiers TypeScript du projet et supprime les blocs de commentaires contenant des annotations Swagger.

## Accès à la documentation

La documentation Swagger est accessible via :

- Interface Swagger UI : `http://localhost:3000/api-docs`
- Documentation JSON brute : `http://localhost:3000/swagger.json`
