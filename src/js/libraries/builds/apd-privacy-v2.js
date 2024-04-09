import {state} from "../../state";

export function decodeApdPrivacyV2Consent(consent) {
    let encoded = consent && consent.includes('~') ? consent.split('~') : '';
    const decoded = encoded[encoded.length - 1].split('.') ?? [];

    const findSelectedIds = Object.values(state.appodealsVendorList).map(apd => {
        const idx = decoded.findIndex(status => apd.status === status);
        return idx > -1 ? apd.id : null
    }).filter(Boolean);

    return {
        cmpId: state.cmpId,
        cmpVersion: encoded[0],
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
        IABTCF_ApdPrivacyConsent: state.currentVersion + '~' + statuses.join('.')
    }
}
