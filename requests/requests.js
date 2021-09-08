import dotenv from 'dotenv';
import fetch from 'node-fetch';
import {getMessageSenderId} from "../utils/ctxHandlers.js";

dotenv.config();
const URL = process.env.URL;

export const sendRequest = async (options) => {
    const {path, body={}, method='GET', ctx=null} = options;
    console.log('>>>', path);
    let headers = {};
    if (ctx) {
        headers['telegram_id'] = getMessageSenderId(ctx)
    }
    const reqOptions = {
        method,
        headers: {'Content-Type': 'application/json', ...headers}
    };
    if (method in ['POST', 'DELETE'] && body) {
        reqOptions.body = JSON.stringify(body)
    }
    const response = await fetch(
        URL+path,
        reqOptions
    );
    const data = await response.json();
    return data;
}

export const fetchUser = async (ctx) => {
    const response = await sendRequest({path: 'user', ctx});
    return response;
}

export const fetchBranches = async (ctx) => {
    const response = await sendRequest({path: 'branch', ctx});
    return response;
}

export const fetchServices = async (ctx, branchId) => {
    const response = await sendRequest({path: `service/${branchId}`, ctx});
    return response;
}