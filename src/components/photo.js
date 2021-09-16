import {Context} from "telegraf";
import axios from "axios";
import {getUserId} from "../utils/ctxHandlers.js";

export const renderPhoto = async (ctx: Context, fileId) => {
    const fileUrl = await ctx.telegram.getFileLink(fileId);
    if (fileUrl) {
        return await ctx.replyWithPhoto({url: fileUrl.href});
    }
}
