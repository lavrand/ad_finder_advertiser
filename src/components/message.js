import Context, {Markup} from "telegraf";
import {icons} from "../consts/icons.js";

export const renderMessage = async (ctx: Context, text?: string, type: 'success'|'error'|'warning'|'info'='info') => {
    let sign;
    switch (type) {
        case 'success':
            sign = icons.success + ' ';
            break;
        case 'warning':
            sign = icons.warning + ' ';
            break;
        case 'error':
            sign = icons.error + ' ';
            break;
        default:
            sign = '';
    }
    return ctx.reply(`${sign}${text}`);
}
