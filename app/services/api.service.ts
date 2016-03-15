import {Injectable}                 from 'angular2/core';
import {Http, Headers, Response}    from 'angular2/http';
import {Observable}                 from 'rxjs/Observable';

@Injectable()
export class ApiService {

    private _liveURL = 'http://192.168.0.2/imbalance/api/';
    private _devUrl = 'http://192.168.0.2/imbalance/api/public/index.php/api/';
    private _connectionUrl : string;
    private _devMode = true;

    constructor(public http:Http) {
        if (this._devMode) {
            this._connectionUrl = this._devUrl;
        } else {
            this._connectionUrl = this._liveURL;
        }
    }

    get(action:string) {

        return this.http.get(this._connectionUrl + action)
            .map(res => res.json())
            .do(data => console.log(data)) // eyeball results in the console
            .catch(this.handleError);

    }

    authenticate(data) {

        let creds = "email=" + data.email + "&password=" + data.password;

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        //noinspection TypeScriptUnresolvedVariable
        return this.http.post(this._connectionUrl + 'login', creds, {
                headers: headers
            })
            .map(res => res.json())
            //.do(data => console.log(data)) // eyeball results in the console
            .catch(this.handleError);

    }

    getAuthenticatedUser() {

        let key = "token="+localStorage.getItem('id_token');

        let headers = new Headers();
        //headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        //noinspection TypeScriptUnresolvedVariable
        return this.http.post(this._connectionUrl + 'loginUser', key, {
                headers: headers
            })
            .map(res => res.json())
            //.do(data => console.log(data)) // eyeball results in the console
            .catch(this.handleError);

    }

    private handleError(error:Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        //console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
