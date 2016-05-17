export class ProjectHistory {

    private _id: number;
    private _deployment_date: string;
    private _user: string;
    private _server: string;
    private _status: string;

    constructor(
        id?: number,
        deployment_date?: string,
        committer?: string,
        commit?: string,
        status?: string
    ) {
        this._id = id || null;
        this._deployment_date = deployment_date || '';
        this._user = committer || '';
        this._server = commit || '';
        this._status = status || '';
    }

    get id():number {
        return this._id;
    }

    set id(value:number) {
        this._id = value;
    }

    get deployment_date():string {
        return this._deployment_date;
    }

    set deployment_date(value:string) {
        this._deployment_date = value;
    }

    get user():string {
        return this._user;
    }

    set user(value:string) {
        this._user = value;
    }

    get server():string {
        return this._server;
    }

    set server(value:string) {
        this._server = value;
    }

    get status():string {
        return this._status;
    }

    set status(value:string) {
        this._status = value;
    }
    
}
