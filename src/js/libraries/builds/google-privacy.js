import {state} from "../../state";

export function decodeGooglePrivacyConsent(consent) {
    let encoded = consent && consent?.IABTCF_AddtlConsent?.includes('~') ? consent.IABTCF_AddtlConsent.split('~') : '';
    const decoded = encoded[encoded.length - 1]?.split('.') ?? [];

    return {
        cmpId:  state.cmpId,
        cmpVersion: Number(encoded[0]),
        policyVersion: '',
        consentLanguage: '',
        purposeOneTreatment: '',

        vendorConsents: new Set(decoded),
        vendorLegitimateInterests: new Set(),

        purposeConsents: new Set(),
        purposeLegitimateInterests: new Set(),

        specialFeatureOptins: new Set(),
    };
}

export function buildGooglePrivacyConsent(vendorList) {
    return {
        IABTCF_AddtlConsent: buildIABTCF_AddtlConsent(vendorList),
    };
}

function buildIABTCF_AddtlConsent(vendors) {
    const selectedMap = vendors.get('selected');
    const unSelectedMap = vendors.get('unselected');  // disclosed Google Ad Tech Provider (ATP) IDs
    const version = state.CmpVersion + '~';

    let selected = selectedMap.length ? version + selectedMap.join('.') : version;
    let unselected = '~dv.';

    if (unSelectedMap.length) {
        unselected += unSelectedMap.join('.');
    }

    return selected + unselected;
}
