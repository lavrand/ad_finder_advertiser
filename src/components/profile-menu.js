import {Context, Markup} from "telegraf";
import {icons} from "../consts/icons.js";
import {_} from "../utils/translator/translator.js";
import {s} from "../utils/translator/strings.js";

export const renderProfileMenu = async (ctx: Context) => {
    const {ad, birthday, house, gender, info, photo, location} = icons;
    return await ctx.reply(_(s.profile_menu_info), Markup
        .keyboard([
            [`${house} ${_(s.go_to_main_menu)}`, `${birthday} ${_(s.birthday)}`],
            [`${photo} ${_(s.photo)}`, `${gender} ${_(s.gender)}`],
            [`${info} ${_(s.about)}`, `${location} ${_(s.location)}`],
            [`${ad} ${_(s.services)}`]
        ])
        .oneTime()
        .resize()
    );
}
