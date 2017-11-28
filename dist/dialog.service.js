"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialog_holder_component_1 = require("./dialog-holder.component");
var DialogServiceConfig = (function () {
    function DialogServiceConfig() {
        this.container = null;
    }
    return DialogServiceConfig;
}());
exports.DialogServiceConfig = DialogServiceConfig;
var DialogService = (function () {
    function DialogService(resolver, applicationRef, injector, config) {
        this.resolver = resolver;
        this.applicationRef = applicationRef;
        this.injector = injector;
        this.container = config && config.container;
    }
    DialogService.prototype.addDialog = function (component, data, options) {
        if (!this.dialogHolderComponent) {
            this.dialogHolderComponent = this.createDialogHolder();
        }
        return this.dialogHolderComponent.addDialog(component, data, options);
    };
    DialogService.prototype.removeDialog = function (component) {
        if (!this.dialogHolderComponent) {
            return;
        }
        this.dialogHolderComponent.removeDialog(component);
    };
    DialogService.prototype.removeAll = function () {
        if (!this.dialogHolderComponent) {
            return;
        }
        this.dialogHolderComponent.clear();
    };
    DialogService.prototype.createDialogHolder = function () {
        var _this = this;
        var componentFactory = this.resolver.resolveComponentFactory(dialog_holder_component_1.DialogHolderComponent);
        var componentRef = componentFactory.create(this.injector);
        var componentRootNode = componentRef.hostView.rootNodes[0];
        if (!this.container) {
            var componentRootViewContainer = this.applicationRef['components'][0];
            this.container = componentRootViewContainer.hostView.rootNodes[0];
        }
        this.applicationRef.attachView(componentRef.hostView);
        componentRef.onDestroy(function () {
            _this.applicationRef.detachView(componentRef.hostView);
        });
        this.container.appendChild(componentRootNode);
        return componentRef.instance;
    };
    return DialogService;
}());
DialogService.decorators = [
    { type: core_1.Injectable },
];
DialogService.ctorParameters = function () { return [
    { type: core_1.ComponentFactoryResolver, },
    { type: core_1.ApplicationRef, },
    { type: core_1.Injector, },
    { type: DialogServiceConfig, decorators: [{ type: core_1.Optional },] },
]; };
exports.DialogService = DialogService;
//# sourceMappingURL=dialog.service.js.map