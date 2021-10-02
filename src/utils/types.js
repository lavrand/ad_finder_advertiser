export interface User {
    _id: string,
    telegramId: string,
    birthday?: Date,
    name: string,
    services: Array<string|Service>,
    about?: string,
    lang?: string,
    sex?: string,
    rating: number,
}

export interface Branch {
    _id: string,
    name: string,
    services: Array<string|Service>,
    translates: Object,
}

export interface Service {
    _id: string,
    name: string,
    branch: string|Branch,
    translates: Object,
}
