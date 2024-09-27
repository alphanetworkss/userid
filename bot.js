// bot.js
const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot token
const token = '8091506627:AAHeIq1OYtr21N7poCnLgFm7zsQH04dT1ZY';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Listen for the /get_secret_id command
bot.onText(/\/get_secret_id/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id; // Get user ID

    // Send the user ID back to the user in monospace format
    bot.sendMessage(chatId, `Your secret user ID is: \`${userId}\``, { parse_mode: 'MarkdownV2' });
});
