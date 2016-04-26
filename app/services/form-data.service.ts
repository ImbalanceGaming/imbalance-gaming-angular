import {Injectable}         from 'angular2/core';

import {QuestionBase}       from "../directives/dynamic-form/models/question-base";
import {DropdownQuestion}   from "../directives/dynamic-form/models/question-dropdown";
import {TextboxQuestion}    from "../directives/dynamic-form/models/question-textbox";
import {User}               from "../models/user";
import {FormButtonInterface} from "../directives/form-buttons/form-button.interface";
import {Group} from "../models/group";
import {Project} from "../models/project";
import {Permission} from "../models/permission";
import {CheckboxQuestion} from "../directives/dynamic-form/models/question-checkbox";
import {ProjectPackage} from "../models/project-package";
import {ApiService} from "./api.service";

@Injectable()
export class FormDataService {

    constructor(private _apiService:ApiService) {
    }

    // Todo: get from a remote source of question metadata
    getUserDetailData(user:User) {

        return Promise.resolve(user).then(user => {
            let questionData:QuestionBase<any>[] = [
                new TextboxQuestion({
                    key: 'username',
                    label: 'Username',
                    value: user.username,
                    required: false,
                    order: 1,
                    read_only: true,
                    type: 'text'
                }),
                new TextboxQuestion({
                    key: 'email',
                    label: 'Email',
                    value: user.email,
                    required: true,
                    order: 2,
                    type: 'text'
                }),
                new TextboxQuestion({
                    key: 'forename',
                    label: 'Forename',
                    value: user.forename,
                    required: true,
                    order: 3,
                    type: 'text'
                }),
                new TextboxQuestion({
                    key: 'surname',
                    label: 'Surname',
                    value: user.surname,
                    required: true,
                    order: 4,
                    type: 'text'
                }),
                new CheckboxQuestion({
                    key: 'has_dev_area',
                    label: 'Development Area',
                    value: user.has_dev_area,
                    checked: user.has_dev_area,
                    order: 6,
                }),
                new DropdownQuestion({
                    key: 'role',
                    label: 'Role',
                    required: true,
                    options: [
                        {key: 'User', value: 'User', selected: (user.role === 'User') ? true : false},
                        {key: 'Developer', value: 'Developer', selected: (user.role === 'Developer') ? true : false},
                        {
                            key: 'Administrator',
                            value: 'Administrator',
                            selected: (user.role === 'Administrator') ? true : false
                        }
                    ],
                    order: 5
                })
            ];

            return questionData.sort((a, b) => a.order - b.order);
        });

    }

    // Todo: get from a remote source of question metadata
    getGroupDetailData(group:Group) {

        return Promise.resolve(group).then(group => {
            let questionData:QuestionBase<any>[] = [
                new TextboxQuestion({
                    key: 'name',
                    label: 'Name',
                    value: group.name,
                    required: true,
                    order: 1,
                    type: 'text'
                }),
                new TextboxQuestion({
                    key: 'description',
                    label: 'Description',
                    value: group.description,
                    required: false,
                    order: 2,
                    type: 'text'
                })
            ];

            return questionData.sort((a, b) => a.order - b.order);
        });

    }

    getProjectDetailData(project:Project) {

        return Promise.resolve(project).then(project => {
            let questionData:QuestionBase<any>[] = [
                new TextboxQuestion({
                    key: 'key',
                    label: 'Key',
                    value: project.key,
                    order: 1,
                    read_only: true,
                    type: 'text'
                }),
                new TextboxQuestion({
                    key: 'name',
                    label: 'Name',
                    value: project.name,
                    order: 2,
                    read_only: true,
                    type: 'text'
                }),
                new TextboxQuestion({
                    key: 'description',
                    label: 'Description',
                    value: project.description,
                    order: 3,
                    type: 'text'
                }),
                new TextboxQuestion({
                    key: 'url',
                    label: 'Project Url',
                    value: project.url,
                    order: 4,
                    type: 'text'
                }),
                new TextboxQuestion({
                    key: 'lead_user',
                    label: 'Project Lead',
                    value: (project.lead_user) ? project.lead_user.forename + ' ' + project.lead_user.surname : '',
                    required: true,
                    order: 6,
                    type: 'text',
                    search_box: true
                }),
                new TextboxQuestion({
                    key: 'selectedSearchValue',
                    label: 'selectedSearchValue',
                    value: (project.lead_user) ? project.lead_user.id : '',
                    order: 7,
                    type: 'hidden'
                }),
            ];

            return questionData.sort((a, b) => a.order - b.order);
        });

    }

    getProjectCreateData() {

        return Promise.resolve().then(() => {
            let questionData:QuestionBase<any>[] = [
                new TextboxQuestion({
                    key: 'key',
                    label: 'Key',
                    value: '',
                    order: 1,
                    read_only: true,
                    type: 'text'
                }),
                new TextboxQuestion({
                    key: 'name',
                    label: 'Name',
                    value: '',
                    required: true,
                    order: 2,
                    type: 'text',
                    update_field: 'key'
                }),
                new TextboxQuestion({
                    key: 'description',
                    label: 'Description',
                    value: '',
                    order: 3,
                    type: 'text'
                }),
                new TextboxQuestion({
                    key: 'url',
                    label: 'Project Url',
                    value: '',
                    order: 4,
                    type: 'text'
                }),
                new TextboxQuestion({
                    key: 'lead_user',
                    label: 'Project Lead',
                    value: '',
                    required: true,
                    order: 6,
                    type: 'text',
                    search_box: true
                }),
                new TextboxQuestion({
                    key: 'selectedSearchValue',
                    label: 'selectedSearchValue',
                    value: '',
                    order: 8,
                    type: 'hidden'
                }),
            ];

            return questionData.sort((a, b) => a.order - b.order);
        });

    }

    getPermissionDetailData(permission:Permission) {

        return Promise.resolve(permission).then(permission => {
            let questionData:QuestionBase<any>[] = [
                new TextboxQuestion({
                    key: 'name',
                    label: 'Name',
                    value: permission.name,
                    required: true,
                    order: 1,
                    type: 'text'
                }),
                new TextboxQuestion({
                    key: 'description',
                    label: 'Description',
                    value: permission.description,
                    order: 2,
                    type: 'text'
                }),
                new CheckboxQuestion({
                    key: 'view',
                    label: 'View',
                    value: permission.view,
                    checked: permission.view,
                    order: 3,
                }),
                new CheckboxQuestion({
                    key: 'add',
                    label: 'Add',
                    value: permission.add,
                    checked: permission.add,
                    order: 4,
                }),
                new CheckboxQuestion({
                    key: 'edit',
                    label: 'Edit',
                    value: permission.edit,
                    checked: permission.edit,
                    order: 5,
                }),
                new CheckboxQuestion({
                    key: 'delete',
                    label: 'Delete',
                    value: permission.delete,
                    checked: permission.delete,
                    order: 6,
                })
            ];

            return questionData.sort((a, b) => a.order - b.order);
        });

    }

    getPermissionCreateData(permission:Permission) {

        return Promise.resolve(permission).then(permission => {
            let questionData:QuestionBase<any>[] = [
                new TextboxQuestion({
                    key: 'name',
                    label: 'Name',
                    value: '',
                    order: 1,
                    read_only: true,
                    type: 'text'
                }),
                new TextboxQuestion({
                    key: 'description',
                    label: 'Description',
                    value: '',
                    order: 2,
                    type: 'text'
                }),
                new CheckboxQuestion({
                    key: 'view',
                    label: 'View',
                    value: true,
                    order: 3,
                }),
                new CheckboxQuestion({
                    key: 'add',
                    label: 'Add',
                    value: true,
                    order: 4,
                }),
                new CheckboxQuestion({
                    key: 'edit',
                    label: 'Edit',
                    value: true,
                    order: 5,
                }),
                new CheckboxQuestion({
                    key: 'delete',
                    label: 'Delete',
                    value: true,
                    order: 6,
                })
            ];

            return questionData.sort((a, b) => a.order - b.order);
        });

    }

    getAddUserData() {

        return Promise.resolve().then(() => {
            let questionData:QuestionBase<any>[] = [
                new TextboxQuestion({
                    key: 'user',
                    label: 'Choose User',
                    value: '',
                    required: true,
                    order: 1,
                    type: 'text',
                    search_box: true
                }),
                new TextboxQuestion({
                    key: 'selectedSearchValue',
                    label: 'selectedSearchValue',
                    value: '',
                    order: 2,
                    type: 'hidden'
                }),
            ];

            return questionData.sort((a, b) => a.order - b.order);
        });

    }

    getAddProjectData() {

        return Promise.resolve().then(() => {
            let questionData:QuestionBase<any>[] = [
                new TextboxQuestion({
                    key: 'project',
                    label: 'Choose Project',
                    value: '',
                    required: true,
                    order: 1,
                    type: 'text',
                    search_box: true
                }),
                new TextboxQuestion({
                    key: 'selectedSearchValue',
                    label: 'selectedSearchValue',
                    value: '',
                    order: 2,
                    type: 'hidden'
                }),
            ];

            return questionData.sort((a, b) => a.order - b.order);
        });

    }

    getAddGroupData() {

        return Promise.resolve().then(() => {
            let questionData:QuestionBase<any>[] = [
                new TextboxQuestion({
                    key: 'group',
                    label: 'Choose Group',
                    value: '',
                    required: true,
                    order: 1,
                    type: 'text',
                    search_box: true
                }),
                new TextboxQuestion({
                    key: 'selectedSearchValue',
                    label: 'selectedSearchValue',
                    value: '',
                    order: 2,
                    type: 'hidden'
                }),
            ];

            return questionData.sort((a, b) => a.order - b.order);
        });

    }

    getAddModuleSectionData() {

        return Promise.resolve().then(() => {
            let questionData:QuestionBase<any>[] = [
                new TextboxQuestion({
                    key: 'module-section',
                    label: 'Choose Module Section',
                    value: '',
                    required: true,
                    order: 1,
                    type: 'text',
                    search_box: true
                }),
                new TextboxQuestion({
                    key: 'selectedSearchValue',
                    label: 'selectedSearchValue',
                    value: '',
                    order: 2,
                    type: 'hidden'
                }),
            ];

            return questionData.sort((a, b) => a.order - b.order);
        });

    }

    getPackageDetailData(projectPackage:ProjectPackage) {

        return Promise.resolve().then(() => {
            let questionData:QuestionBase<any>[] = [
                new TextboxQuestion({
                    key: 'name',
                    label: 'Name',
                    value: projectPackage.name,
                    required: true,
                    order: 1,
                    type: 'text'
                }),
                new TextboxQuestion({
                    key: 'repository',
                    label: 'Repository',
                    value: projectPackage.repository,
                    required: true,
                    order: 2,
                    type: 'text'
                }),
                new TextboxQuestion({
                    key: 'deploy_branch',
                    label: 'Deploy Branch',
                    value: projectPackage.deploy_branch,
                    required: true,
                    order: 3,
                    type: 'text'
                }),
                new TextboxQuestion({
                    key: 'Deploy Location',
                    label: 'Deploy Location',
                    value: projectPackage.deploy_location,
                    required: true,
                    order: 4,
                    type: 'text'
                })
            ];

            return questionData.sort((a, b) => a.order - b.order);
        });

    }

    getPackageCreateData() {

        return Promise.resolve().then(() => {
            let questionData:QuestionBase<any>[] = [
                new TextboxQuestion({
                    key: 'name',
                    label: 'Name',
                    value: '',
                    required: true,
                    order: 1,
                    type: 'text'
                }),
                new TextboxQuestion({
                    key: 'repository',
                    label: 'Repository',
                    value: '',
                    required: true,
                    order: 2,
                    type: 'text'
                }),
                new TextboxQuestion({
                    key: 'deploy_branch',
                    label: 'Deploy Branch',
                    value: '',
                    required: true,
                    order: 3,
                    type: 'text'
                }),
                new TextboxQuestion({
                    key: 'deploy_location',
                    label: 'Deploy Location',
                    value: '',
                    required: true,
                    order: 4,
                    type: 'text'
                })
            ];

            return questionData.sort((a, b) => a.order - b.order);
        });

    }

    getPackageCommandCreateData() {

        return this._apiService.getPromiseWithAuth('projectPackageCommandTypes')
            .then(
                data => {
                    let commandTypes = [];

                    data.forEach(commandType => {
                        let type = {key: commandType.id, value: commandType.name, selected: (commandType.id == 1)?true:false};
                        commandTypes.push(type);
                    });

                    let questionData:QuestionBase<any>[] = [
                        new TextboxQuestion({
                            key: 'command',
                            label: 'Command',
                            value: '',
                            required: true,
                            order: 1,
                            type: 'text'
                        }),
                        new TextboxQuestion({
                            key: 'order',
                            label: 'Order',
                            value: '',
                            required: true,
                            order: 2,
                            type: 'number'
                        }),
                        new DropdownQuestion({
                            key: 'run_on',
                            label: 'Run On',
                            required: true,
                            options: [
                                {key: 'install', value: 'Install', selected: true},
                                {key: 'update', value: 'Update', selected: false},
                            ],
                            order: 3
                        }),
                        new DropdownQuestion({
                            key: 'command_type',
                            label: 'Command Type',
                            options: commandTypes,
                            required: true,
                            order: 4
                        })
                    ];

                    return questionData.sort((a, b) => a.order - b.order);
                },
                error => {
                    return []
                }
            );

    }

    getDefaultButtons() {

        return Promise.resolve().then(() => {
            return [
                <FormButtonInterface>{
                    type: 'save',
                    disabled: true,
                    modalHeader: 'Are you sure!',
                    modalContent: 'Are you sure you want to save these changes?',
                    buttonText: 'Save Changes',
                    show: true,
                },
                <FormButtonInterface>{
                    type: 'cancel',
                    disabled: false,
                    modalHeader: 'Go back!',
                    modalContent: 'Are you sure you want to go back?',
                    buttonText: 'Cancel',
                    show: true,
                },
                <FormButtonInterface>{
                    type: 'delete',
                    disabled: false,
                    modalHeader: 'Are you sure!',
                    modalContent: 'Are you sure you want to delete this record?',
                    buttonText: 'Delete',
                    show: true,
                }
            ];
        });

    }

}
