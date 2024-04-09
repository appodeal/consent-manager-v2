import {TCString} from "../cjs";
import {state} from '../../state';
import {TypesTCF} from '../../helpers';

export function decodeIABTCFConsent(consentString) {
    if (!consentString || !Object.keys(consentString).length) {
        return;
    }

    const myTcModel = new TCString.decode(consentString.IABTCF_TCString ?? '');

    return {
        ...consentString,
        cmpId: state.cmpId,
        cmpVersion: myTcModel.cmpVersion_,
        policyVersion: myTcModel.policyVersion_,
        consentLanguage: myTcModel.consentLanguage_,
        purposeOneTreatment: myTcModel.purposeOneTreatment_,

        vendorConsents: myTcModel.vendorConsents.set_,
        vendorLegitimateInterests: myTcModel.vendorLegitimateInterests.set_,

        purposeConsents: myTcModel.purposeConsents.set_,
        purposeLegitimateInterests: myTcModel.purposeLegitimateInterests.set_,

        specialFeatureOptins: myTcModel.specialFeatureOptins.set_,

        IABTCF_gdprApplies: consentString.IABTCF_gdprApplies,

        IABTCF_PublisherRestrictions: consentString.IABTCF_PublisherRestrictions,
        IABTCF_PublisherConsent: consentString.IABTCF_PublisherConsent,
        IABTCF_PublisherLegitimateInterests: consentString.IABTCF_PublisherLegitimateInterests,
        IABTCF_PublisherCustomPurposesConsents: consentString.IABTCF_PublisherCustomPurposesConsents,
        IABTCF_PublisherCustomPurposesLegitimateInterests: consentString.IABTCF_PublisherCustomPurposesLegitimateInterests
    };
}

// build consent
export function buildIABTCF(tcModel, vendorList) {
    const tcf = TypesTCF.IAB_TCF_V2;
    const prevVendor = state.decodedPreviouslyVendor.get(tcf);
    return {
        IABTCF_CmpSdkID: state.cmpId, // For certification we should implement our TCF IAB ID. Id number is 432
        IABTCF_CmpSdkVersion: tcModel.cmpVersion_,
        IABTCF_PolicyVersion: tcModel.policyVersion_,

        IABTCF_gdprApplies: prevVendor ? prevVendor.IABTCF_gdprApplies : undefined,

        IABTCF_PublisherCC: tcModel.publisherCountryCode_,
        IABTCF_PurposeOneTreatment: getStringFromBool(tcModel.purposeOneTreatment_),
        IABTCF_UseNonStandardTexts: getStringFromBool(tcModel.useNonStandardTexts_),
        IABTCF_TCString: TCString.encode(tcModel),
        IABTCF_VendorConsents: buildBinaryString(vendorList.vendors, tcModel.vendorConsents),
        IABTCF_VendorLegitimateInterests: buildBinaryString(vendorList.vendors, tcModel.vendorLegitimateInterests),
        IABTCF_PurposeConsents: buildBinaryString(vendorList.purposes, tcModel.purposeConsents),
        IABTCF_PurposeLegitimateInterests: buildBinaryString(vendorList.purposes, tcModel.purposeLegitimateInterests),
        IABTCF_SpecialFeaturesOptIns: buildBinaryString(vendorList.specialFeatures, tcModel.specialFeatureOptins),

        IABTCF_PublisherRestrictions: '',
        IABTCF_PublisherConsent: '',
        IABTCF_PublisherLegitimateInterests: '',
        IABTCF_PublisherCustomPurposesConsents: '',
        IABTCF_PublisherCustomPurposesLegitimateInterests: '',
    }
}

function buildBinaryString(list, tcModel) {
    return Object.values(list).map(v => tcModel.has(v.id) ? 1 : 0).join('');
}

function getStringFromBool(item) {
    return item ? '1' : '0';
}
