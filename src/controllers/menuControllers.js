import {Context} from "telegraf";
import {renderProfileMenu} from "../components/profile-menu.js";
import {renderMainMenu} from "../components/main-menu.js";
import {renderUserCard} from "../components/user-card.js";
import {fetchUserById, fetchUser} from "../requests/requests.js";

export const mainMenuCtrl = async (ctx: Context) => await renderMainMenu(ctx);
export const profileMenuCtrl = async (ctx: Context, userId) => {
    const {ok, data} = userId ? await fetchUserById(ctx, userId) : await fetchUser(ctx)
    await renderUserCard(
        ctx,
        {
            id: data._id,
            name: data.name,
            telegramId: data.telegramId,
            gender: data.sex,
            birthday: data.birthday && new Date(data.birthday),
            about: data.about,
            lang: data.lang,
            rating: data.rating,
            services: data.services,
        });
    return await renderProfileMenu(ctx);
}
