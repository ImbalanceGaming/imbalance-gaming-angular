System.register(['angular2/core', "../directives/dynamic-form/models/question-dropdown", "../directives/dynamic-form/models/question-textbox"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, question_dropdown_1, question_textbox_1;
    var FormDataService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (question_dropdown_1_1) {
                question_dropdown_1 = question_dropdown_1_1;
            },
            function (question_textbox_1_1) {
                question_textbox_1 = question_textbox_1_1;
            }],
        execute: function() {
            FormDataService = (function () {
                function FormDataService() {
                }
                // Todo: get from a remote source of question metadata
                FormDataService.prototype.getUserDetailData = function (user) {
                    return Promise.resolve(user).then(function (user) {
                        var questionData = [
                            new question_textbox_1.TextboxQuestion({
                                key: 'username',
                                label: 'Username',
                                value: user.username,
                                required: false,
                                order: 1,
                                read_only: true,
                                type: 'text'
                            }),
                            new question_textbox_1.TextboxQuestion({
                                key: 'email',
                                label: 'Email',
                                value: user.email,
                                required: true,
                                order: 2,
                                type: 'text'
                            }),
                            new question_textbox_1.TextboxQuestion({
                                key: 'forename',
                                label: 'Forename',
                                value: user.forename,
                                required: true,
                                order: 3,
                                type: 'text'
                            }),
                            new question_textbox_1.TextboxQuestion({
                                key: 'surname',
                                label: 'Surname',
                                value: user.surname,
                                required: true,
                                order: 4,
                                type: 'text'
                            }),
                            new question_dropdown_1.DropdownQuestion({
                                key: 'role',
                                label: 'Role',
                                required: true,
                                options: [
                                    { key: 'User', value: 'User', selected: (user.role === 'User') ? true : false },
                                    { key: 'Developer', value: 'Developer', selected: (user.role === 'Developer') ? true : false },
                                    { key: 'Administrator', value: 'Administrator', selected: (user.role === 'Administrator') ? true : false }
                                ],
                                order: 5
                            })
                        ];
                        return questionData.sort(function (a, b) { return a.order - b.order; });
                    });
                };
                // Todo: get from a remote source of question metadata
                FormDataService.prototype.getGroupDetailData = function (group) {
                    return Promise.resolve(group).then(function (group) {
                        var questionData = [
                            new question_textbox_1.TextboxQuestion({
                                key: 'name',
                                label: 'Name',
                                value: group.name,
                                required: true,
                                order: 1,
                                type: 'text'
                            }),
                            new question_textbox_1.TextboxQuestion({
                                key: 'description',
                                label: 'Description',
                                value: group.description,
                                required: false,
                                order: 2,
                                type: 'text'
                            })
                        ];
                        return questionData.sort(function (a, b) { return a.order - b.order; });
                    });
                };
                FormDataService.prototype.getProjectDetailData = function (project) {
                    return Promise.resolve(project).then(function (project) {
                        var questionData = [
                            new question_textbox_1.TextboxQuestion({
                                key: 'key',
                                label: 'Key',
                                value: project.key,
                                order: 1,
                                read_only: true,
                                type: 'text'
                            }),
                            new question_textbox_1.TextboxQuestion({
                                key: 'name',
                                label: 'Name',
                                value: project.name,
                                order: 2,
                                read_only: true,
                                type: 'text'
                            }),
                            new question_textbox_1.TextboxQuestion({
                                key: 'description',
                                label: 'Description',
                                value: project.description,
                                order: 3,
                                type: 'text'
                            }),
                            new question_textbox_1.TextboxQuestion({
                                key: 'url',
                                label: 'Project Url',
                                value: project.url,
                                order: 4,
                                type: 'text'
                            }),
                            new question_textbox_1.TextboxQuestion({
                                key: 'git_url',
                                label: 'Git Url',
                                value: project.git_url,
                                required: true,
                                order: 5,
                                type: 'text'
                            }),
                            new question_textbox_1.TextboxQuestion({
                                key: 'lead_user',
                                label: 'Project Lead',
                                value: (project.lead_user) ? project.lead_user.forename + ' ' + project.lead_user.surname : '',
                                required: true,
                                order: 6,
                                type: 'text',
                                search_box: true
                            }),
                            new question_dropdown_1.DropdownQuestion({
                                key: 'status',
                                label: 'Status',
                                required: true,
                                options: [
                                    { key: 'Development', value: 'Development', selected: (project.status === 'Development') ? true : false },
                                    { key: 'Live', value: 'Live', selected: (project.status === 'Live') ? true : false }
                                ],
                                order: 6
                            }),
                            new question_textbox_1.TextboxQuestion({
                                key: 'selectedSearchValue',
                                label: 'selectedSearchValue',
                                value: (project.lead_user) ? project.lead_user.id : '',
                                order: 7,
                                type: 'hidden'
                            }),
                        ];
                        return questionData.sort(function (a, b) { return a.order - b.order; });
                    });
                };
                FormDataService.prototype.getProjectCreateData = function () {
                    return Promise.resolve().then(function () {
                        var questionData = [
                            new question_textbox_1.TextboxQuestion({
                                key: 'key',
                                label: 'Key',
                                value: '',
                                order: 1,
                                read_only: true,
                                type: 'text'
                            }),
                            new question_textbox_1.TextboxQuestion({
                                key: 'name',
                                label: 'Name',
                                value: '',
                                required: true,
                                order: 2,
                                type: 'text',
                                update_field: 'key'
                            }),
                            new question_textbox_1.TextboxQuestion({
                                key: 'description',
                                label: 'Description',
                                value: '',
                                order: 3,
                                type: 'text'
                            }),
                            new question_textbox_1.TextboxQuestion({
                                key: 'url',
                                label: 'Project Url',
                                value: '',
                                order: 4,
                                type: 'text'
                            }),
                            new question_textbox_1.TextboxQuestion({
                                key: 'git_url',
                                label: 'Git Url',
                                value: '',
                                required: true,
                                order: 5,
                                type: 'text'
                            }),
                            new question_textbox_1.TextboxQuestion({
                                key: 'lead_user',
                                label: 'Project Lead',
                                value: '',
                                required: true,
                                order: 6,
                                type: 'text',
                                search_box: true
                            }),
                            new question_dropdown_1.DropdownQuestion({
                                key: 'status',
                                label: 'Status',
                                required: true,
                                options: [
                                    { key: 'Development', value: 'Development', selected: true },
                                    { key: 'Live', value: 'Live', selected: false }
                                ],
                                order: 7
                            }),
                            new question_textbox_1.TextboxQuestion({
                                key: 'selectedSearchValue',
                                label: 'selectedSearchValue',
                                value: '',
                                order: 8,
                                type: 'hidden'
                            }),
                        ];
                        return questionData.sort(function (a, b) { return a.order - b.order; });
                    });
                };
                FormDataService.prototype.getGroupAddUserData = function () {
                    return Promise.resolve().then(function () {
                        var questionData = [
                            new question_textbox_1.TextboxQuestion({
                                key: 'user',
                                label: 'Choose User',
                                value: '',
                                required: true,
                                order: 1,
                                type: 'text',
                                search_box: true
                            }),
                            new question_textbox_1.TextboxQuestion({
                                key: 'selectedSearchValue',
                                label: 'selectedSearchValue',
                                value: '',
                                order: 2,
                                type: 'hidden'
                            }),
                        ];
                        return questionData.sort(function (a, b) { return a.order - b.order; });
                    });
                };
                FormDataService.prototype.getGroupAddProjectData = function () {
                    return Promise.resolve().then(function () {
                        var questionData = [
                            new question_textbox_1.TextboxQuestion({
                                key: 'project',
                                label: 'Choose Project',
                                value: '',
                                required: true,
                                order: 1,
                                type: 'text',
                                search_box: true
                            }),
                            new question_textbox_1.TextboxQuestion({
                                key: 'selectedSearchValue',
                                label: 'selectedSearchValue',
                                value: '',
                                order: 2,
                                type: 'hidden'
                            }),
                        ];
                        return questionData.sort(function (a, b) { return a.order - b.order; });
                    });
                };
                FormDataService.prototype.getDefaultButtons = function () {
                    return Promise.resolve().then(function () {
                        return [
                            {
                                type: 'save',
                                disabled: true,
                                modalHeader: 'Are you sure!',
                                modalContent: 'Are you sure you want to save these changes?',
                                buttonText: 'Save Changes',
                                show: true,
                            },
                            {
                                type: 'cancel',
                                disabled: false,
                                modalHeader: 'Go back!',
                                modalContent: 'Are you sure you want to go back?',
                                buttonText: 'Cancel',
                                show: true,
                            },
                            {
                                type: 'delete',
                                disabled: false,
                                modalHeader: 'Are you sure!',
                                modalContent: 'Are you sure you want to delete this record?',
                                buttonText: 'Delete',
                                show: true,
                            }
                        ];
                    });
                };
                FormDataService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], FormDataService);
                return FormDataService;
            }());
            exports_1("FormDataService", FormDataService);
        }
    }
});
//# sourceMappingURL=form-data.service.js.map