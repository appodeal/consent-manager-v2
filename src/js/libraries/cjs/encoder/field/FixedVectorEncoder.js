"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.FixedVectorEncoder=void 0;var BooleanEncoder_js_1=require("./BooleanEncoder.js"),index_js_1=require("../../errors/index.js"),index_js_2=require("../../model/index.js"),FixedVectorEncoder=function(){function e(){}return e.encode=function(e,o){for(var n="",r=1;r<=o;r++)n+=BooleanEncoder_js_1.BooleanEncoder.encode(e.has(r));return n},e.decode=function(e,o){if(e.length!==o)throw new index_js_1.DecodingError("bitfield encoding length mismatch");for(var n=new index_js_2.Vector,r=1;r<=o;r++)BooleanEncoder_js_1.BooleanEncoder.decode(e[r-1])&&n.set(r);return n.bitLength=e.length,n},e}();exports.FixedVectorEncoder=FixedVectorEncoder;