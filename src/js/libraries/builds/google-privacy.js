import {state} from "../../state";
import {TypesTCF} from '../../helpers';

export function decodeGooglePrivacyConsent(consent) {
    let encoded = consent.IABTCF_AddtlConsent.split('~');
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

        specialFeatureOptins: new Set(),

        IABTCF_idfaFlowControl: consent.IABTCF_idfaFlowControl,
        IABTCF_UseNonStandardStacks: consent.IABTCF_UseNonStandardStacks,
        IABTCF_UserConsentRecordId: consent.IABTCF_UserConsentRecordId,
    };
}

export function buildGooglePrivacyConsent(vendorList) {
    const tcf = TypesTCF.GOOGLE_PRIVACY;
    const prevVendor = state.decodedPreviouslyVendor.get(tcf);

    if (prevVendor) {
        return {
            IABTCF_idfaFlowControl: prevVendor.IABTCF_idfaFlowControl,
            IABTCF_UseNonStandardStacks: prevVendor.IABTCF_UseNonStandardStacks,
            IABTCF_AddtlConsent: buildIABTCF_AddtlConsent(vendorList),
            IABTCF_UserConsentRecordId: prevVendor.IABTCF_UserConsentRecordId,
        };
    }

    return {
        IABTCF_idfaFlowControl: '2',
        IABTCF_UseNonStandardStacks: '0',
        IABTCF_AddtlConsent: buildIABTCF_AddtlConsent(vendorList),
        IABTCF_UserConsentRecordId: '',
    };
}

function buildIABTCF_AddtlConsent(vendors) {
    let selectedMap = vendors.get('selected');
    let unSelectedMap = vendors.get('unselected');  // disclosed Google Ad Tech Provider (ATP) IDs

    let selected = '';
    let unselected = '';

    if (selectedMap.length) {
        if (Number(state.currentVersion) === 2) {
            selected = "2~" + selectedMap.join('.');
        } else {
            return "1~" + selectedMap.join('.');
        }
    }

    if (unSelectedMap.length) {
        unselected = "~dv." + unSelectedMap.join('.');
    }

    return selected + unselected;
}
