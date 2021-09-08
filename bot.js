import dotenv from 'dotenv';
dotenv.config()

import {Telegraf} from 'telegraf';
import mainKeyboard from './components/main-kayboard.js'
import {fetchBranches, fetchUser} from "./requests/requests.js"
import {getMessageChat} from "./utils/ctxHandlers.js"
import {getMessageSender, getMessageText} from "./utils/ctxHandlers.js"
import {MenuTemplate, MenuMiddleware} from "telegraf-inline-menu"
import {_} from './translation/translation.js'

const env = process.env;
const bot = new Telegraf(env.TOKEN);

const menuTemplate = new MenuTemplate(ctx => `Hey ${ctx.from.first_name}!`)
const menuMiddleware = new MenuMiddleware('/', menuTemplate)


bot.start((ctx) => {
    ctx.reply('Welcome', mainKeyboard().reply());
});
// bot.help((ctx) => ctx.reply('Send me a sticker'));
// bot.on('sticker', (ctx) => ctx.reply('👍'));
// bot.hears('hi', (ctx) => ctx.reply('Hey there'));

// bot.command('start', ctx => menuMiddleware.replyToContext(ctx))
// bot.use(menuMiddleware)

// bot.use((ctx, next) => {
//     if (ctx.callbackQuery) {
//         console.log('callback data just happened', ctx.callbackQuery.data)
//     }
//
//     return next()
// })

bot.on('text', async (ctx) => {
    const user = await fetchUser(ctx);
    const text = getMessageText(ctx);

    switch (text) {
        case 'Profile':
            const user = await fetchUser(ctx);

            break;
        case 'Place':
            // const branches = await fetchBranches();
            // console.log(branches)
            break;
        case 'Find':

            break;
    }

    ctx.reply('', mainKeyboard().reply());
})


bot.launch().then(() => console.log("Bot started.") ).catch(console.log);
