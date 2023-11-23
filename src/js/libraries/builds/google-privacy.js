export function buildGooglePrivacyConsent(consent, ids) {
    const {iab} = consent;

    return {
        IABTCF_idfaFlowControl: iab.IABTCF_idfaFlowControl,
        IABTCF_UseNonStandardStacks: iab.IABTCF_idfaFlowControl,
        IABTCF_AddtlConsent: "1~" + ids.join('.'),
        IABTCF_UserConsentRecordId: "277E81D6-5E13-4930-A0BC-4D61D60F3B29"
    }
}
