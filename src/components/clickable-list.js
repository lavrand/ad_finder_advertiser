// @flow
import {Context, Markup} from "telegraf";

export const renderClickableList = async (ctx: Context, title: string, list: Array<{title: string, action: string}>) => {
    const render = list.map(item => Markup.button.callback(item.title, item.action));
    return ctx.reply(title, Markup.inlineKeyboard(render).oneTime().resize());
}
