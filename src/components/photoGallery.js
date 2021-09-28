import {Context} from "telegraf";
import {renderPhoto} from "./photo.js";
import {renderClickableList} from "./clickable-list.js";
import {createAction} from "../utils/actions.js";
import {actions} from "../consts/actions.js";
import {_} from "../utils/translator/translator.js";
import {s} from "../utils/translator/strings.js";

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
    const fileId = files[+currentIndex].file_id;
    const fileUniqueId = files[+currentIndex].file_unique_id;
    const showPrevButton = currentIndex > 0;
    const showNextButton = currentIndex < files.length - 1;

    const buttons = [];
    if (showPrevButton) buttons.push({
        title: _(s.delete),
        action: createAction(actions.photoGallery, [+currentIndex - 1])
    });
    if (removable) buttons.push({
        title: _(s.delete),
        action: createAction(actions.deletePhoto, [fileUniqueId])
    })
    if (showNextButton) buttons.push({
        title: _(s.next),
        action: createAction(actions.photoGallery, [+currentIndex + 1])
    });
    await renderPhoto(ctx, fileId);
    return await renderClickableList(ctx, _(s.delete_photo_info), buttons)
}
