import dotenv from 'dotenv';
import fetch from 'node-fetch';
import {getMessageSenderId} from "../utils/ctxHandlers.js";
import Context from "telegraf";
import {logger} from "../utils/logger.js";

dotenv.config();
const URL = process.env.URL;

export const sendRequest = async (options: {
        ctx?: Context,
        path: string,
        method?: 'GET'|'POST'|'DELETE'|'PUT',
        body?: any}
    ): Promise<{status: number, ok: boolean, data: any}> => {
    const {path, body, method='GET', ctx} = options;
    let headers = {};
    if (ctx) {
        headers['telegram_id'] = getMessageSenderId(ctx)
    }
    const reqOptions = {
        method,
        headers: {'Content-Type': 'application/json', ...headers}
    };
    if (['POST', 'PUT'].includes(method) && body) {
        reqOptions.body = JSON.stringify(body);
    }
    logger.log('REQUEST SENDING:', URL+path, reqOptions);
    const response = await fetch(
        URL+path,
        reqOptions
    );
    let data;
    try {
        data = await response.json();
    } catch (err) {
        logger.warn('Response is not in json format')
        data = response.statusText;
    }
    const result = {
        status: response.status,
        ok: response.ok,
        data,
    };
    logger.log('RESPONSE RECEIVED:', result);
    return result;
}

export const fetchUser = async (ctx: Context) => await sendRequest({path: 'user', ctx});

export const fetchBranches = async (ctx: Context) => await sendRequest({path: 'branch', ctx});

export const fetchServices = async (ctx: Context, branchId: string) => await sendRequest({path: `service/${branchId}`, ctx});

export const addServiceToUser = async (ctx: Context, serviceId: string) => await sendRequest({
    method: "POST",
    path: `user/service/${serviceId}`,
    ctx
});

export const updateGender = async (ctx: Context, gender: string) => await sendRequest({
    method: "PUT",
    path: `user`,
    body: {sex: gender},
    ctx
});

export const updateUserAbout = async (ctx: Context, about: string) => await sendRequest({
    method: "PUT",
    path: `user`,
    body: {about},
    ctx
});

export const updateUserPhoto = async (ctx: Context, photo: {
    file_id: string,
    file_unique_id: string,
    file_size: number,
    width: number,
    height: number,
}) => await sendRequest({
    method: "PUT",
    path: `user`,
    body: {photo},
    ctx
});