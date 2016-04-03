export class Config {

    /**
     * Config options for site
     *
     * @type {{mame: string, description: string, version: string, devMode: boolean, liveAPIUrl: string, devAPIUrl: string}}
     */
    public static properties : any = {
        mame: 'Imbalance Gaming Management Interface',
        description: 'Angular 2 management frontend for Imbalance website.',
        version: '0.0.3',
        devMode: true,
        liveAPIUrl: 'https://api.imbalancegaming.com/api/',
        devAPIUrl: 'https://192.168.0.2/imbalance/api/public/index.php/api/'
    };

}