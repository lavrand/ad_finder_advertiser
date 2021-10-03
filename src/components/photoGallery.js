import {Context} from "telegraf";
import {renderPhoto} from "./photo.js";
import {renderClickableList} from "./clickable-list.js";
import {createAction} from "../utils/actions.js";
import {actions} from "../consts/actions.js";
import {_} from "../utils/translator.js";
import {s} from "../../local-data/strings.js";
import {renderMessage} from "./message.js";

export const renderPhotoGallery = async (
    ctx: Context,
    userId: string,
    files: Array<{
        file_id: string,
        file_unique_id: string,
        file_size: number,
        width: number,
        height: number,
        deleted: boolean,
    }>,
    currentIndex: number=0,
    removable: boolean=false,
) => {
    const fileId = files[+currentIndex]?.file_id;
    if (!fileId) return await renderMessage(ctx, _(s.no_photos));
    const fileUniqueId = files[+currentIndex].file_unique_id;
    const showPrevButton = currentIndex > 0;
    const showNextButton = currentIndex < files.length - 1;

    const buttons = [];
    if (showPrevButton) buttons.push({
        title: _(s.prev),
        action: createAction(actions.photoGallery, [+currentIndex - 1, removable, userId])
    });
    if (removable) buttons.push({
        title: _(s.delete),
        action: createAction(actions.deletePhoto, [fileUniqueId])
    })
    if (showNextButton) buttons.push({
        title: _(s.next),
        action: createAction(actions.photoGallery, [+currentIndex + 1, removable, userId])
    });
    await renderPhoto(ctx, fileId);
    return await renderClickableList(ctx, _(s.delete_photo_info), buttons)
}
