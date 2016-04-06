import {User}       from "./user";
import {Project}    from "./project";

export class Group {

    private _id : number;
    private _name : string;
    private _description : string;
    private _users : Array<User> = [];
    private _projects : Array<Project> = [];

    constructor(id?: number, name?: string, description?: string) {
        this._id = id || null;
        this._name = name || '';
        this._description = description || '';
        this._users = [];
        this._projects = [];
    }

    get id():number {
        return this._id;
    }

    set id(value:number) {
        this._id = value;
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

    get users():Array<User> {
        return this._users;
    }

    set users(value:Array<User>) {
        this._users = value;
    }

    get projects():Array<Project> {
        return this._projects;
    }

    set projects(value:Array<Project>) {
        this._projects = value;
    }
    
}
