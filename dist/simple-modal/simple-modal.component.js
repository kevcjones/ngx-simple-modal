"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var SimpleModalComponent = (function () {
    function SimpleModalComponent() {
    }
    SimpleModalComponent.prototype.mapDataObject = function (data) {
        data = data || {};
        var keys = Object.keys(data);
        for (var i = 0, length_1 = keys.length; i < length_1; i++) {
            var key = keys[i];
            this[key] = data[key];
        }
    };
    SimpleModalComponent.prototype.setupObserver = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.observer = observer;
            return function () {
                _this.close();
            };
        });
    };
    SimpleModalComponent.prototype.onClosing = function (callback) {
        this.closerCallback = callback;
    };
    SimpleModalComponent.prototype.close = function () {
        return this.closerCallback(this);
    };
    SimpleModalComponent.prototype.onKeydownHandler = function (evt) {
        if (this.options && this.options.closeOnEscape) {
            this.close();
        }
    };
    SimpleModalComponent.prototype.ngOnDestroy = function () {
        if (this.observer) {
            this.observer.next(this.result);
            this.observer.complete();
        }
    };
    SimpleModalComponent.propDecorators = {
        'onKeydownHandler': [{ type: core_1.HostListener, args: ['document:keydown.escape', ['$event'],] },],
    };
    return SimpleModalComponent;
}());
exports.SimpleModalComponent = SimpleModalComponent;
//# sourceMappingURL=simple-modal.component.js.map