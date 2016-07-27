"use strict";
var Config = (function () {
    function Config() {
    }
    /**
     * Config options for site
     *
     * @type {{mame: string, description: string, version: string, devMode: boolean, liveAPIUrl: string, devAPIUrl: string}}
     */
    Config.properties = {
        mame: 'Imbalance Gaming Management Interface',
        description: 'Angular 2 management frontend for Imbalance website.',
        version: '0.0.3',
        devMode: true,
        liveAPIUrl: 'http://api.imbalancegaming.com/api/',
        devAPIUrl: 'https://christopher.local.loc/imbalance/api/public/index.php/api/'
    };
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.js.map