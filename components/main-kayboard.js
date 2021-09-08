import {botCommands} from "../consts/commands.js"
import {_} from '../translation/translation.js'
import { Keyboard } from 'telegram-keyboard'

export default () => {
    const keyboard = Keyboard.make([
        [
            {
                text: 'Profile',
            },
            {
                text: 'Place',
            }
        ],
        [
            {
                text: 'Find',
            },
        ],
    ]);
    return keyboard;
};
