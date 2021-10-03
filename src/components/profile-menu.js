import {Context, Markup} from "telegraf";
import {icons} from "../consts/icons.js";
import {_} from "../utils/translator.js";
import {s} from "../../local-data/strings.js";
import {getProfileSettings} from "../utils/tools.js";

const addButton = (buttons: Array<string>, btn: string) => {
    buttons = [...buttons];
    if (buttons[buttons.length - 1].length < 2) {
        buttons[buttons.length - 1].push(btn);
    } else {
        buttons.push([btn]);
    }
    return buttons;
}

export const renderProfileMenu = async (ctx: Context, isOwner: boolean) => {
    const {ad, birthday, house, gender, info, photo, location} = icons;
    const settings = getProfileSettings();
    let buttons = [[`${house} ${_(s.go_to_main_menu)}`]];
    if (settings.birthday) buttons = addButton(buttons, `${birthday} ${_(s.birthday)}`);
    if (settings.photo) buttons = addButton(buttons, `${photo} ${_(s.photo)}`);
    if (settings.gender) buttons = addButton(buttons, `${gender} ${_(s.gender)}`);
    if (settings.about) buttons = addButton(buttons, `${info} ${_(s.about)}`);
    if (settings.location) buttons = addButton(buttons, `${location} ${_(s.location)}`);
    buttons = addButton(buttons, `${ad} ${_(s.services)}`);

    return await ctx.reply(_(s.profile_menu_info), Markup
        .keyboard(buttons)
        .oneTime()
        .resize()
    );
}
