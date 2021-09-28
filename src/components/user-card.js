import {Context} from "telegraf";
import {icons} from "../consts/icons.js";
import {renderClickableList} from "./clickable-list.js";
import {createAction} from "../utils/actions.js";
import {actions} from "../consts/actions.js";
import type {User} from "../utils/types";
import {_} from "../utils/translator/translator.js";
import {s} from "../utils/translator/strings.js";

export const renderUserCard = async (
        ctx: Context,
        data: User,
    ) => {
    const {contacts, photo} = icons;
    const {_id, telegramId, birthday, name, about='', lang, gender, rating} = data;
    const age = birthday ? new Date().getFullYear() - birthday.getDate() : null; 

    const buttons = [
        {title: `${photo} ${_(s.photos)}`, action: createAction(actions.photoGallery, [0, true, _id])},
        {title: `${contacts} ${_(s.send_message)}`, action: createAction(actions.contact, [_id])},
    ];

    return await renderClickableList(
        ctx,
        `${name}${gender?' '+gender:''}${age?` (${age} ${_(s.yo)})`:''}${lang?` ${_(s.language)} ${lang}`:''}\n${about}`,
        buttons,
    )
}
