import {env} from "../bot.js";
import {logger} from "./logger.js";

export const getProfileSettings = () => {
    const envSettings = JSON.parse(env.PROFILE_SETTINGS || '{}');
    return {
        birthday: true,
        photo: true,
        gender: true,
        about: true,
        location: true,
        ...envSettings,
    }
}

export const calculateDistance = (
    locationFirst: { lat: number, lng: number },
    locationSecond: { lat: number, lng: number },
) => {
    // TODO
    return '10 km';
}

export const calculateAge = (birthday: Date) => birthday ? new Date().getFullYear() - birthday.getDate() : null;

export const loggerDecorator = (handler) => {
    return function (...args) {
        try {
            handler(...args);
        } catch (err) {
            logger.error({err, ...args});
        }
    }
}
