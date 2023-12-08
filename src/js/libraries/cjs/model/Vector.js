"use strict";var __extends=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(e,r)};return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),__generator=this&&this.__generator||function(t,e){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(u){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(s=0)),s;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,n=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){s=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){s.label=a[1];break}if(6===a[0]&&s.label<o[1]){s.label=o[1],o=a;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(a);break}o[2]&&s.ops.pop(),s.trys.pop();continue}a=e.call(t,s)}catch(t){a=[6,t],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Vector=void 0;var Cloneable_js_1=require("../Cloneable.js"),index_js_1=require("../errors/index.js"),Vector=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.bitLength=0,e.maxId_=0,e.set_=new Set,e}return __extends(e,t),e.prototype[Symbol.iterator]=function(){var t;return __generator(this,(function(e){switch(e.label){case 0:t=1,e.label=1;case 1:return t<=this.maxId?[4,[t,this.has(t)]]:[3,4];case 2:e.sent(),e.label=3;case 3:return t++,[3,1];case 4:return[2]}}))},e.prototype.values=function(){return this.set_.values()},Object.defineProperty(e.prototype,"maxId",{get:function(){return this.maxId_},enumerable:!1,configurable:!0}),e.prototype.has=function(t){return this.set_.has(t)},e.prototype.unset=function(t){var e=this;Array.isArray(t)?t.forEach((function(t){return e.unset(t)})):"object"==typeof t?this.unset(Object.keys(t).map((function(t){return Number(t)}))):(this.set_.delete(Number(t)),this.bitLength=0,t===this.maxId&&(this.maxId_=0,this.set_.forEach((function(t){e.maxId_=Math.max(e.maxId,t)}))))},e.prototype.isIntMap=function(t){var e=this,r="object"==typeof t;return r=r&&Object.keys(t).every((function(r){var n=Number.isInteger(parseInt(r,10));return n=(n=n&&e.isValidNumber(t[r].id))&&void 0!==t[r].name}))},e.prototype.isValidNumber=function(t){return parseInt(t,10)>0},e.prototype.isSet=function(t){var e=!1;return t instanceof Set&&(e=Array.from(t).every(this.isValidNumber)),e},e.prototype.set=function(t){var e=this;if(Array.isArray(t))t.forEach((function(t){return e.set(t)}));else if(this.isSet(t))this.set(Array.from(t));else if(this.isIntMap(t))this.set(Object.keys(t).map((function(t){return Number(t)})));else{if(!this.isValidNumber(t))throw new index_js_1.TCModelError("set()",t,"must be positive integer array, positive integer, Set<number>, or IntMap");this.set_.add(t),this.maxId_=Math.max(this.maxId,t),this.bitLength=0}},e.prototype.empty=function(){this.set_=new Set},e.prototype.forEach=function(t){for(var e=1;e<=this.maxId;e++)t(this.has(e),e)},Object.defineProperty(e.prototype,"size",{get:function(){return this.set_.size},enumerable:!1,configurable:!0}),e.prototype.setAll=function(t){this.set(t)},e}(Cloneable_js_1.Cloneable);exports.Vector=Vector;