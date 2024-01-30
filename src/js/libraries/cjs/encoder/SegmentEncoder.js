"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SegmentEncoder=void 0;var Base64Url_js_1=require("./Base64Url.js"),BitLength_js_1=require("./BitLength.js"),index_js_1=require("./field/index.js"),index_js_2=require("./sequence/index.js"),index_js_3=require("../errors/index.js"),Fields_js_1=require("../model/Fields.js"),index_js_4=require("../model/index.js"),SegmentEncoder=function(){function e(){}return e.encode=function(e,n){var s,i=this;try{s=this.fieldSequence[String(e.version)][n]}catch(s){throw new index_js_3.EncodingError("Unable to encode version: ".concat(e.version,", segment: ").concat(n))}var r="";n!==index_js_4.Segment.CORE&&(r=index_js_1.IntEncoder.encode(index_js_4.SegmentIDs.KEY_TO_ID[n],BitLength_js_1.BitLength.segmentType));var t=(0,index_js_1.FieldEncoderMap)();return s.forEach((function(s){var d=e[s],o=t[s],_=BitLength_js_1.BitLength[s];void 0===_&&i.isPublisherCustom(s)&&(_=Number(e[Fields_js_1.Fields.numCustomPurposes]));try{r+=o.encode(d,_)}catch(e){throw new index_js_3.EncodingError("Error encoding ".concat(n,"->").concat(s,": ").concat(e.message))}})),Base64Url_js_1.Base64Url.encode(r)},e.decode=function(e,n,s){var i=this,r=Base64Url_js_1.Base64Url.decode(e),t=0;s===index_js_4.Segment.CORE&&(n.version=index_js_1.IntEncoder.decode(r.substr(t,BitLength_js_1.BitLength[Fields_js_1.Fields.version]),BitLength_js_1.BitLength[Fields_js_1.Fields.version])),s!==index_js_4.Segment.CORE&&(t+=BitLength_js_1.BitLength.segmentType);var d=this.fieldSequence[String(n.version)][s],o=(0,index_js_1.FieldEncoderMap)();return d.forEach((function(e){var s=o[e],d=BitLength_js_1.BitLength[e];if(void 0===d&&i.isPublisherCustom(e)&&(d=Number(n[Fields_js_1.Fields.numCustomPurposes])),0!==d){var _=r.substr(t,d);if(s===index_js_1.VendorVectorEncoder?n[e]=s.decode(_,n.version):n[e]=s.decode(_,d),Number.isInteger(d))t+=d;else{if(!Number.isInteger(n[e].bitLength))throw new index_js_3.DecodingError(e);t+=n[e].bitLength}}})),n},e.isPublisherCustom=function(e){return 0===e.indexOf("publisherCustom")},e.fieldSequence=new index_js_2.FieldSequence,e}();exports.SegmentEncoder=SegmentEncoder;