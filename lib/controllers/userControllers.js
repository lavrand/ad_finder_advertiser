import { Context } from "telegraf";
import { createAction } from "../utils/actions.js";
import { actions } from "../consts/actions.js";
import { questions } from "../consts/questions.js";
import { renderClickableList } from "../components/clickable-list.js";
import { renderInputQuestion } from "../components/input.js";
import { addServiceToUser, fetchUser, updateGender, updateUserAbout, updateUserPhoto } from "../requests/requests.js";
import { getMessageText, getPhoto, getUserId } from "../utils/ctxHandlers.js";
import { renderMessage } from "../components/message.js";
import { flowTypes } from "../consts/flow.js";
import { icons } from "../consts/icons.js";
import { renderPhotoGallery } from "../components/photoGallery.js";
export const genderCtrl = async ctx => {
  const {
    man,
    woman
  } = icons;
  const genders = [{
    title: `${man}`,
    action: createAction(actions.gender, ['male'])
  }, {
    title: `${woman}`,
    action: createAction(actions.gender, ['female'])
  }];
  return await renderClickableList(ctx, 'Please, choose you gender', genders);
};
export const aboutCtrl = async ctx => {
  return await renderInputQuestion(ctx, 'Please, write about your self couple of words', questions.info, async ctx => {
    const response = await updateUserAbout(ctx, getMessageText(ctx));
    return await renderMessage(ctx, response.ok ? 'Info saved' : `Error. ${response.data?.message}`, response.ok ? 'success' : 'error');
  });
};
export const userPhotoCtrl = async ctx => {
  return await renderClickableList(ctx, 'Choose operation', [{
    title: 'Add Photo',
    action: createAction(actions.addPhotoList, [])
  }, {
    title: 'Delete Photo',
    action: createAction(actions.removePhotoList, [])
  }]);
};
export const addPhotoCtrl = async ctx => {
  return await renderInputQuestion(ctx, 'Please, send photo', questions.photo, async ctx => {
    const photos = getPhoto(ctx);

    if (photos && photos.length > 0) {
      const {
        ok,
        data
      } = await updateUserPhoto(ctx, photos[photos.length - 1]);
      await renderMessage(ctx, ok ? 'Photo saved' : `Error. (${data?.message})`, ok ? 'success' : 'error');
    }
  });
};
export const photoGalleryCtrl = async (ctx, removable) => {
  const {
    ok,
    data
  } = await fetchUser(ctx);

  if (ok) {
    console.log(data.photos);
    const fileIds = data.photos.map(p => p.file_id);
    console.log(fileIds);
    return renderPhotoGallery(ctx, getUserId(ctx), fileIds, 0, removable);
  }
};
export const setServiceCtrl = async (ctx, actionParams) => {
  const [serviceId, flowType, postId] = actionParams;

  if (flowType === flowTypes.sell) {
    const {
      ok,
      data
    } = await addServiceToUser(ctx, serviceId);
    return await renderMessage(ctx, ok ? 'Service added' : `Error. Service was not added (${data?.message})`, ok ? 'success' : 'error');
  }
};
export const setGenderCtrl = async (ctx, actionParams) => {
  const [gender] = actionParams;
  const response = await updateGender(ctx, gender);
  return await renderMessage(ctx, response.ok ? 'Gender saved' : `Error. ${response.data?.message}`, response.ok ? 'success' : 'error');
};