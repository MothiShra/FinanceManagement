// models/ChatMessage.js

const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    senderId: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;
