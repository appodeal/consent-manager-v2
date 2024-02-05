import {state} from "../state";
import {GVL, TCModel} from "./cjs";
import {onSave} from "../consent-ui";
import {buildGooglePrivacyConsent} from "./builds/google-privacy";
import {buildIABTCF} from "./builds/iab";
import {buildApdPrivacyV2Consent} from "./builds/apd-privacy-v2";
import {normalizeId, TypesTCF} from "../helpers";


export async function selectChoices(tcf, vendorList, selected) {
    switch (tcf) {
        case TypesTCF.IAB_TCF_V1:
            window.cmp.onUpdateConsent(TypesTCF.IAB_TCF_V1, onSave());
            break;
        case TypesTCF.IAB_TCF_V2:
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
        case TypesTCF.GOOGLE_PRIVACY:
            const getSelectedIds = [].concat(getIdFromElem(selected.vendorsGoogle));
            const vendorsGoogle = Object.values(vendorList);
            const selectedIdsFromCurrentVendor = vendorsGoogle
                .map(v => getSelectedIds.find(id => v.id === id))
                .filter(Boolean);

            window.cmp.onUpdateConsent(tcf, buildGooglePrivacyConsent(selectedIdsFromCurrentVendor));
            break;
        case TypesTCF.APD_PRIVACY_V2:
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
        case TypesTCF.IAB_TCF_V1:
            window.cmp.onUpdateConsent(TypesTCF.IAB_TCF_V1, onSave());
            break;
        case TypesTCF.IAB_TCF_V2:
            const gvl = new GVL(vendorList);
            const tcModel = new TCModel(gvl);

            tcModel.cmpId = state.allVendorList.get(tcf).vendorListVersion;
            tcModel.cmpVersion = state.currentVersion;

            await tcModel.gvl.readyPromise.then(() => {
                tcModel.setAll();
                window.cmp.onUpdateConsent(tcf, buildIABTCF(tcModel, vendorList));
            });

            break;
        case TypesTCF.GOOGLE_PRIVACY:
            const vendorIds = Object.keys(vendorList);
            window.cmp.onUpdateConsent(tcf, buildGooglePrivacyConsent(vendorIds));
            break;
        case TypesTCF.APD_PRIVACY_V2:
            const statuses = Object.values(vendorList).map(v => v.status);
            window.cmp.onUpdateConsent(tcf, buildApdPrivacyV2Consent(statuses));
            break;
    }
}
