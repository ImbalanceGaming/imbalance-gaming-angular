export class ProjectPackageCommand {

    private _id: number;
    private _command: string;
    private _order: number;
    private _run_on: string;
    private _command_type: string;
    private _project_package_id: number;

    constructor(
        id?: number,
        command?: string,
        order?: number,
        run_on?: string,
        command_type?: string,
        project_package_id?: number
    ) {
        this._id = id || null;
        this._command = command || '';
        this._order = order || null;
        this._run_on = run_on || '';
        this._command_type = command_type || '';
        this._project_package_id = project_package_id || null;
    }

    get id():number {
        return this._id;
    }

    set id(value:number) {
        this._id = value;
    }

    get command():string {
        return this._command;
    }

    set command(value:string) {
        this._command = value;
    }

    get order():number {
        return this._order;
    }

    set order(value:number) {
        this._order = value;
    }

    get run_on():string {
        return this._run_on;
    }

    set run_on(value:string) {
        this._run_on = value;
    }

    get command_type():string {
        return this._command_type;
    }

    set command_type(value:string) {
        this._command_type = value;
    }

    get project_package_id():number {
        return this._project_package_id;
    }

    set project_package_id(value:number) {
        this._project_package_id = value;
    }
    
}
