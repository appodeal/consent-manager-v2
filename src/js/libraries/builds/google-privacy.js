import {state} from "../../state";

export function decodeGooglePrivacyConsent(consent) {
    let encoded = consent.split('~');
    const decoded = encoded[encoded.length - 1].split('.');

    return {
        cmpId: encoded[0],
        cmpVersion: '',
        policyVersion: '',
        consentLanguage: '',
        purposeOneTreatment: '',

        vendorConsents: new Set(decoded),
        vendorLegitimateInterests: new Set(),

        purposeConsents: new Set(),
        purposeLegitimateInterests: new Set(),

        specialFeatureOptins: new Set()
    };
}

export function buildGooglePrivacyConsent(vendorListIds) {
    return {
        IABTCF_idfaFlowControl: '2',
        IABTCF_UseNonStandardStacks: '0',
        IABTCF_AddtlConsent: state.currentVersion + "~" + vendorListIds.join('.'),
        // do not know how to build IABTCF_UserConsentRecordId
        IABTCF_UserConsentRecordId: "277E81D6-5E13-4930-A0BC-4D61D60F3B29"
    };
}
