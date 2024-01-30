"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.LangEncoder=void 0;var IntEncoder_js_1=require("./IntEncoder.js"),index_js_1=require("../../errors/index.js"),LangEncoder=function(){function e(){}return e.encode=function(e,n){var r=(e=e.toUpperCase()).charCodeAt(0)-65,o=e.charCodeAt(1)-65;if(r<0||r>25||o<0||o>25)throw new index_js_1.EncodingError("invalid language code: ".concat(e));if(n%2==1)throw new index_js_1.EncodingError("numBits must be even, ".concat(n," is not valid"));return n/=2,IntEncoder_js_1.IntEncoder.encode(r,n)+IntEncoder_js_1.IntEncoder.encode(o,n)},e.decode=function(e,n){if(n!==e.length||e.length%2)throw new index_js_1.DecodingError("invalid bit length for language");var r=e.length/2,o=IntEncoder_js_1.IntEncoder.decode(e.slice(0,r),r)+65,d=IntEncoder_js_1.IntEncoder.decode(e.slice(r),r)+65;return String.fromCharCode(o)+String.fromCharCode(d)},e}();exports.LangEncoder=LangEncoder;