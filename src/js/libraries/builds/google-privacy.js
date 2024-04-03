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
    };
}

export function buildGooglePrivacyConsent(vendorList) {
   return {
        IABTCF_AddtlConsent: buildIABTCF_AddtlConsent(vendorList)
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
