import {User} from "./user";
import {Group} from "./group";

export class Project {

    private _id : number;
    private _key : string;
    private _name : string;
    private _description : string;
    private _status : string;
    private _lead_user : User;
    private _lead_user_id : number;
    private _url: string;
    private _git_url: string;

    constructor() {}

    get id():number {
        return this._id;
    }

    set id(value:number) {
        this._id = value;
    }

    get key():string {
        return this._key;
    }

    set key(value:string) {
        this._key = value;
    }

    get name():string {
        return this._name;
    }

    set name(value:string) {
        this._name = value;
    }

    get description():string {
        return this._description;
    }

    set description(value:string) {
        this._description = value;
    }

    get status():string {
        return this._status;
    }

    set status(value:string) {
        this._status = value;
    }

    get lead_user():User {
        return this._lead_user;
    }

    set lead_user(value:User) {
        this._lead_user = value;
    }

    get lead_user_id():number {
        return this._lead_user_id;
    }

    set lead_user_id(value:number) {
        this._lead_user_id = value;
    }

    get url():string {
        return this._url;
    }

    set url(value:string) {
        this._url = value;
    }

    get git_url():string {
        return this._git_url;
    }

    set git_url(value:string) {
        this._git_url = value;
    }
    
}
