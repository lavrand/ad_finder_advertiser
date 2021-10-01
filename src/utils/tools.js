import {env} from "../bot.js";

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
