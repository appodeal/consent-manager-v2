"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DateEncoder=void 0;var IntEncoder_js_1=require("./IntEncoder.js"),index_js_1=require("../../errors/index.js"),DateEncoder=function(){function e(){}return e.encode=function(e,n){return IntEncoder_js_1.IntEncoder.encode(Math.round(e.getTime()/100),n)},e.decode=function(e,n){if(n!==e.length)throw new index_js_1.DecodingError("invalid bit length");var r=new Date;return r.setTime(100*IntEncoder_js_1.IntEncoder.decode(e,n)),r},e}();exports.DateEncoder=DateEncoder;