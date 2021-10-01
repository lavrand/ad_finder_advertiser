import {Markup} from "telegraf";
import {icons} from "../consts/icons.js";
import {_} from "../utils/translator.js"
import {s} from "../../local-data/strings.js";

export const renderMainMenu = async (ctx) => {
    const {search, profile} = icons;
    return await ctx.reply(_(s.main_menu_info), Markup
        .keyboard([
            [`${search} ${_(s.search)}`, `${profile} ${_(s.profile)}`],
        ])
        .oneTime()
        .resize()
    )
}
