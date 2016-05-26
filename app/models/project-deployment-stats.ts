export class ProjectDeploymentStats {

    private _today: number;
    private _week: number;
    private _duration: number;

    constructor(today?:number, week?:number, duration?:number) {
        this._today = today || 0;
        this._week = week || 0;
        this._duration = duration || 0;
    }

    get today():number {
        return this._today;
    }

    set today(value:number) {
        this._today = value;
    }

    get week():number {
        return this._week;
    }

    set week(value:number) {
        this._week = value;
    }

    get duration():number {
        return this._duration;
    }

    set duration(value:number) {
        this._duration = value;
    }
}
