import './js/polyfills';
import './styles/index.scss';
import {state} from './js/state';
import {ConsentManagerPlatform} from "../stubs/consent-manager-platform";
import {displayScreens} from "./js/consent-ui";


let isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if (isiOS) {
    document.body.classList.add('ios');
}

window.cmp = new ConsentManagerPlatform();
displayScreens.renderAllVendors();
displayScreens.initControls();

const params = new URLSearchParams(document.location.search);

if ([
    'AcceptEverything', // user can only accept all or decline all
    'AcceptVendors' // user can choose vendor to give consent
].includes(params.get('consentDialogVersion'))) {
    state.consentDialogVersion = params.get('consentDialogVersion');
}

if (navigator.userAgent.toLowerCase().indexOf('android 4') !== -1) {
    document.body.classList.add('android4');
}

if (process.env.NODE_ENV !== 'production') {
    import('../stubs/run-without-sdk-with-test-data');
}

