import Context from "telegraf";

export const getMessage = (ctx: Context) => ctx.update?.message;
export const getCallbackQuery = (ctx: Context) => ctx.update?.callback_query;
export const getMessageText = (ctx: Context) => getMessage(ctx)?.text;
export const getMessageSender = (ctx: Context) => getMessage(ctx)?.from || getCallbackQuery(ctx)?.from;
export const getMessageSenderId = (ctx: Context) => getMessageSender(ctx)?.id;
export const getMessageChat = (ctx: Context) => getMessage(ctx)?.chat;
export const getAction = (ctx: Context) => ctx.update?.callback_query?.data;
export const getUserId = (ctx: Context) => getMessage(ctx)?.from?.id || getCallbackQuery(ctx)?.from?.id;
export const getPhoto = (ctx: Context) => getMessage(ctx)?.photo;
export const getMessageSenderFirstName = (ctx: Context) => getMessageSender(ctx)?.first_name;
export const getMessageSenderUsername = (ctx: Context) => getMessageSender(ctx)?.username;
export const getMessageSenderLang = (ctx: Context) => getMessageSender(ctx)?.language_code;
export const getMessageLocation = (ctx: Context) => { return { type: "Point", coordinates: {latitude: getMessage(ctx)?.location?.latitude, longitude: getMessage(ctx)?.location?.longitude}}}