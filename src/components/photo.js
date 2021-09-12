import {Context} from "telegraf";
import axios from "axios";
import {getUserId} from "../utils/ctxHandlers.js";

export const renderPhoto = async (ctx: Context, fileId) => {
    const fileUrl = await ctx.telegram.getFileLink(fileId);
    console.log('>>>>>>>>>>>>>>>>>>>>', fileUrl);
    if (fileUrl) {
        return await ctx.replyWithPhoto({url: fileUrl.href});
    }
    // return axios({fileUrl, responseType: 'stream'}).then(response => {
    //     return new Promise((resolve, reject) => {
    //         response.data.pipe(fs.createWriteStream(`${config.basePath}/public/images/profiles/${ctx.update.message.from.id}.jpg`))
    //             .on('finish', () => /* File is saved. */)
    //             .on('error', e => /* An error has occured */)
    //     });
    // })
}
