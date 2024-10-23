export const TypesTCF = {
    IAB_TCF_V1: 'IAB_TCF_V1.1',
    IAB_TCF_V2: 'IAB_TCF_V2.2',
    GOOGLE_PRIVACY: 'GOOGLE_PRIVACY',
    APD_PRIVACY_V2: 'APD_PRIVACY_V2',
    IAB_US_PRIVACY: 'IAB_US_PRIVACY',
}

export const AuthorizationStatuses = {
    NOT_DETERMINED: 'NOT_DETERMINED',
    RESTRICTED: 'RESTRICTED',
    DENIED: 'DENIED',
    AUTHORIZED: 'AUTHORIZED',
}

export function normalizeId(x) {
    const id = x.split('_');
    return Number(id[id.length - 1]);
}

export function getDaysFromSeconds(seconds) {
    const day = Math.floor(seconds / (3600 * 24));
    return day > 0 ? day + (day === 1 ? " (day)" : " (days)") : "";
}
