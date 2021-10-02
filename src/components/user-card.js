import {Context} from "telegraf";
import {icons} from "../consts/icons.js";
import {renderClickableList} from "./clickable-list.js";
import {createAction} from "../utils/actions.js";
import {actions} from "../consts/actions.js";
import type {User} from "../utils/types";
import {_, getServiceTranslation} from "../utils/translator.js";
import {s} from "../../local-data/strings.js";
import {calculateAge, calculateDistance, getProfileSettings} from "../utils/tools.js";

export const renderUserCard = async (
        ctx: Context,
        data: User,
        isOwner: boolean,
    ) => {
    const {photo} = icons;
    const {_id, telegramId, birthday, name, about='', lang, sex} = data;
    const age = calculateAge(new Date(birthday));
    const buttons = [];

    const profileSettings = getProfileSettings();
    console.log('>>><<<', data)
    if (profileSettings.photo) buttons.push({
        title: `${photo} ${_(s.photos)}`,
        action: createAction(actions.photoGallery, [0, true, _id])
    });

    const services = data.services.map(s => getServiceTranslation(s)).join(', ');

    let html = `<b>${name}</b>${sex && profileSettings.gender ? '('+sex+')': ''}`;
    if (age && profileSettings.birthday) html += `\n(${age} ${_(s.yo)})`;
    if (lang) html +=  `\n${_(s.language)} ${lang}`;
    if (!isOwner) html += calculateDistance();
    if (services) html += `\n\n<b>Services:</b>\n${services}`;
    if (profileSettings.about && about) html += `\n\n${about}`;
    if (!isOwner) html += `\n\n<a href="tg://user?id=${telegramId}">Click here to contact</a>`;

    return await renderClickableList(
        ctx,
        html,
        buttons,
    );
}
