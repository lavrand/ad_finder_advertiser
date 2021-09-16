import { Context } from "telegraf";
import { renderPhoto } from "./photo.js";
import { renderClickableList } from "./clickable-list.js";
import { createAction } from "../utils/actions.js";
import { actions } from "../consts/actions.js";
import { getUserId } from "../utils/ctxHandlers.js";
export const renderPhotoGallery = async (ctx, userId, fileIds, currentIndex = 0, removable = false) => {
  const fileId = fileIds[currentIndex];
  const showPrevButton = currentIndex > 0;
  const showNextButton = currentIndex < fileIds.length - 1;
  const buttons = [];
  if (showPrevButton) buttons.push({
    title: 'Prev',
    action: createAction(actions.photoGallery, [currentIndex - 1])
  });
  if (removable) buttons.push({
    title: 'Delete',
    action: createAction(actions.deletePhoto, [currentIndex])
  });
  if (showNextButton) buttons.push({
    title: 'Prev',
    action: createAction(actions.photoGallery, [currentIndex + 1])
  });
  console.log('>>>>>>>');
  console.log(buttons);
  console.log('>>>>>>> END');
  await renderPhoto(ctx, fileId);
  return await renderClickableList(ctx, 'Choose photo to delete', buttons);
};