import {Context} from "telegraf";
import type {User} from "../utils/types.js";
import {renderLinkList} from "./link-list.js";

export const renderSearchResult = async (
    ctx: Context,
    list: Array<User>,
    serviceId: string,
    cursor: number) => {
    const links = list.map(user => ({
        title: user.name,
        href: `tg://user?id=${user.telegramId}`
    }));
    await renderLinkList(ctx, links);
    // TODO 'more' button
}
