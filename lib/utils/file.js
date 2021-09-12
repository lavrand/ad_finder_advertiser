import axios from"axios";import*as fs from"fs";import{Context}from"telegraf";// export const saveFile = (ctx: Context, fileId: string) => {
//     ctx.telegram.getFileLink(fileId).then(url => {
//         axios({url, responseType: 'stream'}).then(response => {
//             return new Promise((resolve, reject) => {
//                 response.data.pipe(fs.createWriteStream(`${config.basePath}/public/images/profiles/${ctx.update.message.from.id}.jpg`))
//                     .on('finish', () => /* File is saved. */)
//                     .on('error', e => /* An error has occured */)
//             });
//         })
//     })
// }