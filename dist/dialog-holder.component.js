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
        var componentRef = this.viewContainer.createComponent(factory, options.index);
        var dialogWrapper = componentRef.instance;
        var _component = dialogWrapper.addComponent(component);
        if (typeof (options.index) !== 'undefined') {
            this.dialogs.splice(options.index, 0, _component);
        }
        else {
            this.dialogs.push(_component);
        }
        setTimeout(function () {
            dialogWrapper.wrapper.nativeElement.classList.add('show');
            dialogWrapper.wrapper.nativeElement.classList.add('in');
        });
        if (options.autoCloseTimeout) {
            setTimeout(function () {
                _this.removeDialog(_component);
            }, options.autoCloseTimeout);
        }
        if (options.closeByClickingOutside) {
            this.addClickOutsideHandlersToWrapper(dialogWrapper);
        }
        if (options.backdropColor) {
            dialogWrapper.wrapper.nativeElement.style.backgroundColor = options.backdropColor;
        }
        _component.closerCallback = this.removeDialog.bind(this);
        return _component.fillData(data);
    };
    DialogHolderComponent.prototype.removeDialog = function (component) {
        var _this = this;
        var containerEl = component.wrapper.nativeElement;
        containerEl.classList.remove('show');
        containerEl.classList.remove('in');
        setTimeout(function () {
            _this._removeElement(component);
        }, 300);
    };
    DialogHolderComponent.prototype.removeAllDialogs = function () {
        this.viewContainer.clear();
        this.dialogs = [];
    };
    DialogHolderComponent.prototype.addClickOutsideHandlersToWrapper = function (dialogWrapper) {
        var _this = this;
        var containerEl = dialogWrapper.wrapper.nativeElement;
        containerEl.querySelector('.modal-content').addEventListener('click', function (event) {
            event.stopPropagation();
        });
        containerEl.addEventListener('click', function () {
            _this.removeDialog(dialogWrapper.content);
        }, false);
    };
    DialogHolderComponent.prototype._removeElement = function (component) {
        var index = this.dialogs.indexOf(component);
        if (index > -1) {
            this.viewContainer.remove(index);
            this.dialogs.splice(index, 1);
        }
    };
    return DialogHolderComponent;
}());
DialogHolderComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'dialog-holder',
                template: '<ng-template #viewContainer></ng-template>',
            },] },
];
DialogHolderComponent.ctorParameters = function () { return [
    { type: core_1.ComponentFactoryResolver, },
]; };
DialogHolderComponent.propDecorators = {
    'viewContainer': [{ type: core_1.ViewChild, args: ['viewContainer', { read: core_1.ViewContainerRef },] },],
};
exports.DialogHolderComponent = DialogHolderComponent;
//# sourceMappingURL=dialog-holder.component.js.map