import {Injectable} from 'angular2/core';

@Injectable()
export class HelpersService {

    public processErrors(err) : Object {

        return {
            error: true,
            message: err.message,
            code: err.code
        };

    }

}
