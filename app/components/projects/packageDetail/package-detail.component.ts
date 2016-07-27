import {Component}              from '@angular/core';
import {Router, ActivatedRoute}    from '@angular/router';

import {DynamicFormDirective} from "../../../directives/dynamic-form/normalForm/dynamic-form.directive";
import {MessagesDirective} from "../../../directives/messages/messages.directive";
import {ProjectPackage} from "../../../models/project-package";
import {FormButtonInterface} from "../../../directives/form-buttons/form-button.interface";
import {FormDataService} from "../../../services/form-data.service";
import {ProjectPackageService} from "../../../services/project-package.service";
import {DynamicModalFormDirective} from "../../../directives/dynamic-form/modalForm/dynamic-modal-form.directive";
import {ProjectPackageCommand} from "../../../models/project-package-command";
import {ProjectPackageCommandService} from "../../../services/project-package-command.service";

@Component({
    selector: 'package-detail',
    templateUrl: 'app/components/projects/packageDetail/package-detail.component.html',
    // styleUrls: ['app/components/userManagement/users/userDetail/user-detail.component.css'],
    directives: [DynamicFormDirective, MessagesDirective, DynamicModalFormDirective],
    providers: [ProjectPackageCommandService]
})

export class PackageDetailComponent {

    title : string;
    projectPackage : ProjectPackage;
    formData : Array<any> = [];
    formButtonData : Array<FormButtonInterface> = [];
    commandsFormData : Array<any> = [];

    private _projectId: number;
    private sub: any;

    constructor(
        private _packageService:ProjectPackageService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _formDataService: FormDataService,
        private _packageCommandService: ProjectPackageCommandService
    ) {
        this.title = 'Package Detail';
        this.projectPackage = new ProjectPackage();
    }

    ngOnInit() {

        this._packageService.projectPackage$.subscribe(projectPackage => this.projectPackage = projectPackage);

        this.sub = this._route.params.subscribe(params => {
            this._projectId = +params['packageId'];
        });

        this.getProjectPackageData();

    }

    saveChanges(formData) {

        this.projectPackage.name = formData.name;
        this.projectPackage.repository = formData.repository;
        this.projectPackage.deploy_branch = formData.deploy_branch;
        this.projectPackage.deploy_location = formData.deploy_location;
        this._packageService.update(this.projectPackage);

    }

    cancelEdit() {
        this._router.navigate(['../ProjectDetail', {id:this._projectId}]);
    }

    deletePackage() {
        this._packageService.delete(this.projectPackage);
        this._router.navigate(['../ProjectDetail', {id:this._projectId}]);
    }

    onAddCommand(formData) {

        let command = new ProjectPackageCommand(
            0,
            formData.command,
            formData.order,
            formData.run_on,
            formData.command_type,
            this.projectPackage.id
        );
        this._packageCommandService.add(command).then(() => this.getProjectPackageData());

    }

    deleteCommand(id:number) {

        let command = new ProjectPackageCommand(id);
        this._packageCommandService.delete(command).then(() => this.getProjectPackageData());

    }

    private getProjectPackageData() {

        this.sub = this._route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number

            this._packageService.getProjectPackage(id).then(() => {
                this.projectPackage = this._packageService.getPackage();
                this._formDataService.getPackageDetailData(this.projectPackage)
                    .then(formData => this.formData = formData);
                this._formDataService.getPackageCommandCreateData()
                    .then(formData => this.commandsFormData = formData);
                this._formDataService.getDefaultButtons()
                    .then(formButtonData => this.formButtonData = formButtonData);
            });
        });

    }

}
