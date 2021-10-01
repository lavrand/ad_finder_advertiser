import {Context} from "telegraf";
import {icons} from "../consts/icons.js";
import {renderClickableList} from "./clickable-list.js";
import {createAction} from "../utils/actions.js";
import {actions} from "../consts/actions.js";
import type {User} from "../utils/types";
import {_} from "../utils/translator.js";
import {s} from "../../strings.js";
import {calculateAge, calculateDistance, getProfileSettings} from "../utils/tools.js";

export const renderUserCard = async (
        ctx: Context,
        data: User,
        isOwner: boolean,
    ) => {
    const {photo} = icons;
    const {_id, telegramId, birthday, name, about='', lang, gender, rating} = data;
    const age = calculateAge(birthday);

    const buttons = [];

    const profileSettings = getProfileSettings();
    if (profileSettings.photo) buttons.push({
        title: `${photo} ${_(s.photos)}`,
        action: createAction(actions.photoGallery, [0, true, _id])
    });

    return await renderClickableList(
        ctx,
        `
<b>${name}</b>${gender && profileSettings.gender ? '('+gender+')':''}
${age && profileSettings.birthday ?` (${age} ${_(s.yo)})`:''}${lang?` ${_(s.language)} ${lang}`:''}
${!isOwner ? calculateDistance() : ''}
${profileSettings.about ? about:''}
<a href="tg://user?id=${telegramId}">Click here to contact</a>
        `,
        buttons,
    )
}
