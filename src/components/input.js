// @flow
import {Context} from "telegraf";
import {getUserId} from "../utils/ctxHandlers.js";
import {logger} from "../utils/logger.js";

export const renderInputQuestion = async (
    ctx: Context,
    text: string,
    questionId: string,
    handler: Function<Context> = () => null
) => {
    const inputManager = QuestionManager.getInstance();
    inputManager.setUserQuestion(getUserId(ctx), questionId, handler);
    await ctx.reply(text);
}

export class QuestionManager { // SINGLETON
    static instance
    static QUESTION_LIVE_SEC = 10 * 60
    static COLLECTOR_INTERVAL_MS = 1000
    intervalId

    /**
     *
     * Object like this
     * {
     *  userId1: {question: string, date: Date, handler: Function},
     *  userId2: {question: string, date: Date, handler: Function}
     *  ...
     *  userIdN: {question: string, date: Date, handler: Function}
     * }
     */
    pendingInputs = {};

    static getInstance(): QuestionManager {
        if (!QuestionManager.instance) {
            QuestionManager.instance = new QuestionManager();
            QuestionManager.instance.enableGarbageCollector();
        }
        return QuestionManager.instance;
    }

    getUserQuestion(userId): {question: string, date: Date} {
        return this.pendingInputs[userId]
    }

    getAndRemoveUserQuestion(userId): {question: string, date: Date, handler: Function<Context>} {
        const q = this.pendingInputs[userId];
        if (q) {
            delete this.pendingInputs[userId];
        }
        return q;
    }

    setUserQuestion(userId, question: string, handler: Function) {
        if (question && userId) {
            const date = new Date();
            this.pendingInputs[userId] = {question, date, handler};
        } else {
            logger.error(`Error. Wrong question ${question} or user id ${userId}.`)
        }
        if (!this.intervalId) this.enableGarbageCollector();
    }

    cleanOldQuestions() {
        const curDate = new Date();
        for (const userId in this.pendingInputs) {
            if (curDate.getSeconds() - this.pendingInputs[userId].date.getSeconds() > QuestionManager.QUESTION_LIVE_SEC) {
                delete this.pendingInputs[userId];
            }
        }
    }

    enableGarbageCollector() {
        this.intervalId = setInterval(() => {
            this.cleanOldQuestions();
            if (Object.entries(this.pendingInputs).length === 0) {
                this.disableGarbageCollector();
            }
        }, QuestionManager.COLLECTOR_INTERVAL_MS);
    }

    disableGarbageCollector() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    handleQuestion(ctx: Context) {
        const userID = getUserId(ctx);
        const userQuestion = this.getAndRemoveUserQuestion(userID);
        if (userQuestion && userQuestion.handler) {
            userQuestion.handler(ctx);
            return true;
        }
        return false;
    }

}
