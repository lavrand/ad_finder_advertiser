require('dotenv').config();

const {Telegraf} = require('telegraf');
const mainKeyboard = require('./components/main-kayboard');
const {getMessageChat} = require("./utils/ctxHandlers");
const {getMessageSender, getMessageText} = require("./utils/ctxHandlers");
const env = process.env;
const {_} = require('./translation/translation')

const bot = new Telegraf(env.TOKEN);

bot.start((ctx) => {
    ctx.reply('Welcome', mainKeyboard().reply());
});
// bot.help((ctx) => ctx.reply('Send me a sticker'));
// bot.on('sticker', (ctx) => ctx.reply('👍'));
// bot.hears('hi', (ctx) => ctx.reply('Hey there'));

bot.on('text', async (ctx) => {
    console.log(ctx)
    console.log(getMessageText(ctx))
    console.log(getMessageSender(ctx))
    console.log(getMessageChat(ctx))
    ctx.reply('Simple built-in keyboard', mainKeyboard().reply());
})

bot.launch().then(() => console.log("Bot started.") ).catch(console.log);
