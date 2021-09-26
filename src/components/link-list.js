import {Context} from "telegraf";


export const renderLinkList = async (ctx: Context, list: Array<{
    title?: string,
    href: string,
}>) => {
    const content = list.map(({title, href}) => `<a href="${href}">${title||href}</a>`).join('\n');
    return await ctx.replyWithHTML(content);
}
