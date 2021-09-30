// @flow
import {Context, Markup} from "telegraf";

export const renderClickableList = async (
    ctx: Context,
    title: string,
    list: Array<{title: string, action: string}>,
    chunkSize: number=2,
) => {
    const render = list.map(item => Markup.button.callback(item.title, item.action));

    const result = [];
    for (let i = 0, j = render.length; i < j; i += chunkSize) {
        result.push(render.slice(i, i + chunkSize));
    }

    return ctx.reply(title, Markup.inlineKeyboard(result).oneTime().resize());
}
