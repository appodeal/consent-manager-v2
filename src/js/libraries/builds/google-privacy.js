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

export function buildGooglePrivacyConsent(vendorList, prevTcModel) {
   return {
       IABTCF_AddtlConsent: buildIABTCF_AddtlConsent(vendorList),
    };
}

function buildIABTCF_AddtlConsent(vendors) {
    let selectedMap = vendors.get('selected');
    let unSelectedMap = vendors.get('unselected');  // disclosed Google Ad Tech Provider (ATP) IDs

    let selected = selectedMap.length ? currentVersion() + '~' + selectedMap.join('.') : currentVersion();
    let unselected = '';

    if (unSelectedMap.length) {
        unselected = "~dv." + unSelectedMap.join('.');
    }

    return selected + unselected;
}

function currentVersion() {
    return Number(state.currentVersion) === 2 ? '2' : '1';
}
