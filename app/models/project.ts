import {User} from "./user";
import {ProjectPackage} from "./project-package";
import {ProjectHistory} from "./project-history";
import {Server} from "./server";
import {ProjectDeploymentStats} from "./project-deployment-stats";

export class Project {

    private _id : number;
    private _key : string;
    private _name : string;
    private _description : string;
    private _url: string;
    private _lead_user : User;
    private _lead_user_id : number;
    private _packages: Array<ProjectPackage>;
    private _history: Array<ProjectHistory>;
    private _servers: Array<Server>;
    private _deploymentStats: ProjectDeploymentStats;

    constructor(
        id?: number,
        key?: string,
        name?: string,
        description?: string,
        url?: string
    ) {
        this._id = id || null;
        this._key = key || '';
        this._name = name || '';
        this._description = description || '';
        this._url = url || '';
        this._lead_user = new User();
        this._lead_user_id = this._lead_user.id || null;
        this._packages = [];
        this._history = [];
        this._servers = [];
        this._deploymentStats = new ProjectDeploymentStats();
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

    get packages():Array<ProjectPackage> {
        return this._packages;
    }

    set packages(value:Array<ProjectPackage>) {
        this._packages = value;
    }

    get history():Array<ProjectHistory> {
        return this._history;
    }

    set history(value:Array<ProjectHistory>) {
        this._history = value;
    }

    get servers():Array<Server> {
        return this._servers;
    }

    set servers(value:Array<Server>) {
        this._servers = value;
    }

    get deploymentStats():ProjectDeploymentStats {
        return this._deploymentStats;
    }

    set deploymentStats(value:ProjectDeploymentStats) {
        this._deploymentStats = value;
    }
    
}
