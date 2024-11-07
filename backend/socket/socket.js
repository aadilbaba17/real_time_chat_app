// socket.js
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {}; // { userId: socketId }

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    // Retrieve userId from the query parameter
    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") userSocketMap[userId] = socket.id;

    // Emit event to notify all clients about connected users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Listen for the "typing" event from the client
    socket.on("typing", (data) => {
        console.log(`User ${userId} is typing in conversation ${data.conversationId}`);
        socket.to(data.conversationId).emit("typing", {
            conversationId: data.conversationId,
            userId,
        });
    });

    // Listen for the "stopTyping" event from the client
    socket.on("stopTyping", (data) => {
        console.log(`User ${userId} stopped typing in conversation ${data.conversationId}`);
        socket.to(data.conversationId).emit("stopTyping", {
            conversationId: data.conversationId,
            userId,
        });
    });

    // Join specific conversation rooms if needed
    socket.on("joinConversation", (conversationId) => {
        socket.join(conversationId);
        console.log(`User ${userId} joined conversation ${conversationId}`);
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };
