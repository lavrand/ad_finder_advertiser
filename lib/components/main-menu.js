import { Markup } from "telegraf";
import { icons } from "../consts/icons.js";
export const renderMainMenu = async ctx => {
  const {
    search,
    profile,
    ad,
    contacts
  } = icons;
  return await ctx.reply('Custom buttons keyboard', Markup.keyboard([[`${search} Search`, `${contacts} Contacts`], [`${profile} Profile`]]).oneTime().resize());
};