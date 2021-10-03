import {env} from "../bot.js";
import {logger} from "./logger.js";
import {Context} from "telegraf";
import {sendRequest} from "../requests/requests.js";
import {renderMessage} from "../components/message.js";
import {_} from "./translator.js";
import {s} from "../../local-data/strings.js";

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
