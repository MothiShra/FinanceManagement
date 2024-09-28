const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');

// Endpoint to send a chat message
router.post('/messages/send', async (req, res) => {
  try {
    const { userId, senderId, text } = req.body;
    const message = new ChatMessage({
      userId,
      senderId,
      text
    });
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to retrieve chat messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await ChatMessage.find().sort({ timestamp: 'asc' });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
