const getMessage = (ctx) => ctx.update?.message;
const getMessageText = (ctx) => getMessage(ctx)?.text;
const getMessageSender = (ctx) => getMessage(ctx)?.from;
const getMessageChat = (ctx) => getMessage(ctx)?.chat;

module.exports = {
    getMessage: getMessage,
    getMessageText: getMessageText,
    getMessageSender: getMessageSender,
    getMessageChat: getMessageChat,
}
