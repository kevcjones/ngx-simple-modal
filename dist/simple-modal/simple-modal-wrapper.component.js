"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SimpleModalWrapperComponent = (function () {
    function SimpleModalWrapperComponent(resolver) {
        this.resolver = resolver;
    }
    SimpleModalWrapperComponent.prototype.addComponent = function (component) {
        var factory = this.resolver.resolveComponentFactory(component);
        var injector = core_1.ReflectiveInjector.fromResolvedProviders([], this.viewContainer.injector);
        var componentRef = factory.create(injector);
        this.viewContainer.insert(componentRef.hostView);
        this.content = componentRef.instance;
        this.content.wrapper = this.wrapper;
        return this.content;
    };
    SimpleModalWrapperComponent.prototype.onClickOutsideModalContent = function (contentClass, callback) {
        this.clickOutsideCallback = callback;
        var containerEl = this.wrapper.nativeElement;
        var contentEl = containerEl.querySelector(contentClass) || containerEl.querySelector(':first-child');
        contentEl.addEventListener('click', this.stopEventPropagation);
        containerEl.addEventListener('click', this.clickOutsideCallback, false);
    };
    SimpleModalWrapperComponent.prototype.stopEventPropagation = function (event) {
        event.stopPropagation();
    };
    SimpleModalWrapperComponent.prototype.ngOnDestroy = function () {
        if (this.clickOutsideCallback) {
            var containerEl = this.wrapper.nativeElement;
            containerEl.querySelector(':first-child').removeEventListener('click', this.stopEventPropagation);
            containerEl.removeEventListener('click', this.clickOutsideCallback, false);
            this.clickOutsideCallback = null;
        }
    };
    SimpleModalWrapperComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'simple-modal-wrapper',
                    template: "\n    <div #wrapper class=\"modal fade\" style=\"display:block !important;\" role=\"dialog\">\n        <ng-template #viewContainer></ng-template>\n    </div>\n"
                },] },
    ];
    SimpleModalWrapperComponent.ctorParameters = function () { return [
        { type: core_1.ComponentFactoryResolver, },
    ]; };
    SimpleModalWrapperComponent.propDecorators = {
        'viewContainer': [{ type: core_1.ViewChild, args: ['viewContainer', { read: core_1.ViewContainerRef },] },],
        'wrapper': [{ type: core_1.ViewChild, args: ['wrapper',] },],
    };
    return SimpleModalWrapperComponent;
}());
exports.SimpleModalWrapperComponent = SimpleModalWrapperComponent;
//# sourceMappingURL=simple-modal-wrapper.component.js.map