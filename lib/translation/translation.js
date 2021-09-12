const translations = {// "Profile": {ru: "Profile RU",},
};
let LANG = "ru";
export const getLang = () => LANG;
export const setLang = lang => LANG = lang;
export const _ = text => translations[text]?.[LANG] || text; // exports._ = _
// exports.getLang = getLang
// exports.setLang = setLang