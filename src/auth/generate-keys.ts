import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * Script pour générer les clés RSA pour JWT
 * Ce script vérifie si les clés existent déjà et les génère si nécessaire
 */

const privateKeyPath = path.join(__dirname, 'jwtRS256.key');
const publicKeyPath = path.join(__dirname, 'jwtRS256.key.pub');

// Fonction pour vérifier si un fichier existe
function fileExists(filePath: string): boolean {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

// Fonction pour générer les clés RSA
function generateRSAKeys(): void {
  console.log('🔑 Génération des clés RSA pour JWT...');
  
  try {
    // Générer la clé privée
    execSync('openssl genrsa -out jwtRS256.key 2048', { cwd: __dirname });
    console.log('✅ Clé privée générée avec succès');
    
    // Générer la clé publique à partir de la clé privée
    execSync('openssl rsa -in jwtRS256.key -pubout -out jwtRS256.key.pub', { cwd: __dirname });
    console.log('✅ Clé publique générée avec succès');
    
    // Définir les permissions appropriées
    fs.chmodSync(privateKeyPath, 0o600); // Lecture/écriture pour le propriétaire uniquement
    fs.chmodSync(publicKeyPath, 0o644); // Lecture pour tous, écriture pour le propriétaire
    
    console.log('✅ Permissions des clés configurées');
    console.log('🔐 Clés RSA générées avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la génération des clés RSA:', error);
    process.exit(1);
  }
}

// Vérifier si les clés existent déjà
if (fileExists(privateKeyPath) && fileExists(publicKeyPath)) {
  console.log('✅ Les clés RSA existent déjà');
} else {
  console.log('⚠️ Les clés RSA n\'existent pas ou sont incomplètes');
  generateRSAKeys();
}

export {};
