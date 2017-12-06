"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var simple_modal_holder_component_1 = require("./simple-modal-holder.component");
var simple_modal_wrapper_component_1 = require("./simple-modal-wrapper.component");
var simple_modal_service_1 = require("./simple-modal.service");
var simple_modal_service_factory_1 = require("./simple-modal-service.factory");
var SimpleModalModule = (function () {
    function SimpleModalModule() {
    }
    SimpleModalModule.forRoot = function (config) {
        return {
            ngModule: SimpleModalModule,
            providers: [
                { provide: simple_modal_service_1.SimpleModalServiceConfig, useValue: config },
                {
                    provide: simple_modal_service_1.SimpleModalService,
                    useFactory: simple_modal_service_factory_1.SimpleModalServiceFactory,
                    deps: [core_1.ComponentFactoryResolver, core_1.ApplicationRef, core_1.Injector, simple_modal_service_1.SimpleModalServiceConfig]
                }
            ]
        };
    };
    SimpleModalModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        simple_modal_holder_component_1.SimpleModalHolderComponent,
                        simple_modal_wrapper_component_1.SimpleModalWrapperComponent
                    ],
                    providers: [
                        simple_modal_service_1.SimpleModalService
                    ],
                    imports: [
                        common_1.CommonModule
                    ],
                    entryComponents: [
                        simple_modal_holder_component_1.SimpleModalHolderComponent,
                        simple_modal_wrapper_component_1.SimpleModalWrapperComponent
                    ]
                },] },
    ];
    SimpleModalModule.ctorParameters = function () { return []; };
    return SimpleModalModule;
}());
exports.SimpleModalModule = SimpleModalModule;
//# sourceMappingURL=simple-modal.module.js.map