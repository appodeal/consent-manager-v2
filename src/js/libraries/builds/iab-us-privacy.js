import {state} from '../../state';

export function buildIabUsPrivacy(allowedVendorsList) {

    return {
        IABUSPrivacy_String: state.isCcpaZone ? `1Y${allowedVendorsList.length > 0 ? 'Y' : 'N'}N` : `1---`,
    }
}
