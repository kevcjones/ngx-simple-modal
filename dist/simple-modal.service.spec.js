"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var simple_modal_component_1 = require("./simple-modal.component");
var simple_modal_service_factory_1 = require("./simple-modal-service.factory");
var simple_modal_service_1 = require("./simple-modal.service");
var AlertComponent = (function (_super) {
    __extends(AlertComponent, _super);
    function AlertComponent() {
        return _super.call(this) || this;
    }
    AlertComponent.decorators = [
        { type: core_2.Component, args: [{
                    selector: 'alert',
                    template: "<div class=\"modal-dialog\">{{title}}</div>"
                },] },
    ];
    AlertComponent.ctorParameters = function () { return []; };
    return AlertComponent;
}(simple_modal_component_1.SimpleModalComponent));
var config = {
    container: document.body
};
describe('SimpleModalService', function () {
    var modalService;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                {
                    provide: simple_modal_service_1.SimpleModalServiceConfig,
                    useValue: config
                },
                {
                    provide: simple_modal_service_1.SimpleModalService,
                    useFactory: simple_modal_service_factory_1.SimpleModalServiceFactory,
                    deps: [core_1.ComponentFactoryResolver, core_1.ApplicationRef, core_1.Injector, simple_modal_service_1.SimpleModalServiceConfig]
                }
            ]
        });
    });
    beforeEach(testing_1.inject([simple_modal_service_1.SimpleModalService], function (simpleModalService) {
        modalService = simpleModalService;
    }));
    it('should be injected successfully', function () {
        expect(modalService).toBeDefined();
    });
    it('should have a method called addModal', function () {
        expect(typeof modalService.addModal).toBe('function');
    });
    it('create a "holder" component the first time you add a Modal', function () {
        var createSimpleModalHolderMock = jest.fn().mockImplementation(function () { return ({ addModal: function () { } }); });
        modalService['createSimpleModalHolder'] = createSimpleModalHolderMock;
        console.log(typeof modalService);
        modalService.addModal(AlertComponent, { title: 'Alert title!' });
        modalService.addModal(AlertComponent, { title: 'Alert2 title!' });
        expect(createSimpleModalHolderMock.mock.calls.length).toBe(1);
    });
    it('should have a method called removeModal', function () {
        expect(typeof modalService.removeModal).toBe('function');
    });
});
//# sourceMappingURL=simple-modal.service.spec.js.map