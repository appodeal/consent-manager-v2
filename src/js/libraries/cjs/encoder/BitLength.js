"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.BitLength=void 0;var index_js_1=require("../model/index.js"),BitLength=function(){function e(){}var s,i,n,d,t,r,_,o,l,p,x,u,j,a,F,c,g,m;return s=index_js_1.Fields.cmpId,i=index_js_1.Fields.cmpVersion,n=index_js_1.Fields.consentLanguage,d=index_js_1.Fields.consentScreen,t=index_js_1.Fields.created,r=index_js_1.Fields.isServiceSpecific,_=index_js_1.Fields.lastUpdated,o=index_js_1.Fields.policyVersion,l=index_js_1.Fields.publisherCountryCode,p=index_js_1.Fields.publisherLegitimateInterests,x=index_js_1.Fields.publisherConsents,u=index_js_1.Fields.purposeConsents,j=index_js_1.Fields.purposeLegitimateInterests,a=index_js_1.Fields.purposeOneTreatment,F=index_js_1.Fields.specialFeatureOptins,c=index_js_1.Fields.useNonStandardTexts,g=index_js_1.Fields.vendorListVersion,m=index_js_1.Fields.version,e[s]=12,e[i]=12,e[n]=12,e[d]=6,e[t]=36,e[r]=1,e[_]=36,e[o]=6,e[l]=12,e[p]=24,e[x]=24,e[u]=24,e[j]=24,e[a]=1,e[F]=12,e[c]=1,e[g]=12,e[m]=6,e.anyBoolean=1,e.encodingType=1,e.maxId=16,e.numCustomPurposes=6,e.numEntries=12,e.numRestrictions=12,e.purposeId=6,e.restrictionType=2,e.segmentType=3,e.singleOrRange=1,e.vendorId=16,e}();exports.BitLength=BitLength;