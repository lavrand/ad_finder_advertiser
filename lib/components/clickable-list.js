import { Context, Markup } from "telegraf";
export const renderClickableList = async (ctx, title, list) => {
  const render = list.map(item => Markup.button.callback(item.title, item.action));
  return ctx.reply(title, Markup.inlineKeyboard(render).oneTime().resize());
};