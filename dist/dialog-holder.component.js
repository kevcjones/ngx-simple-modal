"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialog_wrapper_component_1 = require("./dialog-wrapper.component");
var DialogHolderComponent = (function () {
    function DialogHolderComponent(resolver) {
        this.resolver = resolver;
        this.dialogs = [];
    }
    DialogHolderComponent.prototype.addDialog = function (component, data, options) {
        var _this = this;
        options = options || {};
        var factory = this.resolver.resolveComponentFactory(dialog_wrapper_component_1.DialogWrapperComponent);
        var componentRef = this.element.createComponent(factory, options.index);
        var dialogWrapper = componentRef.instance;
        var _component = dialogWrapper.addComponent(component);
        if (typeof (options.index) !== 'undefined') {
            this.dialogs.splice(options.index, 0, _component);
        }
        else {
            this.dialogs.push(_component);
        }
        setTimeout(function () {
            dialogWrapper.container.nativeElement.classList.add('show');
            dialogWrapper.container.nativeElement.classList.add('in');
        });
        if (options.autoCloseTimeout) {
            setTimeout(function () {
                _this.removeDialog(_component);
            }, options.autoCloseTimeout);
        }
        if (options.closeByClickingOutside) {
            dialogWrapper.closeByClickOutside();
        }
        if (options.backdropColor) {
            dialogWrapper.container.nativeElement.style.backgroundColor = options.backdropColor;
        }
        this.updateBodyClass();
        return _component.fillData(data);
    };
    DialogHolderComponent.prototype.removeDialog = function (component) {
        var _this = this;
        var element = component.wrapper.container.nativeElement;
        element.classList.remove('show');
        element.classList.remove('in');
        setTimeout(function () {
            _this._removeElement(component);
        }, 300);
    };
    DialogHolderComponent.prototype.updateBodyClass = function () {
        var bodyClass = 'modal-open';
        var body = document.getElementsByTagName('body')[0];
        if (this.dialogs.length == 0) {
            body.classList.remove(bodyClass);
        }
        else {
            body.classList.add(bodyClass);
        }
    };
    DialogHolderComponent.prototype._removeElement = function (component) {
        var index = this.dialogs.indexOf(component);
        if (index > -1) {
            this.element.remove(index);
            this.dialogs.splice(index, 1);
        }
        this.updateBodyClass();
    };
    DialogHolderComponent.prototype.clear = function () {
        this.element.clear();
        this.dialogs = [];
    };
    return DialogHolderComponent;
}());
DialogHolderComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'dialog-holder',
                template: '<ng-template #element></ng-template>',
            },] },
];
DialogHolderComponent.ctorParameters = function () { return [
    { type: core_1.ComponentFactoryResolver, },
]; };
DialogHolderComponent.propDecorators = {
    'element': [{ type: core_1.ViewChild, args: ['element', { read: core_1.ViewContainerRef },] },],
};
exports.DialogHolderComponent = DialogHolderComponent;
//# sourceMappingURL=dialog-holder.component.js.map