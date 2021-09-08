import { Keyboard } from 'telegram-keyboard'

export default (buttons) => {
    const keyboard = Keyboard.make(buttons);
    return keyboard;
};
