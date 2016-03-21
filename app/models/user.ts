export class User {

    //Basic User Details
    private _id          : number;
    private _username    : string;
    private _email       : string;
    private _role        : string;
    private _lastLogin   : string;

    //Extended user Details
    private _forename    : string;
    private _surname    : string;
    private _dob         : string;
    private _country     : string;
    private _website     : string;
    private _avatar      : string;
    private _twitterUsername : string;
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

    get lastLogin():string {
        return this._lastLogin;
    }

    set lastLogin(value:string) {
        this._lastLogin = value;
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

    get twitterUsername():string {
        return this._twitterUsername;
    }

    set twitterUsername(value:string) {
        this._twitterUsername = value;
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
