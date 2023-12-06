import {TCString} from "../cjs";

export function decodeIABTCFConsent(consentString) {
    if (!consentString) {
        return;
    }

    const myTcModel = new TCString.decode(consentString);

    return {
        cmpId: myTcModel.cmpId_,
        cmpVersion: myTcModel.cmpVersion_,
        policyVersion: myTcModel.policyVersion_,
        consentLanguage: myTcModel.consentLanguage_,
        purposeOneTreatment: myTcModel.purposeOneTreatment_,

        vendorConsents: myTcModel.vendorConsents.set_,
        vendorLegitimateInterests: myTcModel.vendorLegitimateInterests.set_,

        purposeConsents: myTcModel.purposeConsents.set_,
        purposeLegitimateInterests: myTcModel.purposeLegitimateInterests.set_,

        specialFeatureOptins: myTcModel.specialFeatureOptins.set_
    };
}

// build consent
export function buildIABTCF(tcModel, vendorList) {
    return {
        IABTCF_CmpSdkID: tcModel.cmpId_,
        IABTCF_CmpSdkVersion: tcModel.cmpVersion_,
        IABTCF_PolicyVersion: tcModel.policyVersion_,
        IABTCF_gdprApplies: tcModel.gdprApplies,
        IABTCF_PublisherCC: tcModel.publisherCountryCode_,
        IABTCF_PurposeOneTreatment: getStringFromBool(tcModel.purposeOneTreatment_),
        IABTCF_UseNonStandardTexts: getStringFromBool(tcModel.useNonStandardTexts_),
        IABTCF_TCString: TCString.encode(tcModel),
        IABTCF_VendorConsents: buildBinaryString(vendorList.vendors, tcModel.vendorConsents),
        IABTCF_VendorLegitimateInterests: buildBinaryString(vendorList.vendors, tcModel.vendorLegitimateInterests),
        IABTCF_PurposeConsents: buildBinaryString(vendorList.purposes, tcModel.purposeConsents),
        IABTCF_PurposeLegitimateInterests: buildBinaryString(vendorList.purposes, tcModel.purposeLegitimateInterests),
        IABTCF_SpecialFeaturesOptIns: buildBinaryString(vendorList.specialFeatures, tcModel.specialFeatureOptins),
        IABTCF_PublisherRestrictions: tcModel.publisherRestrictions,
        IABTCF_PublisherConsent: tcModel.purposeConsents,
        IABTCF_PublisherLegitimateInterests: tcModel.publisherLegitimateInterests,
        IABTCF_PublisherCustomPurposesConsents: tcModel.publisherCustomConsents,
        IABTCF_PublisherCustomPurposesLegitimateInterests: tcModel.publisherCustomLegitimateInterests
    }
}

function buildBinaryString(list, tcModel) {
    return Object.values(list).map(v => tcModel.has(v.id) ? 1 : 0).join('');
}

function getStringFromBool(item) {
    return item ? '1' : '0';
}
