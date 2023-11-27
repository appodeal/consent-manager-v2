import {state} from "../state";
import {GVL, TCModel, TCString} from "./mjs";
import {onSave} from "../consent-ui";
import {buildGooglePrivacyConsent} from "./builds/google-privacy";
import {buildIABTCF} from "./builds/iab";
import {buildApdPrivacyV2Consent} from "./builds/apd-privacy-v2";


export function selectChoices(tcf, vendorList, selected) {
    const gvl = new GVL(vendorList);
    const tcModel = new TCModel(gvl);

    tcModel.cmpId = state.decodedPreviouslyVendor.get(tcf).cmpId;
    tcModel.cmpVersion = state.decodedPreviouslyVendor.get(tcf).cmpVersion;

    return tcModel.gvl.readyPromise.then(() => {
        tcModel.vendorConsents.set(selected.vendors);
        tcModel.vendorLegitimateInterests.set(selected.vendorLegitimate);
        tcModel.purposeConsents.set(selected.purposes);
        tcModel.purposeLegitimateInterests.set(selected.purposeLegitimate);
        tcModel.specialFeatureOptins.set(selected.specialFeatures);

        updateConsent(tcf, tcModel, vendorList);
    });
}

export async function selectAll(tcf, vendorList) {
    const gvl = new GVL(vendorList);
    const tcModel = new TCModel(gvl);

    tcModel.cmpId = state.decodedPreviouslyVendor.get(tcf).cmpId;
    tcModel.cmpVersion = state.decodedPreviouslyVendor.get(tcf).cmpVersion;

    return tcModel.gvl.readyPromise.then(() => {
        tcModel.setAll();
        updateConsent(tcf, tcModel, vendorList);
    });
}

function updateConsent(tcf, tcModel, vendorList) {
    switch (tcf) {
        case 'IAB_TCF_V1.1':
            window.cmp.onUpdateConsent('IAB_TCF_V1.1', onSave());
            break;
        case 'IAB_TCF_V2.2':
            window.cmp.onUpdateConsent('IAB_TCF_V2.2', buildIABTCF(tcModel, vendorList));
            break;
        case 'GOOGLE_PRIVACY':
            window.cmp.onUpdateConsent('GOOGLE_PRIVACY', buildGooglePrivacyConsent(tcModel, vendorList));
            break;
        case 'APD_PRIVACY_V2':
            this.onUpdateConsent('APD_PRIVACY_V2', buildApdPrivacyV2Consent(tcModel, vendorList));
            break;
    }
}
