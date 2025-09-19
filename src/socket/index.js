const jwt = require('jsonwebtoken');
const fs = require('fs');
const publicKey = fs.readFileSync('./src/auth/jwtRS256.key.pub');
const { Server } = require('socket.io');

let messages = {};
let io;

function setupSocketServer(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth?.token;
        if (!token) {
            return next(new Error("Token manquant"));
        }

        jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
            if (err) {
                return next(new Error("Token invalide"));
            }
            socket.user = decoded;
            next();
        }); 
    });

    io.on('connection', (socket) => {
        console.log('🔗 Nouvelle connexion WebSocket établie');
        console.log(`👥 Total clients connectés: ${io.engine.clientsCount}`);
        console.log(`🔑 Utilisateur connecté: ${socket.user?.userName || 'Anonyme'}`);
    
        socket.on("joinMonument", ({monumentId, role}) => {
            socket.join(`monument_${monumentId}`);
            console.log(`${socket.user.userName} a rejoint la salle monument_${monumentId} en tant que ${role}`);
    
            if(!messages[monumentId]) 
                messages[monumentId] = [];
    
            socket.emit("chatHistory", messages[monumentId]);
        });
    
        socket.on("sendMessage", ({monumentId, role, message}) => {
            const msg = {
                user: socket.user.userName,
                role,
                message,
                date: new Date()
            };
    
            messages[monumentId].push(msg);
            io.to(`monument_${monumentId}`).emit("newMessage", msg);
        });
        
        socket.on('disconnect', () => {
            console.log('Un utilisateur est déconnecté');
        });
    });

    return io;
}

// Function to notify all connected clients about a new monument
function notifyNewMonument(monument) {
    console.log('🔔 Préparation de la notification pour un nouveau monument:', monument.title);
    
    if (io) {
        const notificationData = {
            event: 'newMonument',
            data: {
                id: monument.id,
                title: monument.title,
                description: monument.description,
                createdAt: monument.created
            }
        };
        
        console.log('Envoi de la notification WebSocket:', JSON.stringify(notificationData));
        console.log(`Nombre de clients connectés: ${io.engine.clientsCount}`);
        
        io.emit('newMonument', notificationData);
        console.log('Notification envoyée avec succès');
    } else {
        console.log('Impossible d\'envoyer la notification: io n\'est pas initialisé');
    }
}

module.exports = setupSocketServer;
module.exports.notifyNewMonument = notifyNewMonument;