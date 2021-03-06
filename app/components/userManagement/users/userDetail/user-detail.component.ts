import {Component}              from 'angular2/core';
import {Router, RouteParams}    from 'angular2/router';

import {User}                   from "../../../../models/user";
import {UserService}            from "../../../../services/user.service";
import {FormButtonInterface}    from "../../../../directives/form-buttons/form-button.interface";
import {DynamicFormDirective}   from "../../../../directives/dynamic-form/normalForm/dynamic-form.directive";
import {FormDataService}        from "../../../../services/form-data.service";
import {MessagesDirective}      from "../../../../directives/messages/messages.directive";

@Component({
    selector: 'user-detail',
    templateUrl: 'app/components/userManagement/users/userDetail/user-detail.component.html',
    styleUrls: ['app/components/userManagement/users/userDetail/user-detail.component.css'],
    directives: [DynamicFormDirective, MessagesDirective]
})

export class UserDetail {

    title    : string;
    users    : Array<User> = [];
    user     : User;
    formData : Array<any> = [];
    formButtonData : Array<FormButtonInterface> = [];

    constructor(
        private _userService:UserService,
        private _routeParams: RouteParams,
        private _router: Router,
        private _formDataService: FormDataService
    ) {
        this.title = 'User Detail';
        this.user = new User();
    }

    ngOnInit() {

        this._userService.users$.subscribe(updatedUser => this.users = updatedUser);
        let id = +this._routeParams.get('id');
        let page = +this._routeParams.get('page');
        this._userService.getUsers(page, true).then(() => {
            this._userService.get(id).then(user => {
                this.user = user;
                this._formDataService.getUserDetailData(user)
                    .then(formData => this.formData = formData);
                this._formDataService.getDefaultButtons()
                    .then(formButtonData => this.formButtonData = formButtonData);
            });
        });

    }

    saveChanges(formData) {

        this.user.username = formData.username;
        this.user.email = formData.email;
        this.user.forename = formData.forename;
        this.user.surname = formData.surname;
        this.user.role = formData.role;
        this.user.has_dev_area = formData.has_dev_area;

        this._userService.update(this.user);

    }

    cancelEdit() {
        this._router.navigate(['Users']);
    }

    deleteUser() {
        this._userService.delete(this.user);
        this._router.navigate(['Users']);
    }

}