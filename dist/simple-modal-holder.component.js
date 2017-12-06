"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var simple_modal_options_1 = require("./simple-modal-options");
var simple_modal_wrapper_component_1 = require("./simple-modal-wrapper.component");
var SimpleModalHolderComponent = (function () {
    function SimpleModalHolderComponent(resolver) {
        this.resolver = resolver;
        this.modals = [];
    }
    SimpleModalHolderComponent.prototype.addModal = function (component, data, options) {
        var _this = this;
        var factory = this.resolver.resolveComponentFactory(simple_modal_wrapper_component_1.SimpleModalWrapperComponent);
        var componentRef = this.viewContainer.createComponent(factory);
        var modalWrapper = componentRef.instance;
        var _component = modalWrapper.addComponent(component);
        _component.options = options = Object.assign({}, simple_modal_options_1.defaultModalOptions, options);
        this.modals.push(_component);
        this.onOpening(function () {
            _this.toggleWrapperClass(modalWrapper.wrapper, options.wrapperClass);
            _this.toggleBodyClass(options.bodyClass);
        });
        _component.onClosing(function (modal) { return _this.removeModal(modal); });
        this.configureCloseOnClickOutside(modalWrapper);
        _component.mapDataObject(data);
        return _component.setupObserver();
    };
    SimpleModalHolderComponent.prototype.removeModal = function (closingModal) {
        var _this = this;
        var options = closingModal.options;
        this.toggleWrapperClass(closingModal.wrapper, options.wrapperClass);
        return this.wait(options.animationDuration).then(function () {
            _this._removeElement(closingModal);
            _this.toggleBodyClass(options.bodyClass);
        });
    };
    SimpleModalHolderComponent.prototype.removeAllModals = function () {
        var _this = this;
        return Promise.all(this.modals.map(function (modal) { return _this.removeModal(modal); }));
    };
    SimpleModalHolderComponent.prototype.toggleBodyClass = function (bodyClass) {
        if (!bodyClass) {
            return;
        }
        var body = document.getElementsByTagName('body')[0];
        if (!this.modals.length) {
            body.classList.remove(bodyClass);
        }
        else {
            body.classList.add(bodyClass);
        }
    };
    SimpleModalHolderComponent.prototype.configureCloseOnClickOutside = function (modalWrapper) {
        if (modalWrapper.content.options.closeOnClickOutside) {
            modalWrapper.onClickOutsideModalContent(function () {
                modalWrapper.content.close();
            });
        }
    };
    SimpleModalHolderComponent.prototype.toggleWrapperClass = function (modalWrapperEl, wrapperClass) {
        var wrapperClassList = modalWrapperEl.nativeElement.classList;
        if (wrapperClassList.contains(wrapperClass)) {
            wrapperClassList.remove(wrapperClass);
        }
        else {
            wrapperClassList.add(wrapperClass);
        }
    };
    SimpleModalHolderComponent.prototype.wait = function (ms) {
        if (ms === void 0) { ms = 0; }
        return new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve(); }, ms);
        });
    };
    SimpleModalHolderComponent.prototype.onOpening = function (onModalOpened) {
        this.wait().then(function () { return onModalOpened(); });
    };
    SimpleModalHolderComponent.prototype._removeElement = function (component) {
        var index = this.modals.indexOf(component);
        if (index > -1) {
            this.viewContainer.remove(index);
            this.modals.splice(index, 1);
        }
    };
    SimpleModalHolderComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'simple-modal-holder',
                    template: '<ng-template #viewContainer></ng-template>',
                },] },
    ];
    SimpleModalHolderComponent.ctorParameters = function () { return [
        { type: core_1.ComponentFactoryResolver, },
    ]; };
    SimpleModalHolderComponent.propDecorators = {
        'viewContainer': [{ type: core_1.ViewChild, args: ['viewContainer', { read: core_1.ViewContainerRef },] },],
    };
    return SimpleModalHolderComponent;
}());
exports.SimpleModalHolderComponent = SimpleModalHolderComponent;
//# sourceMappingURL=simple-modal-holder.component.js.map