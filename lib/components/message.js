import Context, { Markup } from "telegraf";
import { icons } from "../consts/icons.js";
export const renderMessage = async (ctx, text, type = 'info') => {
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
};