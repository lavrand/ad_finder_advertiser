import {Context} from "telegraf";
import type {User} from "../utils/types.js";
import {renderLinkList} from "./link-list.js";
import {getProfileSettings} from "../utils/tools.js";
import {renderClickableList} from "./clickable-list.js";
import {_} from "../utils/translator.js";
import {s} from "../../local-data/strings.js";
import {createAction} from "../utils/actions.js";
import {actions} from "../consts/actions.js";

export const renderSearchResult = async (
    ctx: Context,
    users: Array<User>,
    serviceId: string,
    cursor: number) => {

    const profileSettings = getProfileSettings();

    const buttons = users.map(user => ({
        title: `${user.name}`,
        action: createAction(actions.profile, [user._id])
    }));
    await renderClickableList(ctx, _(s.choose_user),  buttons);
    // TODO 'more' button
}
