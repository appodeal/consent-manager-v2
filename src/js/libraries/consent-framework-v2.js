import {state} from "../state";
import {GVL, TCModel, TCString} from "./cjs";

// const tsModel;

export function decodeConsent(consentString) {
    const myTcModel = new TCString.decode(consentString);
    return {
        cmpId: myTcModel.cmpId_,
        cmpVersion: myTcModel.cmpVersion_,
        policyVersion: myTcModel.policyVersion_,
        consentLanguage: myTcModel.consentLanguage_,
        purposeOneTreatment: myTcModel.purposeOneTreatment_,

        vendorConsents: myTcModel.vendorConsents.set_,
        vendorLegitimateInterests: myTcModel.vendorLegitimateInterests.set_,

        purposeConsents: myTcModel.purposeConsents.set_,
        purposeLegitimateInterests: myTcModel.purposeLegitimateInterests.set_,

        specialFeatureOptins: myTcModel.specialFeatureOptins.set_
    };
}

export function encodeConsent (consent) {
    const gvl = new GVL(consent);
    const tcModel = new TCModel(gvl);

    tcModel.cmpId = state.decodedIABConsentObj.cmpId;
    tcModel.cmpVersion = state.decodedIABConsentObj.cmpVersion;

    return tcModel.gvl.readyPromise.then(() => {
        console.log(tcModel, '----------oldConsent2----------', consent, '---------------', );
        return TCString.encode(tcModel);
    });
}


export function selectAll(vendors) {
    const gvl = new GVL(vendors);
    const tcModel = new TCModel(gvl);

    tcModel.cmpId = state.decodedIABConsentObj.cmpId;
    tcModel.cmpVersion = state.decodedIABConsentObj.cmpVersion;

    return tcModel.gvl.readyPromise.then(() => {
        tcModel.setAll();
        return TCString.encode(tcModel);
    });
}
