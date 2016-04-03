export class User {

    private _id          : number;
    private _username    : string;
    private _email       : string;
    private _role        : string;
    private _last_login  : string;
    private _active      : boolean;
    private _forename    : string;
    private _surname     : string;
    private _dob         : string;
    private _country     : string;
    private _website     : string;
    private _avatar      : string;
    private _twitter_username : string;
    private _facebook    : string;

    private _loggedIn    : boolean;

    constructor() {
        this._loggedIn = false;
    }

    get id():number {
        return this._id;
    }

    set id(value:number) {
        this._id = value;
    }

    get username():string {
        return this._username;
    }

    set username(value:string) {
        this._username = value;
    }

    get email():string {
        return this._email;
    }

    set email(value:string) {
        this._email = value;
    }

    get role():string {
        return this._role;
    }

    set role(value:string) {
        this._role = value;
    }

    get last_login():string {
        return this._last_login;
    }

    set last_login(value:string) {
        this._last_login = value;
    }

    get active():boolean {
        return this._active;
    }

    set active(value:boolean) {
        this._active = value;
    }

    get forename():string {
        return this._forename;
    }

    set forename(value:string) {
        this._forename = value;
    }

    get surname():string {
        return this._surname;
    }

    set surname(value:string) {
        this._surname = value;
    }

    get dob():string {
        return this._dob;
    }

    set dob(value:string) {
        this._dob = value;
    }

    get country():string {
        return this._country;
    }

    set country(value:string) {
        this._country = value;
    }

    get website():string {
        return this._website;
    }

    set website(value:string) {
        this._website = value;
    }

    get avatar():string {
        return this._avatar;
    }

    set avatar(value:string) {
        this._avatar = value;
    }

    get twitter_username():string {
        return this._twitter_username;
    }

    set twitter_username(value:string) {
        this._twitter_username = value;
    }

    get facebook():string {
        return this._facebook;
    }

    set facebook(value:string) {
        this._facebook = value;
    }

    get loggedIn():boolean {
        return this._loggedIn;
    }

    set loggedIn(value:boolean) {
        this._loggedIn = value;
    }
    
}
