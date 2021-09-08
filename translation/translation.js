const translations = {
    "Profile": {ru: "Profile RU",},
}

let LANG = "ru"

const getLang = () => LANG
const setLang = (lang) => LANG = lang

const _ = (text) => translations[text]?.[LANG] || text;

exports._ = _
exports.getLang = getLang
exports.setLang = setLang
