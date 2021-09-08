import dotenv from 'dotenv';
dotenv.config()

import {Telegraf, Markup} from 'telegraf';
import mainKeyboard from './components/main-kayboard.js'
import {fetchBranches, fetchServices, fetchUser} from "./requests/requests.js"
import {getActionData, getMessageChat} from "./utils/ctxHandlers.js"
import {getMessageSender, getMessageText} from "./utils/ctxHandlers.js"
import {MenuTemplate, MenuMiddleware} from "telegraf-inline-menu"
import {_} from './translation/translation.js'

const env = process.env;
const bot = new Telegraf(env.TOKEN);

// const menuTemplate = new MenuTemplate(ctx => `Hey ${ctx.from.first_name}!`)
// const menuMiddleware = new MenuMiddleware('/', menuTemplate)

bot.command('start', async (ctx) => {
    return await ctx.reply('Custom buttons keyboard', Markup
        .keyboard([
            ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
            ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
            ['📢 Ads', '⭐️ Rate us', '👥 Share'] // Row3 with 3 buttons
        ])
        .oneTime()
        .resize()
    )
})

bot.hears('🔍 Search', async (ctx) => {
    const branches = await fetchBranches();
    const branchNames = branches.map(b => {
        return Markup.button.callback(b.name, `gotobranch-${b.id}`)
    });
    return await ctx.reply('Branches', Markup
        .inlineKeyboard(branchNames)
        .oneTime()
        .resize()
    )
})

bot.action(/gotobranch-.*/, async ctx => {
    const actionData = getActionData(ctx);
    console.log('actionData:', actionData);
    const branchId = getSecondPart(actionData);
    console.log('branchId:', branchId);
    const branches = await fetchServices(ctx, branchId);
    const branchNames = branches.map(b => {
        return Markup.button.callback(b.name, `gotobranch-${b.id}`)
    });
    console.log('branchNames:', branchNames);
    return await ctx.reply('Services', Markup
        .inlineKeyboard(branchNames)
        .oneTime()
        .resize()
    )
})

const getSecondPart = str => str.split('-')[1];

// bot.start((ctx) => {
//     ctx.reply('Welcome', mainKeyboard().reply());
// });
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

// bot.on('text', async (ctx) => {
//     //const user = await fetchUser(ctx);
//     const text = getMessageText(ctx);
//
//     switch (text) {
//         case 'Profile':
//             const user = await fetchUser(ctx);
//
//             break;
//         case 'Place':
//             // const branches = await fetchBranches();
//             // console.log(branches)
//             break;
//         case 'Find':
//             const branches = await fetchBranches();
//             console.log(typeof(branches))
//             const branchNames = branches.map(b=> b.name);
//
//             ctx.replyWithQuiz("Choose the category:", branchNames);
//             break;
//     }
//
//     ctx.reply('', mainKeyboard().reply());
// })

// bot.command('find', ctx => menuMiddleware.replyToContext(ctx))

bot.launch().then(() => console.log("Bot started.") ).catch(console.log);
