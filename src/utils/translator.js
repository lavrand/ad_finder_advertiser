let LANG = 'ru';

export const setLang = (lang: 'en'|'ru') => LANG = lang;

export const getLang = () => LANG;

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const _ = (string, ...args) => {
    let text = string[getLang()] || string.en;
    return capitalizeFirstLetter(text);
};
