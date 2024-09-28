const { Telegraf, Markup } = require('telegraf');
const express = require('express');

// Create an Express application
const app = express();

// Initialize the bot with the token from environment variables
const bot = new Telegraf('7481052156:AAH_-d-3QsY_09onksLB2Ik56hSE0UH6DYc');

// Define the '/start' command handler with buttons
bot.start((ctx) => {
  const firstName = ctx.message.from.first_name;

  ctx.reply(
    `Hello ${firstName}, choose an option:`,
    Markup.inlineKeyboard([
      [Markup.button.url('Alpha Link Changer', 'https://t.me/PW_Link_Changer_Alpha_Bot/AlphaLinkChanger')],
      [Markup.button.callback('Get Chat ID with Secret Code', 'get_chat_id_with_secret')]
    ])
  );
});

// Handle the button callback for 'Get Chat ID with Secret Code'
bot.action('get_chat_id_with_secret', (ctx) => {
  const userId = ctx.from.id;
  const firstName = ctx.from.first_name;

  // Generate a random secret code (or retrieve one from your database)
  const secretCode = Math.random().toString(36).substring(2, 10);

  // Reply with the user's chat ID and secret code
  ctx.reply(`Hello ${firstName}, your Chat ID is: ${userId} and your secret code is: ${secretCode}`);
  
  // Optionally log the information to the server
  console.log(`User ID: ${userId}, Secret Code: ${secretCode}`);
});

// Define the '/bulk' command handler to get chat ID with secret code
bot.command('bulk', (ctx) => {
  const userId = ctx.message.from.id;
  const firstName = ctx.message.from.first_name;

  // Generate a random secret code (or retrieve one from your database)
  const secretCode = Math.random().toString(36).substring(2, 10);

  // Reply with the chat ID and secret code
  ctx.reply(`Bulk Info:\nChat ID: ${userId}\nSecret Code: ${secretCode}`);

  // Optionally log the information to the server
  console.log(`User ID: ${userId}, Secret Code: ${secretCode}`);
});

// Define the '/get_secret_id' command handler to get chat ID and secret identifier
bot.command('get_secret_id', (ctx) => {
  const userId = ctx.message.from.id;
  const firstName = ctx.message.from.first_name;

  // You can define secret identifiers in a more complex way (e.g., using a database)
  const secretIdentifier = `secret-${userId}`;

  // Reply with the user's chat ID and secret identifier
  ctx.reply(`Hello ${firstName}, your Chat ID is: ${userId} and your Secret ID is: ${secretIdentifier}`);
  
  // Optionally log the information to the server
  console.log(`User ID: ${userId}, Secret Identifier: ${secretIdentifier}`);
});

// Setup webhook for the bot
app.use(bot.webhookCallback('/secret-path'));

// Configure the webhook URL for Telegram
bot.telegram.setWebhook('https://your-vercel-app-url.vercel.app/secret-path');

// Add a basic route to check the server status
app.get('/', (req, res) => {
  res.send('Telegram bot is running.');
});

// Export the Express application to be used by Vercel
module.exports = app;
