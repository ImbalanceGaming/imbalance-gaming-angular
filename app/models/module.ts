import {Menu} from "./menu";
import {ModuleSection} from "./module-section";

export class Module {

    private _id             : number;
    private _key            : string;
    private _name           : string;
    private _description    : string;
    private _sections       : Array<ModuleSection>;
    private _menus          : Array<Menu>;

    constructor(id?:number, key?:string, name?:string, description?:string) {
        this._id = id || null;
        this._key = key || '';
        this._name = name || '';
        this._description = description || '';
        this._sections = [];
        this._menus = [];
    }

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

    get sections():Array<ModuleSection> {
        return this._sections;
    }

    set sections(value:Array<ModuleSection>) {
        this._sections = value;
    }

    get menus():Array<Menu> {
        return this._menus;
    }

    set menus(value:Array<Menu>) {
        this._menus = value;
    }

}
