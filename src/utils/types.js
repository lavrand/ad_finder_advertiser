export interface User {
    _id: string,
    telegramId: string,
    birthday?: Date,
    name: string,
    services: Array<string>,
    about?: string,
    lang?: string,
    gender?: string,
    rating: number,
}
