import {Context} from "telegraf";
import {renderProfileMenu} from "../components/profile-menu.js";
import {renderMainMenu} from "../components/main-menu.js";
import {renderUserCard} from "../components/user-card.js";
import {fetchUserById, fetchUser} from "../requests/requests.js";

export const mainMenuCtrl = async (ctx: Context) => await renderMainMenu(ctx);
export const profileMenuCtrl = async (ctx: Context, userId: string) => {
    const {ok, data} = userId ? await fetchUserById(ctx, userId) : await fetchUser(ctx)
    const isOwner = !userId;

    await renderUserCard(
        ctx,
        data,
        isOwner
    );
    if (isOwner) {
        await renderProfileMenu(ctx, !!userId);
    }
}
