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
        useNonStandardTexts: myTcModel.useNonStandardTexts,
        // tcString: myTcModel,

        vendorConsents: myTcModel.vendorConsents.set_,
        vendorLegitimateInterests: myTcModel.vendorLegitimateInterests.set_,

        purposeConsents: myTcModel.purposeConsents.set_,
        purposeLegitimateInterests: myTcModel.purposeLegitimateInterests.set_,

        specialFeatureOptins: myTcModel.specialFeatureOptins.set_,
        publisherRestrictions: myTcModel.publisherRestrictions,
        publisherConsents: myTcModel.publisherConsents,
        publisherLegitimateInterests: myTcModel.publisherLegitimateInterests,
        publisherCustomConsents: myTcModel.publisherCustomConsents,
        publisherCustomLegitimateInterests: myTcModel.publisherCustomLegitimateInterests
    };
}

export function buildConsentV2 (oldConsent) {
    const tcModel = new TCModel(new GVL(state.appodealsVendorList));

    tcModel.gvl.readyPromise.then(() => {

    });
}
