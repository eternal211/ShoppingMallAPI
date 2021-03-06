(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["index-index-module"],{

/***/ "./node_modules/ng2-daum-address/bundle/da.component.js":
/*!**************************************************************!*\
  !*** ./node_modules/ng2-daum-address/bundle/da.component.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var url = "https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false";
var DaumAddressComponent = (function () {
    function DaumAddressComponent(el) {
        this.result = new core_1.EventEmitter();
        this.el = el;
    }
    DaumAddressComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.debug = this.options && this.options.debug ? this.options.debug : false;
        this.styleClass = this.options && this.options.class ? Array.isArray(this.options.class) ? this.options.class.join(" ") : this.options.class : '';
        this.loadDaumApi().then(function () {
            _this.print('Daum api has been loaded.');
        });
    };
    DaumAddressComponent.prototype.print = function (msg) {
        if (this.debug) {
            console.log("[" + Math.floor(new Date().getTime() / 1000) + "]", msg);
        }
    };
    DaumAddressComponent.prototype.daumApiCallback = function (data) {
        this.print(data);
        var fullAddr = '', extraAddr = '', engAddr = '', zipCode = '';
        if (data.userSelectedType === 'R') {
            fullAddr = data.roadAddress;
            zipCode = data.zonecode;
            engAddr = data.roadAddressEnglish;
            if (data.bname !== '') {
                extraAddr += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
        }
        else {
            fullAddr = data.jibunAddress;
            zipCode = data.postcode;
            engAddr = data.jibunAddressEnglish;
        }
        this.result.emit({
            zip: zipCode,
            addr: fullAddr,
            addrEng: engAddr
        });
    };
    DaumAddressComponent.prototype.openDaumApi = function () {
        var self = this;
        if (!this.options || (!this.options.type || this.options.type === 'popup')) {
            daum.postcode.load(function () {
                new daum.Postcode({
                    oncomplete: function (data) { return self.daumApiCallback(data); }
                }).open();
            });
        }
        else {
            if (!this.options.target) {
                this.print('ERROR: Parent Component does not have a target element.');
                return false;
            }
            var $target_1 = this.el.nativeElement.parentElement.querySelector("#" + this.options.target);
            this.print($target_1);
            switch (this.options.type) {
                case 'layer':
                    var width = this.options.width || 300;
                    var height = this.options.height || 460;
                    var border = this.options.border || 5;
                    daum.postcode.load(function () {
                        new daum.Postcode({
                            oncomplete: function (data) { return self.daumApiCallback(data); },
                            onclose: function () { return $target_1.style.display = 'none'; },
                            width: '100%',
                            height: '100%'
                        }).embed($target_1);
                    });
                    $target_1.style.display = 'block';
                    $target_1.style.width = width + "px";
                    $target_1.style.height = height + "px";
                    $target_1.style.border = border + "px solid";
                    $target_1.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width) / 2 - border) + "px";
                    $target_1.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height) / 2 - border) + "px";
                    try {
                        $target_1.querySelector('#btnCloseLayer').onclick = function () {
                            $target_1.style.display = 'none';
                        };
                    }
                    catch (e) {
                        this.print("ERROR: " + e.message);
                    }
                    break;
                case 'inline':
                    var currentScroll_1 = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
                    daum.postcode.load(function () {
                        new daum.Postcode({
                            oncomplete: function (data) {
                                self.daumApiCallback(data);
                                document.body.scrollTop = currentScroll_1;
                            },
                            onclose: function () { return $target_1.style.display = 'none'; },
                            onresize: function (size) { return $target_1.style.height = size.height + 'px'; },
                            width: '100%',
                            height: '100%'
                        }).embed($target_1);
                    });
                    $target_1.style.display = 'block';
                    try {
                        $target_1.querySelector('#btnFoldWrap').onclick = function () {
                            $target_1.style.display = 'none';
                        };
                    }
                    catch (e) {
                        this.print("ERROR: " + e.message);
                    }
                    break;
            }
        }
    };
    DaumAddressComponent.prototype.loadDaumApi = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.src = url;
            script.type = 'text/javascript';
            script.async = true;
            _this.el.nativeElement.appendChild(script);
            resolve(true);
        });
    };
    return DaumAddressComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DaumAddressComponent.prototype, "result", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DaumAddressComponent.prototype, "options", void 0);
DaumAddressComponent = __decorate([
    core_1.Component({
        selector: 'btn-daum-address',
        template: "<button\n              type=\"button\"\n              class=\"{{styleClass}}\"\n              (click)=\"openDaumApi()\"\n              >\uC6B0\uD3B8\uBC88\uD638 \uCC3E\uAE30</button>",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], DaumAddressComponent);
exports.DaumAddressComponent = DaumAddressComponent;


/***/ }),

/***/ "./node_modules/ng2-daum-address/bundle/da.module.js":
/*!***********************************************************!*\
  !*** ./node_modules/ng2-daum-address/bundle/da.module.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var da_component_1 = __webpack_require__(/*! ./da.component */ "./node_modules/ng2-daum-address/bundle/da.component.js");
var NgDaumAddressModule = (function () {
    function NgDaumAddressModule() {
    }
    return NgDaumAddressModule;
}());
NgDaumAddressModule = __decorate([
    core_1.NgModule({
        exports: [da_component_1.DaumAddressComponent],
        declarations: [da_component_1.DaumAddressComponent],
    })
], NgDaumAddressModule);
exports.NgDaumAddressModule = NgDaumAddressModule;


/***/ }),

/***/ "./node_modules/ng2-daum-address/index.js":
/*!************************************************!*\
  !*** ./node_modules/ng2-daum-address/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.NgDaumAddressModule = __webpack_require__(/*! ./bundle/da.module */ "./node_modules/ng2-daum-address/bundle/da.module.js").NgDaumAddressModule;

/***/ })

}]);
//# sourceMappingURL=index-index-module.js.map