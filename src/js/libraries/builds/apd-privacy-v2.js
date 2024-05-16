import {state} from "../../state";

export function decodeApdPrivacyV2Consent(cons) {
    let consent = cons.IABTCF_ApdPrivacyConsent;
    let encoded = cons && consent && consent.includes('~') ? consent.split('~') : '';

    const lastElem = encoded[encoded.length - 1];
    const decoded = lastElem ? lastElem.split('.') : [];

    const findSelectedIds = Object.values(state.appodealsVendorList).map(apd => {
        const idx = decoded.findIndex(status => apd.status === status);
        return idx > -1 ? apd.id : null
    }).filter(Boolean);

    return {
        cmpId: state.cmpId,
        cmpVersion: Number(encoded[0]),
        policyVersion: '',
        consentLanguage: '',
        purposeOneTreatment: '',

        vendorConsents: new Set(findSelectedIds),
        vendorLegitimateInterests: new Set(),

        purposeConsents: new Set(),
        purposeLegitimateInterests: new Set(),

        specialFeatureOptins: new Set()
    };
}

export function buildApdPrivacyV2Consent (statuses) {
    return {
        IABTCF_ApdPrivacyConsent: state.CmpVersion + '~' + statuses.join('.')
    }
}
