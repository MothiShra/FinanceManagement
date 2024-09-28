// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');
const BranchModel = require('./models/Branch');
const NewModel = require('./models/data');
const CustomerModel = require('./models/addCustomer');
const PaymentHistoryModel = require('./models/paymentHistory');
const chatRoutes = require('./routes/chatRoutes');
const ChatMessage = require('./models/ChatMessage');


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/customers', async (req, res) => {
  try {
    const allCustomers = await CustomerModel.find();
    if (allCustomers && allCustomers.length > 0) {
      res.json({ customers: allCustomers });
    } else {
      res.status(404).json({ error: 'No customer data available' });
    }
  } catch (error) {
    console.error('Error fetching all customer details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/customers/add', async (req, res) => {
  try {
    const newCustomer = new CustomerModel(req.body);
    const result = await newCustomer.save();
    res.json({ message: 'Customer details added successfully', customer: result });
  } catch (error) {
    console.error('Error adding customer details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/users/:userId/toggleStatus', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.toggleActive();
    res.json({ isActive: user.isActive });
  } catch (error) {
    console.error('Error toggling user status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await UserModel.findOne({ Email: Email });
    if (user) {
      if (user.Password === String(Password)) {
        res.json('Login successful');
      } else {
        res.json('Incorrect password');
      }
    } else {
      res.json('No user found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await NewModel.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

app.post('/Users', async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    const branch = await BranchModel.create(req.body);
    console.log('Created', user, branch);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

app.put('/customers/:customerId/pay', async (req, res) => {
  const customerId = req.params.customerId;
  const { paymentAmount } = req.body;
  try {
    const customer = await CustomerModel.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    customer.dueAmt -= paymentAmount;
    customer.payments.push({
      date: new Date(),
      amount: paymentAmount
    });

    await customer.save();

    res.json({ message: 'Payment successful', customer });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/customers/:customerId/payment-history', async (req, res) => {
  const customerId = req.params.customerId;
  try {
    const customer = await CustomerModel.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer.payments);
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    // Fetch all users
    const users = await UserModel.find({}, 'FirstName'); // Fetch only the FirstName field
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Feedback route
app.post('/api/feedbacks', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const feedback = new Feedback({ name, email, message });
    const savedFeedback = await feedback.save();
    res.status(201).json({ success: true, data: savedFeedback });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/chats/:userId', async (req, res) => {
  const { userId } = req.params;
  const { senderId, text } = req.body;

  try {
      // Create a new chat message
      const newMessage = new ChatMessage({
          userId,
          senderId,
          text,
      });

      // Save the new message to the database
      await newMessage.save();

      res.status(201).json(newMessage); // Send back the saved message as JSON response
  } catch (error) {
      console.error('Error saving chat message:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch chat history for a specific user
app.get('/chats/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
      const chatHistory = await ChatMessage.find({ userId });
      res.json(chatHistory);
  } catch (error) {
      console.error('Error fetching chat history:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by ID
app.get('/api/users/:userId', async (req, res) => {
  try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/chats/:userId/:messageId', async (req, res) => {
  try {
    const { userId, messageId } = req.params;
    const message = await ChatMessage.findOneAndDelete({ _id: messageId, userId });
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});