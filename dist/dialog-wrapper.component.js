"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialog_service_1 = require("./dialog.service");
var DialogWrapperComponent = (function () {
    function DialogWrapperComponent(resolver, dialogService) {
        this.resolver = resolver;
        this.dialogService = dialogService;
    }
    DialogWrapperComponent.prototype.addComponent = function (component) {
        var factory = this.resolver.resolveComponentFactory(component);
        var injector = core_1.ReflectiveInjector.fromResolvedProviders([], this.element.injector);
        var componentRef = factory.create(injector);
        this.element.insert(componentRef.hostView);
        this.content = componentRef.instance;
        this.content.wrapper = this;
        return this.content;
    };
    DialogWrapperComponent.prototype.closeByClickOutside = function () {
        var _this = this;
        var containerEl = this.container.nativeElement;
        containerEl.querySelector('.modal-content').addEventListener('click', function (event) {
            event.stopPropagation();
        });
        containerEl.addEventListener('click', function () {
            _this.dialogService.removeDialog(_this.content);
        }, false);
    };
    return DialogWrapperComponent;
}());
DialogWrapperComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'dialog-wrapper',
                template: "\n    <div #container class=\"modal fade\" style=\"display:block !important;\" role=\"dialog\">\n        <ng-template #element></ng-template>\n    </div>\n"
            },] },
];
DialogWrapperComponent.ctorParameters = function () { return [
    { type: core_1.ComponentFactoryResolver, },
    { type: dialog_service_1.DialogService, },
]; };
DialogWrapperComponent.propDecorators = {
    'element': [{ type: core_1.ViewChild, args: ['element', { read: core_1.ViewContainerRef },] },],
    'container': [{ type: core_1.ViewChild, args: ['container',] },],
};
exports.DialogWrapperComponent = DialogWrapperComponent;
//# sourceMappingURL=dialog-wrapper.component.js.map