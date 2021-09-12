import { Context } from "telegraf";
import { renderProfileMenu } from "../components/profile-menu.js";
import { renderMainMenu } from "../components/main-menu.js";
export const mainMenuCtrl = async ctx => await renderMainMenu(ctx);
export const profileMenuCtrl = async ctx => await renderProfileMenu(ctx);