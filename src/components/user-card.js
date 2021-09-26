import {Context} from "telegraf";
import {icons} from "../consts/icons.js";
import {renderClickableList} from "./clickable-list.js";
import {createAction} from "../utils/actions.js";
import {actions} from "../consts/actions.js";
import type {User} from "../utils/types";

export const renderUserCard = async (
        ctx: Context,
        data: User,
    ) => {
    const {contacts, photo} = icons;
    const {id, telegramId, birthday, name, about='', lang, gender, rating} = data;
    const age = birthday ? new Date().getFullYear() - birthday.getDate() : null; 

    const buttons = [
        {title: `${photo} Photo(s)`, action: createAction(actions.photoGallery, [0, true, id])},
        {title: `${contacts} Send message`, action: createAction(actions.contact, [id])},
    ];

    return await renderClickableList(
        ctx,
        `${name}${gender?' '+gender:''}${age?` (${age}yo)`:''}${lang?` Lang ${lang}`:''}\n${about}`,
        buttons,
    )
}
