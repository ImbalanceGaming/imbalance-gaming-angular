export class ProjectHistory {

    private _id: number;
    private _deployment_date: string;
    private _committer: string;
    private _commit: string;
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
        this._committer = committer || '';
        this._commit = commit || '';
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

    get committer():string {
        return this._committer;
    }

    set committer(value:string) {
        this._committer = value;
    }

    get commit():string {
        return this._commit;
    }

    set commit(value:string) {
        this._commit = value;
    }

    get status():string {
        return this._status;
    }

    set status(value:string) {
        this._status = value;
    }
    
}
