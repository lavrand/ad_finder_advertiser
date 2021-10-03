import type {Branch, Service} from "./types.js";
import {env} from "../bot.js";

let LANG;

export const setLang = (lang?: string) => {
    LANG = env.PREF_LANG;
    if (lang && lang.match(/.*en.*/)) LANG = 'en';
}

export const getLang = () => LANG;

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const _ = (string, ...args) => {
    let text = string[getLang()] || string.en;
    return capitalizeFirstLetter(text);
};

export const getBranchTranslation = (branch: Branch) => branch.translates?.[getLang()] || branch.name;

export const getServiceTranslation = (service: Service) => service.translates?.[getLang()] || service.name;
