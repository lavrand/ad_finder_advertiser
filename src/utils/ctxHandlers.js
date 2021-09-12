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

