"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DialogWrapperComponent = (function () {
    function DialogWrapperComponent(resolver) {
        this.resolver = resolver;
    }
    DialogWrapperComponent.prototype.addComponent = function (component) {
        var factory = this.resolver.resolveComponentFactory(component);
        var injector = core_1.ReflectiveInjector.fromResolvedProviders([], this.viewContainer.injector);
        var componentRef = factory.create(injector);
        this.viewContainer.insert(componentRef.hostView);
        this.content = componentRef.instance;
        this.content.wrapper = this.wrapper;
        return this.content;
    };
    return DialogWrapperComponent;
}());
DialogWrapperComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'dialog-wrapper',
                template: "\n    <div #wrapper class=\"modal fade\" style=\"display:block !important;\" role=\"dialog\">\n        <ng-template #viewContainer></ng-template>\n    </div>\n"
            },] },
];
DialogWrapperComponent.ctorParameters = function () { return [
    { type: core_1.ComponentFactoryResolver, },
]; };
DialogWrapperComponent.propDecorators = {
    'viewContainer': [{ type: core_1.ViewChild, args: ['viewContainer', { read: core_1.ViewContainerRef },] },],
    'wrapper': [{ type: core_1.ViewChild, args: ['wrapper',] },],
};
exports.DialogWrapperComponent = DialogWrapperComponent;
//# sourceMappingURL=dialog-wrapper.component.js.map