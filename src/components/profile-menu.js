import {Context, Markup} from "telegraf";
import {icons} from "../consts/icons.js";

export const renderProfileMenu = async (ctx: Context) => {
    const {ad, birthday, house, gender, info, photo, location} = icons;
    return await ctx.reply('Custom buttons keyboard', Markup
        .keyboard([
            [`${house} Go to main`, `${birthday} Birthday`],
            [`${photo} Photo`, `${gender} Gender`],
            [`${info} About`, Markup.button.locationRequest(`${location} Location`)],
            [`${ad} Services`]
        ])
        .oneTime()
        .resize()
    );
}
