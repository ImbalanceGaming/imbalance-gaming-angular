import {Group} from "./group";
import {ModuleSection} from "./module-section";
import {User} from "./user";

export class Permission {

    private _id: number;
    private _name: string;
    private _description: string;
    private _view: boolean;
    private _add: boolean;
    private _edit: boolean;
    private _delete: boolean;
    private _groups: Array<Group>;
    private _module_sections: Array<ModuleSection>;
    private _users: Array<User>;

    constructor(
        id?: number,
        name?: string,
        description?: string,
        view?: boolean,
        add?: boolean,
        edit?: boolean,
        delete1?: boolean
    ) {
        this._id = id || null;
        this._name = name || '';
        this._description = description || '';
        this._view = view || false;
        this._add = add || false;
        this._edit = edit || false;
        this._delete = delete1 || false;
        this._groups = [];
        this._module_sections = [];
        this._users = [];
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

    get view():boolean {
        return this._view;
    }

    set view(value:boolean) {
        this._view = value;
    }

    get add():boolean {
        return this._add;
    }

    set add(value:boolean) {
        this._add = value;
    }

    get edit():boolean {
        return this._edit;
    }

    set edit(value:boolean) {
        this._edit = value;
    }

    get delete():boolean {
        return this._delete;
    }

    set delete(value:boolean) {
        this._delete = value;
    }

    get groups():Array<Group> {
        return this._groups;
    }

    set groups(value:Array<Group>) {
        this._groups = value;
    }

    get module_sections():Array<ModuleSection> {
        return this._module_sections;
    }

    set module_sections(value:Array<ModuleSection>) {
        this._module_sections = value;
    }

    get users():Array<User> {
        return this._users;
    }

    set users(value:Array<User>) {
        this._users = value;
    }
    
}
