import {state} from "../state";
import {GVL, TCModel} from "./mjs";
import {normalizeId, onSave} from "../consent-ui";
import {buildGooglePrivacyConsent} from "./builds/google-privacy";
import {buildIABTCF} from "./builds/iab";
import {buildApdPrivacyV2Consent} from "./builds/apd-privacy-v2";


export async function selectChoices(tcf, vendorList, selected) {
    switch (tcf) {
        case 'IAB_TCF_V1.1':
            window.cmp.onUpdateConsent('IAB_TCF_V1.1', onSave());
            break;
        case 'IAB_TCF_V2.2':
            const gvl = new GVL(vendorList);
            const tcModel = new TCModel(gvl);

            tcModel.cmpId = state.allVendorList.get(tcf).vendorListVersion;
            tcModel.cmpVersion = state.currentVersion;

            await tcModel.gvl.readyPromise.then(() => {
                tcModel.vendorConsents.set(getIdFromElem(selected.vendors));
                tcModel.vendorLegitimateInterests.set(getIdFromElem(selected.vendorLegitimate));
                tcModel.purposeConsents.set(getIdFromElem(selected.purposes));
                tcModel.purposeLegitimateInterests.set(getIdFromElem(selected.purposeLegitimate));
                tcModel.specialFeatureOptins.set(getIdFromElem(selected.specialFeatures));

                window.cmp.onUpdateConsent(tcf, buildIABTCF(tcModel, vendorList));
            });

            break;
        case 'GOOGLE_PRIVACY':
            const getSelectedIds = [].concat(getIdFromElem(selected.vendors));
            const vendors = Object.values(vendorList);
            const selectedIdsFromCurrentVendor = vendors
                .map(v => getSelectedIds.find(id => v.id === id))
                .filter(Boolean);

            window.cmp.onUpdateConsent(tcf, buildGooglePrivacyConsent(selectedIdsFromCurrentVendor));
            break;
        case 'APD_PRIVACY_V2':
            // window.cmp.onUpdateConsent(tcf, buildApdPrivacyV2Consent(vendorList));
            break;
    }
}

function getIdFromElem(arr) {
    return arr.map(item => normalizeId(item.id));
}

export async function selectAll(tcf, vendorList) {
    switch (tcf) {
        case 'IAB_TCF_V1.1':
            window.cmp.onUpdateConsent('IAB_TCF_V1.1', onSave());
            break;
        case 'IAB_TCF_V2.2':
            const gvl = new GVL(vendorList);
            const tcModel = new TCModel(gvl);

            tcModel.cmpId = state.allVendorList.get(tcf).vendorListVersion;
            tcModel.cmpVersion = state.currentVersion;

            await tcModel.gvl.readyPromise.then(() => {
                tcModel.setAll();
                window.cmp.onUpdateConsent(tcf, buildIABTCF(tcModel, vendorList));
            });

            break;
        case 'GOOGLE_PRIVACY':
            const vendorIds = Object.keys(vendorList);
            window.cmp.onUpdateConsent(tcf, buildGooglePrivacyConsent(vendorIds));
            break;
        case 'APD_PRIVACY_V2':
            // window.cmp.onUpdateConsent(tcf, buildApdPrivacyV2Consent(vendorList));
            break;
    }
}
