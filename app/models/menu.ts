
import {MenuSubSection} from "./menu-subsection";

export class Menu {

    private _id             : number;
    private _name           : string;
    private _description    : string;
    private _placement      : string;
    private _link           : string;
    private _component      : string;
    private _subSections    : Array<MenuSubSection>;

    constructor(id:number, name:string, description:string, placement:string, link:string, component:string) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._placement = placement;
        this._link = link;
        this._component = component;
        this._subSections = [];
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

    get placement():string {
        return this._placement;
    }

    set placement(value:string) {
        this._placement = value;
    }

    get link():string {
        return this._link;
    }

    set link(value:string) {
        this._link = value;
    }

    get component():string {
        return this._component;
    }

    set component(value:string) {
        this._component = value;
    }

    get subSections():Array<MenuSubSection> {
        return this._subSections;
    }

    set subSections(value:Array<MenuSubSection>) {
        this._subSections = value;
    }

}