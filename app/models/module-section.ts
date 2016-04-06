import {Module} from "./module";

export class ModuleSection {

    private _id : number;
    private _name : string;
    private _description : string;
    private _module: Module;

    constructor(id?: number, name?: string, description?: string) {
        this._id = id || null;
        this._name = name || '';
        this._description = description || '';
        this._module = new Module();
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

    get module():Module {
        return this._module;
    }

    set module(value:Module) {
        this._module = value;
    }
    
}
