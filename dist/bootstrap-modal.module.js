"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var dialog_holder_component_1 = require("./dialog-holder.component");
var dialog_wrapper_component_1 = require("./dialog-wrapper.component");
var dialog_service_1 = require("./dialog.service");
var dialog_service_factory_1 = require("./dialog-service.factory");
var BootstrapModalModule = (function () {
    function BootstrapModalModule() {
    }
    BootstrapModalModule.forRoot = function (config) {
        return {
            ngModule: BootstrapModalModule,
            providers: [
                { provide: dialog_service_1.DialogServiceConfig, useValue: config },
                {
                    provide: dialog_service_1.DialogService,
                    useFactory: dialog_service_factory_1.dialogServiceFactory,
                    deps: [core_1.ComponentFactoryResolver, core_1.ApplicationRef, core_1.Injector, dialog_service_1.DialogServiceConfig]
                }
            ]
        };
    };
    return BootstrapModalModule;
}());
BootstrapModalModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [
                    dialog_holder_component_1.DialogHolderComponent,
                    dialog_wrapper_component_1.DialogWrapperComponent
                ],
                providers: [
                    dialog_service_1.DialogService
                ],
                imports: [
                    common_1.CommonModule
                ],
                entryComponents: [
                    dialog_holder_component_1.DialogHolderComponent,
                    dialog_wrapper_component_1.DialogWrapperComponent
                ]
            },] },
];
BootstrapModalModule.ctorParameters = function () { return []; };
exports.BootstrapModalModule = BootstrapModalModule;
//# sourceMappingURL=bootstrap-modal.module.js.map