export const getMessage = (ctx) => ctx.update?.message;
export const getMessageText = (ctx) => getMessage(ctx)?.text;
export const getMessageSender = (ctx) => getMessage(ctx)?.from;
export const getMessageSenderId = (ctx) => getMessageSender(ctx)?.id;
export const getMessageChat = (ctx) => getMessage(ctx)?.chat;
export const getActionData = (ctx) => ctx.update?.callback_query?.data;

