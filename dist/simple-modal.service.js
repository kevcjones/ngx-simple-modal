"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var simple_modal_holder_component_1 = require("./simple-modal-holder.component");
var SimpleModalServiceConfig = (function () {
    function SimpleModalServiceConfig() {
        this.container = null;
    }
    return SimpleModalServiceConfig;
}());
exports.SimpleModalServiceConfig = SimpleModalServiceConfig;
var SimpleModalService = (function () {
    function SimpleModalService(resolver, applicationRef, injector, config) {
        var _this = this;
        this.resolver = resolver;
        this.applicationRef = applicationRef;
        this.injector = injector;
        Promise.resolve(config && config.container).then(function (container) {
            _this.container = container;
        });
    }
    SimpleModalService.prototype.addModal = function (component, data, options) {
        if (!this.modalHolderComponent) {
            this.modalHolderComponent = this.createSimpleModalHolder();
        }
        return this.modalHolderComponent.addModal(component, data, options);
    };
    SimpleModalService.prototype.removeModal = function (component) {
        if (!this.modalHolderComponent) {
            return Promise.resolve({});
        }
        return this.modalHolderComponent.removeModal(component);
    };
    SimpleModalService.prototype.removeAll = function () {
        if (!this.modalHolderComponent) {
            return Promise.resolve({});
        }
        return this.modalHolderComponent.removeAllModals();
    };
    SimpleModalService.prototype.createSimpleModalHolder = function () {
        var _this = this;
        var componentFactory = this.resolver.resolveComponentFactory(simple_modal_holder_component_1.SimpleModalHolderComponent);
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
    SimpleModalService.decorators = [
        { type: core_1.Injectable },
    ];
    SimpleModalService.ctorParameters = function () { return [
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.ApplicationRef, },
        { type: core_1.Injector, },
        { type: SimpleModalServiceConfig, decorators: [{ type: core_1.Optional },] },
    ]; };
    return SimpleModalService;
}());
exports.SimpleModalService = SimpleModalService;
//# sourceMappingURL=simple-modal.service.js.map