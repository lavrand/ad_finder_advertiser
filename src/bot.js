// @flow
import dotenv from 'dotenv';
dotenv.config()

import {Context, Telegraf} from 'telegraf';
import {getAction, getMessageText} from "./utils/ctxHandlers.js"
import {getActionName, getActionParams} from "./utils/actions.js";
import {flowTypes} from "./consts/flow.js";
import {actions} from "./consts/actions.js";
import {renderMainMenu} from "./components/main-menu.js";
import {icons} from "./consts/icons.js";
import {QuestionManager} from "./components/input.js";
import {branchesCtrl} from "./controllers/branchControllers.js";
import {mainMenuCtrl, profileMenuCtrl} from "./controllers/menuControllers.js";
import {
    genderCtrl,
    aboutCtrl,
    setUserServiceCtrl,
    setGenderCtrl,
    addPhotoCtrl,
    userPhotoCtrl,
    photoGalleryCtrl,
    userBirthdayCtrl,
    deletePhotoCtrl,
    contactCtrl,
} from "./controllers/userControllers.js";
import {servicesCtrl} from "./controllers/serviceControllers.js";
import {logger} from "./utils/logger.js";
import {_, setLang} from "./utils/translator.js";
import {renderMessage} from "./components/message.js";
import {s} from "../local-data/strings.js";

export const env = process.env;
export const bot = new Telegraf(env.TOKEN);

const inputManager = QuestionManager.getInstance();

setLang();

bot.command('start', async (ctx: Context) =>  await renderMainMenu(ctx));

bot.hears(/.*/, async (ctx: Context) => {
    const {search, profile, ad, contacts, house, gender, man, woman, info, photo, birthday} = icons;
    const text = getMessageText(ctx);
    logger.log('HEAR:', text);

    // menu button handlers
    if (new RegExp(`^${search}.*`).test(text)) return await branchesCtrl(ctx, flowTypes.buy)
    if (new RegExp(`^${ad}.*`).test(text)) return await branchesCtrl(ctx, flowTypes.sell);
    if (new RegExp(`^${profile}.*`).test(text)) return await profileMenuCtrl(ctx);
    if (new RegExp(`^${house}.*`).test(text)) return await mainMenuCtrl(ctx);
    if (new RegExp(`^${gender}.*`).test(text)) return await genderCtrl(ctx)
    if (new RegExp(`^${info}.*`).test(text)) return await aboutCtrl(ctx);
    if (new RegExp(`^${photo}.*`).test(text)) return await userPhotoCtrl(ctx);
    if (new RegExp(`^${birthday}.*`).test(text)) return await userBirthdayCtrl(ctx);

    if (inputManager.handleQuestion(ctx)) return;
});

bot.action(/.*/, async (ctx: Context) => {
    const action = getAction(ctx);
    const actionName = getActionName(action);
    const actionParams = getActionParams(action);
    logger.log('ACTION:', actionName, actionParams);

    if (actionName === actions.services) return await servicesCtrl(ctx, actionParams);
    if (actionName === actions.selectService) return await setUserServiceCtrl(ctx, actionParams)
    if (actionName === actions.gender) return await setGenderCtrl(ctx, actionParams);
    if (actionName === actions.addPhotoList) return await addPhotoCtrl(ctx, actionParams);
    if (actionName === actions.photoGallery) return await photoGalleryCtrl(ctx, actionParams);
    if (actionName === actions.deletePhoto) return await deletePhotoCtrl(ctx, actionParams[0]);
    if (actionName === actions.userCard) return await contactCtrl(ctx, actionParams[0]);
    if (actionName === actions.profile) return await profileMenuCtrl (ctx, actionParams[0]);
});

bot.on('message', (ctx: Context) => {
    if (inputManager.handleQuestion(ctx)) return;
});

bot.launch().then(() => logger.log("Bot started.") ).catch(logger.log);

bot.catch(async (err, ctx: Context) => {
    logger.error({ctx, err});
    await renderMessage(ctx, _(s.unexpected_error), 'error');
})

process.on('unhandledRejection', (err: Error, promise: Promise<any>) => {
    logger.error({err});
});

process.on('uncaughtException', function(err) {
    logger.error({err});
});
