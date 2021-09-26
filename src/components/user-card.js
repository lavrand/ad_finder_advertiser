import {Context} from "telegraf";
import {icons} from "../consts/icons.js";
import {renderClickableList} from "./clickable-list.js";
import {createAction} from "../utils/actions.js";
import {actions} from "../consts/actions.js";

export const renderUserCard = async (
    ctx: Context,
    data: {
        id: string,
        telegramId: string,
        birthday?: Date,
        name: string,
        services: Array<string>,
        about?: string,
        lang?: string,
        gender?: string,
        rating: number,
        contacts: Array<string>,
    }) => {
    const {contacts, photo} = icons;
    const {id, telegramId, birthday, name, services, about='', lang, gender, rating} = data;
    const age = birthday ? new Date().getFullYear() - birthday.getDate() : null; 

    const buttons = [
        {title: `${photo} Photo(s)`, action: createAction(actions.photoGallery, [0, true, id])},
        {title: `${contacts} Save contact`, action: createAction(actions.addContact, [id])},
    ];

    return await renderClickableList(
        ctx,
        `${name}${gender?' '+gender:''}${age?` (${age}yo)`:''}${lang?` Lang ${lang}`:''}\n${about}`,
        buttons,
    )
}
