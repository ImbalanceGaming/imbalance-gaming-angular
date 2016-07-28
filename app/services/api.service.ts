import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp}       from 'angular2-jwt';
import {Router}         from 'angular2/router';

import {contentHeaders} from '../common/headers';
import {Config}         from '../config/config';

@Injectable()
export class ApiService {

    private _liveURL = Config.properties.liveAPIUrl;
    private _devUrl = Config.properties.devAPIUrl;
    private _connectionUrl : string;
    private _devMode = Config.properties.devMode;
    static router: Router;

    constructor(public http:Http, private _authHttp: AuthHttp, private _router:Router) {
        ApiService.router = this._router;
        if (this._devMode) {
            this._connectionUrl = this._devUrl;
        } else {
            this._connectionUrl = this._liveURL;
        }
    }

    get(action:string) {

        return this.http.get(this._connectionUrl + action)
            .map(res => res.json())
            //.do(data => console.log(data)) // eyeball results in the console
            .catch(ApiService.handleError);

    }

    getWithAuth(action:string) {

        return this._authHttp.get(this._connectionUrl + action, {
                headers: contentHeaders
            })
            .map(res => ApiService.refreshToken(res))
            //.do(data => console.log(data)) // eyeball results in the console
            .catch(ApiService.handleAuthError);

    }

    getPromiseWithAuth(action: string) {

        return this._authHttp.get(this._connectionUrl + action, {
                headers: contentHeaders
            })
            .toPromise()
            .then(res => ApiService.refreshToken(res))
            //.do(data => console.log(data)) // eyeball results in the console
            .catch(ApiService.handleAuthError);

    }

    getPoll(action:string) {

        return Observable
            .interval(50)
            .switchMap(() => this._authHttp.get(this._connectionUrl + action, {
                headers: contentHeaders
            }))
            .toPromise()
            .then(res => ApiService.refreshToken(res));

    }

    post(action:string, data:any) {

        let body = JSON.stringify(data);

        return this.http.post(this._connectionUrl + action, body, {headers: contentHeaders})
            .map(res => res.json())
            //.do(data => console.log(data)) // eyeball results in the console
            .catch(ApiService.handleError);

    }

    postPromise(action:string, data:any) {
        let body = JSON.stringify(data);

        return this.http.post(this._connectionUrl + action, body, {headers: contentHeaders})
            .toPromise()
            .then(res => res.json())
            //.do(data => console.log(data)) // eyeball results in the console
            .catch(ApiService.handleError);
    }

    postWithAuth(action:string, data:any) {

        let body = JSON.stringify(data);

        return this._authHttp.post(this._connectionUrl + action, body, {headers: contentHeaders})
            .map(res => ApiService.refreshToken(res))
            //.do(data => console.log(data)) // eyeball results in the console
            .catch(ApiService.handleAuthError);

    }

    postPromiseWithAuth(action:string, data:any) {

        let body = JSON.stringify(data);

        return this._authHttp.post(this._connectionUrl + action, body, {
                headers: contentHeaders
            })
            .toPromise()
            .then(res => ApiService.refreshToken(res))
            //.do(data => console.log(data)) // eyeball results in the console
            .catch(ApiService.handleAuthError);

    }

    patch(action:string, data:any) {

        let body = JSON.stringify(data);

        return this._authHttp.patch(this._connectionUrl + action, body, {headers: contentHeaders})
            .map(res => ApiService.refreshToken(res))
            //.do(data => console.log(data)) // eyeball results in the console
            .catch(ApiService.handleAuthError);

    }

    patchPromise(action:string, data:any) {

        let body = JSON.stringify(data);

        return this._authHttp.patch(this._connectionUrl + action, body, {headers: contentHeaders})
            .toPromise()
            .then(res => ApiService.refreshToken(res))
            //.do(data => console.log(data)) // eyeball results in the console
            .catch(ApiService.handleAuthError);

    }

    delete(action: string) {

        return this._authHttp.delete(this._connectionUrl + action, {headers: contentHeaders})
            .map(res => ApiService.refreshToken(res))
            //.do(data => console.log(data)) // eyeball results in the console
            .catch(ApiService.handleAuthError);

    }

    deletePromise(action: string) {

        return this._authHttp.delete(this._connectionUrl + action, {headers: contentHeaders})
            .toPromise()
            .then(res => ApiService.refreshToken(res))
            //.do(data => console.log(data)) // eyeball results in the console
            .catch(ApiService.handleAuthError);

    }

    private static handleError(error:Response) {
        //console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private static handleAuthError(error:Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        //console.error(error);
        let errorMessage = error.json().error;
        switch (errorMessage) {
            case 'token_invalid' :
                localStorage.removeItem('jwt');
                ApiService.router.navigate(['Login']);
                break;
            case 'token_expired' :
                localStorage.removeItem('jwt');
                ApiService.router.navigate(['Login']);
                break;
            default:
                ApiService.refreshToken(error);
                break;
        }
        return Observable.throw(error.json().error || 'Server error');
    }

    private static refreshToken(response:Response) {
        let newToken = response.headers.get('Authorization');
        if (newToken != null) {
            newToken = newToken.split(' ').pop();
            localStorage.setItem('jwt', newToken);
        }

        return response.json();
    }

}
