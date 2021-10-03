import {Context} from "telegraf";
import {createAction} from "../utils/actions.js";
import {actions} from "../consts/actions.js";
import {questions} from "../consts/questions.js";
import {renderClickableList} from "../components/clickable-list.js";
import {renderInputQuestion} from "../components/input.js";
import {
    addServiceToUser,
    updateGender,
    updateUserAbout,
    updateUserBirthday,
    updateUserPhoto,
    fetchUserPhotos,
    deleteUserPhoto,
    updateUserLocation,
    removeServiceFromUser,
    searchService,
} from "../requests/requests.js";
import {getMessageText, getPhoto, getUserTelegramId} from "../utils/ctxHandlers.js";
import {renderMessage} from "../components/message.js";
import {flowTypes} from "../consts/flow.js";
import {icons} from "../consts/icons.js";
import {renderPhotoGallery} from "../components/photoGallery.js";
import {REMOVE} from "../consts/req_actions.js";
import {renderSearchResult} from "../components/search-results.js";
import {gender} from "../consts/genders.js";
import {_} from "../utils/translator.js";
import {s} from "../../local-data/strings.js";

export const genderCtrl = async (ctx: Context) => {
    const {man, woman} = icons;
    const genders = [
        {title: `${man}`, action: createAction(actions.gender, [gender.male])},
        {title: `${woman}`, action: createAction(actions.gender, [gender.female])},
    ];
    return await renderClickableList(ctx, _(s.gender_question), genders);
}

export const aboutCtrl = async (ctx: Context) => {
    return await renderInputQuestion(
        ctx,
        _(s.about_question),
        questions.info,
        async (ctx) => {
            const response = await updateUserAbout(ctx, getMessageText(ctx));
            return await renderMessage(
                ctx,
                response.ok ? _(s.success) : `${_(s.error)}. ${response.data?.message}`,
                response.ok ? 'success' : 'error'
            );
        });
}

export const userPhotoCtrl = async (ctx: Context) => {
    return await renderClickableList(ctx, _(s.choose_action), [
        {title: _(s.add_photo), action: createAction(actions.addPhotoList, [])},
        {title: _(s.delete_photo), action: createAction(actions.photoGallery, [0])},
    ])
}

export const deletePhotoCtrl = async (ctx: Context, fileId) => {
    const {ok, data} = await deleteUserPhoto(ctx, fileId);
    return await renderMessage(
        ctx,
        ok ? _(s.photo_deleted) : _(s.error),
        ok ? 'success' : 'error',
    );
}

export const addPhotoCtrl = async (ctx: Context) => {
    return await renderInputQuestion(
        ctx,
        _(s.photo_question),
        questions.photo,
        async ctx => {
            const photos = getPhoto(ctx);
            if (photos && photos.length > 0) {
                const {ok, data} = await updateUserPhoto(ctx, photos[photos.length - 1]);
                await renderMessage(
                    ctx,
                    ok ? _(s.photo_saved) : `${_(s.error)}. (${data?.message})`,
                    ok ? 'success' : 'error'
                );
            }
        });
}

export const photoGalleryCtrl = async (ctx: Context, actionParams: Array) => {
    let [index, removable, userId] = actionParams;
    const {ok, data} = await fetchUserPhotos(ctx, userId);
    if (ok) {
        return renderPhotoGallery(ctx, userId, data.photos, index, removable);
    }
}

export const setUserServiceCtrl = async (ctx: Context, actionParams: Array) => {
    const [serviceId, flowType, REQ_ACTION] = actionParams;
    if (flowType === flowTypes.sell) {
        const {ok, data} = REQ_ACTION === REMOVE ? await removeServiceFromUser(ctx, serviceId) : await addServiceToUser(ctx, serviceId);
        return await renderMessage(
            ctx,
            ok ? `${REQ_ACTION === REMOVE ? _(s.service_deleted) : _(s.service_added)}` : `${_(s.error)}. ${data?.message}`,
            ok ? 'success' : 'error',
        );
    }
    if (flowType === flowTypes.buy) {
        const {ok, data} = await searchService(ctx,serviceId);
        if (ok) {
            return await renderSearchResult(ctx, data.users);
        } else {
            return await renderMessage(ctx, _(s.error), 'error')
        }
    }
}

export const setGenderCtrl = async (ctx: Context, actionParams: Array) => {
    const [gender] = actionParams;
    const response = await updateGender(ctx, gender);
    return await renderMessage(
        ctx,
        response.ok ? _(s.gender_saved) : `${_(s.error)}. ${response.data?.message}`,
        response.ok ? 'success' : 'error'
    );
}

export const userBirthdayCtrl = async (ctx: Context) => {
    return await renderInputQuestion(
        ctx,
        _(s.gender_question),
        questions.info,
        async (ctx) => {
            const response = await updateUserBirthday(ctx, getMessageText(ctx))
            return await renderMessage(
                ctx,
                response.ok ? _(s.success) : `${_(s.error)}. ${response.data?.message}`,
                response.ok ? 'success' : 'error'
            );
        });
}

export const userLocationCtrl = async (ctx: Context) => {
    const response = await updateUserLocation(ctx, getPointLocation(ctx))
    return await renderMessage(
        ctx,
        response.ok ? 'Location updated' : `Error. ${response.data?.message}`,
        response.ok ? 'success' : 'error'
    );
}

export const contactCtrl = async (ctx: Context, telegramId: string) => {
    return await ctx.replyWithHTML(
        `<a href="tg://user?id=${telegramId}">telegramId</a>`)
    // return await renderMessage(ctx, `<a href="tg://user?id=${telegramId}">Link</a>`);
}

