const {botCommands} = require("../consts/commands");
const {_} = require('../translation/translation')
const { Keyboard } = require('telegram-keyboard');

module.exports = () => {
    const keyboard = Keyboard.make([
        [
            {
                text: _('Profile'),
                callback_data: '>>>>>>>>>>>',
            },
            {
                text: _('Разместить'),
                callback_data: botCommands.placeAd,
            }
        ],
        [
            {
                text: _('Найти'),
                callback_data: botCommands.findAd,
            },
        ],
    ]);
    return keyboard;
};
