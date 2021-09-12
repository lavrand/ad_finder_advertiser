import { Context } from "telegraf";
import { createAction } from "../utils/actions.js";
import { actions } from "../consts/actions.js";
import { questions } from "../consts/questions.js";
import { renderClickableList } from "../components/clickable-list.js";
import { renderInputQuestion } from "../components/input.js";
import { addServiceToUser, fetchUser, updateGender, updateUserAbout } from "../requests/requests.js";
import { getMessageText, getPhoto } from "../utils/ctxHandlers.js";
import { renderMessage } from "../components/message.js";
import { flowTypes } from "../consts/flow.js";
import { updateUserPhoto } from "../../lib/requests/requests.js";
import { icons } from "../consts/icons.js";
import { renderPhoto } from "../components/photo.js";
import { logger } from "../utils/logger.js";
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
export const removePhotoCtrl = async ctx => {
  const {
    ok,
    data
  } = await fetchUser(ctx);

  if (ok) {
    const photo = data.photos?.[0];

    if (photo) {
      await renderPhoto(ctx, photo.file_id);
    }
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