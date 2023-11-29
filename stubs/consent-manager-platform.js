import {state} from "../src/js/state";
import {
    checkSelectedVendors,
    renderAppName,
    renderLogo
} from "../src/js/consent-ui";
import {decodeIABTCFConsent} from "../src/js/libraries/builds/iab";
import {decodeGooglePrivacyConsent} from "../src/js/libraries/builds/google-privacy";

export class ConsentManagerPlatform {
    resolveShowPromise;
    rejectShowPromise;

    resolveStatusPromise;
    rejectStatusPromise;

    authorizationStatusIOS;

    setApp(appName, version, icon) {
        state.currentVersion = Number(version);
        renderLogo(icon)
        renderAppName(appName);
    }

    setAuthorizationStatusIOS(authorizationStatus) {
        switch (authorizationStatus) {
            case 0:
                this.authorizationStatusIOS = 'NOT_DETERMINED';
                break;
            case 1:
                this.authorizationStatusIOS = 'RESTRICTED';
                break;
            case 2:
                this.authorizationStatusIOS = 'DENIED';
                break;
            case 3:
                this.authorizationStatusIOS = 'AUTHORIZED';
                break;
        }
    }

    onRequestAuthorizationStatusIOS() {};

    setConsent(tcf, consent) {
        // Present consent on page
        try {
            state.currentConsent = consent;
        } catch (e) {
            throw new Error(`Failed to parse consent JSON. ${e}`);
        }

        if (!state.currentConsent) {
            throw new Error(`Consent must be valid JSON.`);
        }

        switch (tcf) {
            case 'IAB_TCF_V2.2':
                state.decodedPreviouslyVendor.set(tcf, decodeIABTCFConsent(consent.IABTCF_TCString));
                checkSelectedVendors(state.decodedPreviouslyVendor.get(tcf));
                break;
            case 'GOOGLE_PRIVACY':
                state.decodedPreviouslyVendor.set(tcf, decodeGooglePrivacyConsent(consent));
                checkSelectedVendors(state.decodedPreviouslyVendor.get(tcf));
                break;
            case 'APD_PRIVACY_V2':
                state.decodedPreviouslyVendor.set(tcf, decodeGooglePrivacyConsent(consent.IABTCF_ApdPrivacyConsent));
                checkSelectedVendors(state.decodedPreviouslyVendor.get(tcf));
                break;
        }

    }

    onUpdateConsent(tcf, consent) {
        console.log('Version:', tcf, 'Consent:', consent);
    };

    async show() {
        if (this.authorizationStatusIOS === 'NOT_DETERMINED') {
            this.onRequestAuthorizationStatusIOS().then((res, rej) => {
                this.rejectStatusPromise = res;
                this.rejectStatusPromise = rej;
            });
        }

        return new Promise((resolve, reject) => {
            this.resolveShowPromise = resolve;
            this.rejectShowPromise = reject;
        }).then(isFinished => {
            console.log('Finished interactions with form:', isFinished);

            const body = document.body;
            if (isFinished) {
                body.classList.remove('show');
                body.setAttribute('style', 'display: none');
            } else {
                body.removeAttribute('style');
                body.classList.add('show');
            }

            return isFinished;
        });
    }
}
