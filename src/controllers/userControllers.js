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
    deleteUserPhoto, removeServiceFromUser, addContact
} from "../requests/requests.js";
import {getMessageText, getPhoto, getUserId} from "../utils/ctxHandlers.js";
import {renderMessage} from "../components/message.js";
import {flowTypes} from "../consts/flow.js";
import {icons} from "../consts/icons.js";
import {renderPhotoGallery} from "../components/photoGallery.js";
import {REMOVE} from "../consts/req_actions.js";

export const genderCtrl = async (ctx: Context) => {
    const {man, woman} = icons;
    const genders = [
        {title: `${man}`, action: createAction(actions.gender, ['male'])},
        {title: `${woman}`, action: createAction(actions.gender, ['female'])},
    ];
    return await renderClickableList(ctx, 'Please, choose you gender', genders);
}

export const aboutCtrl = async (ctx: Context) => {
    return await renderInputQuestion(
        ctx,
        'Please, write about your self couple of words',
        questions.info,
        async (ctx) => {
            const response = await updateUserAbout(ctx, getMessageText(ctx));
            return await renderMessage(
                ctx,
                response.ok ? 'Info saved' : `Error. ${response.data?.message}`,
                response.ok ? 'success' : 'error'
            );
        });
}

export const userPhotoCtrl = async (ctx: Context) => {
    return await renderClickableList(ctx, 'Choose operation', [
        {title: 'Add Photo', action: createAction(actions.addPhotoList, [])},
        {title: 'Delete Photo', action: createAction(actions.photoGallery, [0])},
    ])
}

export const deletePhotoCtrl = async (ctx: Context, fileId) => {
    const {ok, data} = await deleteUserPhoto(ctx, fileId);
    return await renderMessage(
        ctx,
        ok ? 'Photo deleted' : 'Error',
        ok ? 'success' : 'error',
    );
}

export const addPhotoCtrl = async (ctx: Context) => {
    return await renderInputQuestion(
        ctx,
        'Please, send photo',
        questions.photo,
        async ctx => {
            const photos = getPhoto(ctx);
            if (photos && photos.length > 0) {
                const {ok, data} = await updateUserPhoto(ctx, photos[photos.length - 1]);
                await renderMessage(ctx, ok ? 'Photo saved' : `Error. (${data?.message})`, ok ? 'success' : 'error');
            }
        });
}

export const photoGalleryCtrl = async (ctx: Context, index: number=0, removable: boolean, userId?: string) => {
    const {ok, data} = await fetchUserPhotos(ctx, userId || getUserId(ctx));
    if (ok) {
        return renderPhotoGallery(ctx, getUserId(ctx), data.photos, index, removable);
    }
}

export const setUserServiceCtrl = async (ctx: Context, actionParams: Array) => {
    const [serviceId, flowType, REQ_ACTION] = actionParams;
    if (flowType === flowTypes.sell) {
        const {ok, data} = REQ_ACTION === REMOVE ? await removeServiceFromUser(ctx, serviceId) : await addServiceToUser(ctx, serviceId);
        return await renderMessage(
            ctx,
            ok ? `Service ${REQ_ACTION === REMOVE ? 'removed' : 'added'}` : `Error. ${data?.message}`,
            ok ? 'success' : 'error',
        );
    }
}

export const setGenderCtrl = async (ctx: Context, actionParams: Array) => {
    const [gender] = actionParams;
    const response = await updateGender(ctx, gender);
    return await renderMessage(
        ctx,
        response.ok ? 'Gender saved' : `Error. ${response.data?.message}`,
        response.ok ? 'success' : 'error'
    );
}

export const userBirthdayCtrl = async (ctx: Context) => {
    return await renderInputQuestion(
        ctx,
        'Please, enter your birthday in requested format YYYY-MM-DD (for example 2016-05-18):',
        questions.info,
        async (ctx) => {
            const response = await updateUserBirthday(ctx, getMessageText(ctx))
            return await renderMessage(
                ctx,
                response.ok ? 'Info saved' : `Error. ${response.data?.message}`,
                response.ok ? 'success' : 'error'
            );
        });
}

export const contactCtrl = async (ctx: Context, userId) => {
    const {ok, data} = await addContact(ctx, userId);

    return await renderMessage(
        ctx,
        ok ? 'Contact added' : `Error. ${data?.message || data}`,
        ok ? 'success' : 'error'
    );
}
