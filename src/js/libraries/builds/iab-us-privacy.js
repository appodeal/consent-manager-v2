export function buildIabUsPrivacy(allowedVendorsList) {

    return {
        IABUSPrivacy_String: window.isCcpaZone ? `1Y${allowedVendorsList.length > 0 ? 'Y' : 'N'}N` : `1---`,
    }
}
