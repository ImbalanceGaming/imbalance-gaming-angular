import {Project} from "./project";
import {ProjectPackageCommand} from "./project-package-command";
export class ProjectPackage {

    private _id: number;
    private _name: string;
    private _repository: string;
    private _deploy_branch: string;
    private _deploy_location: string;
    private _project: Project;
    private _commands: Array<ProjectPackageCommand>;

    constructor(
        id?: number,
        name?: string,
        repository?: string,
        deploy_branch?: string,
        deploy_location?: string
    ) {
        this._id = id || null;
        this._name = name || '';
        this._repository = repository || '';
        this._deploy_branch = deploy_branch || '';
        this._deploy_location = deploy_location || '';
        this._project = new Project();
        this._commands = [];
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

    get repository():string {
        return this._repository;
    }

    set repository(value:string) {
        this._repository = value;
    }

    get deploy_branch():string {
        return this._deploy_branch;
    }

    set deploy_branch(value:string) {
        this._deploy_branch = value;
    }

    get deploy_location():string {
        return this._deploy_location;
    }

    set deploy_location(value:string) {
        this._deploy_location = value;
    }

    get project():Project {
        return this._project;
    }

    set project(value:Project) {
        this._project = value;
    }

    get commands():Array<ProjectPackageCommand> {
        return this._commands;
    }

    set commands(value:Array<ProjectPackageCommand>) {
        this._commands = value;
    }
    
}
