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
                tcModel.vendorConsents.set(getIdFromElem(selected.vendorsIab));
                tcModel.vendorLegitimateInterests.set(getIdFromElem(selected.vendorLegitimate));
                tcModel.purposeConsents.set(getIdFromElem(selected.purposes));
                tcModel.purposeLegitimateInterests.set(getIdFromElem(selected.purposeLegitimate));
                tcModel.specialFeatureOptins.set(getIdFromElem(selected.specialFeatures));

                window.cmp.onUpdateConsent(tcf, buildIABTCF(tcModel, vendorList));
            });

            break;
        case 'GOOGLE_PRIVACY':
            const getSelectedIds = [].concat(getIdFromElem(selected.vendorsGoogle));
            const vendorsGoogle = Object.values(vendorList);
            const selectedIdsFromCurrentVendor = vendorsGoogle
                .map(v => getSelectedIds.find(id => v.id === id))
                .filter(Boolean);

            window.cmp.onUpdateConsent(tcf, buildGooglePrivacyConsent(selectedIdsFromCurrentVendor));
            break;
        case 'APD_PRIVACY_V2':
            const selectedIds = [].concat(getIdFromElem(selected.vendorsApd));
            const vendorsApd = Object.values(vendorList);
            const selectedStatusesFromCurrentVendor = vendorsApd
                .map(v => {
                    const idx = selectedIds.findIndex(id => v.id === id);
                    return idx > -1 ? v.status : null
                })
                .filter(Boolean);

            window.cmp.onUpdateConsent(tcf, buildApdPrivacyV2Consent(selectedStatusesFromCurrentVendor));
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
            const statuses = Object.values(vendorList).map(v => v.status);
            window.cmp.onUpdateConsent(tcf, buildApdPrivacyV2Consent(statuses));
            break;
    }
}
