require('dotenv').config();

const {Telegraf} = require('telegraf');
const { Keyboard } = require('telegram-keyboard');
const env = process.env;

const bot = new Telegraf(env.TOKEN);

bot.start((ctx) => ctx.reply('Welcome'));
// bot.help((ctx) => ctx.reply('Send me a sticker'));
// bot.on('sticker', (ctx) => ctx.reply('👍'));
// bot.hears('hi', (ctx) => ctx.reply('Hey there'));

bot.on('text', async (ctx) => {
    const keyboard = Keyboard.make([
        ['Профиль', 'Разместить'], // First row
        ['Найти', 'Геолокация'], // Second row
    ]);

    try {
        const q = await ctx.reply('Simple built-in keyboard', keyboard.reply());
        //const e = await ctx.reply('Simple inline keyboard', keyboard.inline());
    } catch (e) {
        console.log(e);
    }
})

bot.launch().then(() => console.log("Bot started.") ).catch(console.log);