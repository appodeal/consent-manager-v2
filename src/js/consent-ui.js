import {state} from './state';
import {buildConsent} from './libraries/consent-framework-v1';
import {selectAll, selectChoices} from "./libraries/consent-framework-v2";
import {getDaysFromSeconds, TypesTCF} from "./helpers";


//  ---------- build consent for IAB_TCF_V1.1 ----------
export function onSave() {
    if (state.consentDialogVersion === 'AcceptVendors') {
        const apdIds = Array.from(document.querySelectorAll('.vendorList input:checked')).map(function (x) {
            return Number(x.name);
        });

        let nextStatus = 'PARTLY_PERSONALIZED';
        if (Object.values(state.appodealsVendorList.vendors).length === apdIds.length) {
            nextStatus = 'PERSONALIZED';
        } else if (apdIds.length === 0) {
            nextStatus = 'NON_PERSONALIZED';
        }

        return save(nextStatus, apdIds);
    } else {
        return save('PERSONALIZED', Object.values(state.appodealsVendorList.vendors).map(v => v.apdId));
    }
}

function save(nextStatus, apdIds) {
    const nextAcceptedVendors = Object.values(state.appodealsVendorList.vendors)
        .filter(vendor => apdIds.includes(vendor.apdId))
        .map(vendor => ({apdId: vendor.apdId, status: vendor.status}));

    const nextIab = Object.assign(
        {},
        state.currentConsent.iab,
        buildConsent(
            state.appodealsVendorList,
            Object.values(state.appodealsVendorList.purposes).map(p => p.id),
            nextAcceptedVendors.map(v => v.apdId)
        )
    );

    return Object.assign(
        {},
        state.currentConsent,
        {
            vendorListVersion: state.appodealsVendorList.apdVendorListVersion,
            status: nextStatus,
            acceptedVendors: nextAcceptedVendors,
            iab: nextIab
        }
    );

    ConsentManager.send(JSON.stringify(nextConsent));
    setTimeout(() => ConsentManager.closeWebView());
}

//  ----------------------------------------------------

const timeoutMap = new Map();
export const displayScreens = {
    screen: document.getElementsByClassName('screen'),
    screenOne: document.getElementsByClassName('screen--one')[0],
    screenTwo: document.getElementsByClassName('screen--two')[0],
    screenThree: document.getElementsByClassName('screen--three')[0],

    // remove class show
    initControls: function () {
        const manageOptions = document.getElementById('manageOptions');
        const vendorPreferences = document.getElementById('vendorPreferences');
        const backScreenList = Array(...document.getElementsByClassName('backScreen'));

        const dialogBtnList = Array(...document.getElementsByClassName('dialog--open'));
        const dialogBtnClose = Array(...document.getElementsByClassName('dialog__btn'));

        const consentBtn = document.getElementById('consentBtn');
        const doNotConsentBtn = document.getElementById('doNotConsentBtn');

        const confirmChoices = Array(...document.getElementsByClassName('confirmChoices'));
        const acceptAll = Array(...document.getElementsByClassName('acceptAll'));

        const showAllVendors = document.getElementById('allVendors');

        this.attachCollapsible();

        this.removeListener(manageOptions, vendorPreferences, backScreenList, dialogBtnList, dialogBtnClose, consentBtn, doNotConsentBtn, confirmChoices, acceptAll, showAllVendors);
        this.addListener(manageOptions, vendorPreferences, backScreenList, dialogBtnList, dialogBtnClose, consentBtn, doNotConsentBtn, confirmChoices, acceptAll, showAllVendors);
    },
    removeListener: function (manageOptions, vendorPreferences, backScreenList, dialogBtnList, dialogBtnClose, consentBtn, doNotConsentBtn, confirmChoices, acceptAll, showAllVendors) {
        manageOptions.removeEventListener('click', this.showScreenTwo, true);
        vendorPreferences.removeEventListener('click', this.showScreenThree, true);
        backScreenList.forEach(item => item.removeEventListener('click', this.backToPreviousScreen, true));

        dialogBtnList.forEach(item => item.removeEventListener('click', this.showDialog, true));
        dialogBtnClose.forEach(item => item.removeEventListener('click', this.closeDialog, true));

        consentBtn.removeEventListener('click', this.consentFn, true);
        doNotConsentBtn.removeEventListener('click', this.doNotConsentFn, true);

        confirmChoices.forEach(item => item.removeEventListener('click', this.confirmChoicesFn, true));
        acceptAll.forEach(item => item.removeEventListener('click', this.acceptAllFn, true));

        vendorPreferences.removeEventListener('click', this.showScreenThree, true);

        showAllVendors.removeEventListener('click', this.showAllVendors(), true);
    },
    addListener: function (manageOptions, vendorPreferences, backScreenList, dialogBtnList, dialogBtnClose, consentBtn, doNotConsentBtn, confirmChoices, acceptAll, showAllVendors) {
        manageOptions.addEventListener('click', this.showScreenTwo.bind(this), true);
        vendorPreferences.addEventListener('click', this.showScreenThree.bind(this), true);
        backScreenList.forEach(item => item.addEventListener('click', this.backToPreviousScreen, true));

        dialogBtnList.forEach(item => item.addEventListener('click', this.showDialog.bind(this, item), true));
        dialogBtnClose.forEach(item => item.addEventListener('click', this.closeDialog.bind(this, item), true));

        consentBtn.addEventListener('click', this.consentFn.bind(this), true);
        doNotConsentBtn.addEventListener('click', this.doNotConsentFn.bind(this), true);

        confirmChoices.forEach(item => item.addEventListener('click', this.confirmChoicesFn.bind(this, item), true));
        acceptAll.forEach(item => item.addEventListener('click', this.acceptAllFn.bind(this, item), true));

        showAllVendors.addEventListener('click', this.showAllVendors.bind(this), true);
    },
    hideAllScreens: function () {
        try {
            Array(...this.screen).forEach(item => item.classList.remove("show"));
            this.scrollToTop();
        }
        catch(error) {
            this.throwErrorObject(error)
        }
    },
    showAllVendors: function (vendors) {
        try {
            if (!vendors || !Array.isArray(vendors)) {
                return;
            }
            console.log('Show all vendors in dialog');
            const list = vendors.map(vendor => `<li>${vendor.name}</li>`).join('');
            document.getElementById('allVendors').innerHTML += `${list}`;
        }
        catch(error) {
            this.throwErrorObject(error)
        }

    },
    showScreenTwo: function () {
        try {
            this.hideAllScreens();
            this.screenTwo.classList.add('show');
        }
        catch(error) {
            this.throwErrorObject(error)
        }

    },
    showScreenThree: function () {
        try {
            this.hideAllScreens();
            this.screenThree.classList.add('show');
        }
        catch(error) {
            this.throwErrorObject(error)
        }

    },
    backToPreviousScreen: function () {
        try {
            const parent = this.closest('.screen');
            const previous = parent.previousElementSibling;
            parent.classList.remove('show');
            previous.classList.add('show');
            displayScreens.scrollToTop();
        }
        catch(error) {
            this.throwErrorObject(error)
        }
    },
    scrollToTop: function () {
        try {
            document.getElementsByClassName('screen__list')[0].scrollTo(0, 0);
        }
        catch(error) {
            this.throwErrorObject(error)
        }
    },
    scrollToTopDialog: function (id) {
        try {
            document.getElementById(id).scrollTo(0, 0);
        }
        catch(error) {
            this.throwErrorObject(error)
        }
    },
    attachCollapsible: function () {
        try {
            const timeouts = new Map();
            Array.from(document.querySelectorAll('.collapsable')).forEach(el => el.querySelector('.collapsable-body').style.height = '0px');
            Array.from(document.querySelectorAll('.collapsable .collapsable-title')).forEach(el => {
                el.addEventListener('click', function (e) {
                    const rootEl = e.target.closest('.collapsable');
                    const textEl = e.target.closest('.collapsable').querySelector('.collapsable-body');
                    clearTimeout(timeouts.get(textEl));
                    if (rootEl.classList.contains('expanded')) {
                        textEl.style.height = textEl.clientHeight + 'px';
                        timeouts.set(textEl, setTimeout(() => {
                            textEl.style.height = '0px';
                            rootEl.classList.remove('expanded');
                        }));
                    } else {
                        textEl.style.height = '0px';
                        textEl.style.height = textEl.scrollHeight + 'px';
                        rootEl.classList.add('expanded');
                        timeouts.set(textEl, setTimeout(() => textEl.style.removeProperty('height'), 200));
                    }
                });
            });
        }
        catch(error) {
            this.throwErrorObject(error)
        }
    },
    renderAllVendors: function () {
        try {
            saveVendorsAndRender(TypesTCF.IAB_TCF_V2, state.iabVendorList);
            saveVendorsAndRender(TypesTCF.GOOGLE_PRIVACY, state.googleVendorList);
            saveVendorsAndRender(TypesTCF.APD_PRIVACY_V2, state.appodealsVendorList);
            vendorsCountRender();
        }
        catch(error) {
            this.throwErrorObject(error)
        }
    },
    createCollapsible: function (title, body) {
        return `<div class="collapsable">
                <div class="collapsable-title">${title}</div>
                <div class="collapsable-body">${body}</div>
            </div>`;
    },
    showDialog: function (dialog) {
        try {
            const child = [...dialog.children].find(item => item.className === 'dialog');
            child.id = 'dialogId';
            child.showModal();
            displayScreens.scrollToTopDialog(child.id);
        }
        catch(error) {
            this.throwErrorObject(error)
        }
    },
    closeDialog: function (dialog) {
        try {
            if (dialog.parentNode.classList.value === 'dialog__footer') {
                let parent = dialog.parentElement.parentNode;
                parent.removeAttribute('id');
                parent.close();
            } else {
                let parent = dialog.parentNode;
                parent.removeAttribute('id');
                parent.close();
            }
        }
        catch(error) {
            this.throwErrorObject(error)
        }
    },
    consentFn: function () {
        try {
            this.acceptAllFn();
        }
        catch(error) {
            this.throwErrorObject(error)
        }
    },
    doNotConsentFn: function () {
        try {
            console.log('do not consent');
            this.confirmChoicesFn();
        }
        catch(error) {
            this.throwErrorObject(error)
        }
    },
    confirmChoicesFn: function () {
        try {
            console.log('confirm Choices');
            const selectedItems = this.buildChecked();
            [...state.allVendorList.keys()].forEach(async tcf => {
                await selectChoices(
                    tcf,
                    state.allVendorList.get(tcf),
                    selectedItems
                )
            });
            this.hideCmp();
        }
        catch(error) {
            this.throwErrorObject(error)
        }
    },
    acceptAllFn: function () {
        try {
            console.log('accept All');

            if (!state.allVendorList.size) {
                window.cmp.rejectFormFinished('VendorList is empty');
                return;
            }
    
            Array.from(document.querySelectorAll('.checkboxSwitcher')).forEach(el => {
                el.checked = true
            });
    
            // for example: new Set('IAB_TCF_V2.2', state.vendor)
            [...state.allVendorList.keys()].forEach(async tcf => {
                await selectAll(tcf, state.allVendorList.get(tcf));
            });
    
            this.hideCmp();
        }
        catch(error) {
            this.throwErrorObject(error)
        }

    },
    buildChecked: function () {
        try {
            const vendors = [
                ...document.querySelectorAll('.vendorList .checkboxSwitcher'),
                ...document.querySelectorAll('.vendorListAdPartner .checkboxSwitcher')
            ];
            const vendorLegitimate = document.querySelectorAll('.vendorList .checkboxSwitcher');
            const purposes = document.querySelectorAll('.purposeList .checkboxSwitcher');
            const purposeLegitimate = document.querySelectorAll('.purposeList .checkboxSwitcher');
            const specialFeature = document.querySelectorAll('.specialFeaturesList .checkboxSwitcher');
    
            return {
                vendorsIab: this.findChecked(vendors, 'vendor_'),
                vendorsGoogle: this.findChecked(vendors, 'vendorGoogle_'),
                vendorsApd: this.findChecked(vendors, 'vendorApd_'),
                vendorLegitimate: this.findChecked(vendorLegitimate, 'vendorLegitimate_'),
                purposes: this.findChecked(purposes, 'purpose_'),
                purposeLegitimate: this.findChecked(purposeLegitimate, 'purposeLegitimate_'),
                specialFeatures: this.findChecked(specialFeature, 'specialFeatures_'),
            }
        }
        catch(error) {
            this.throwErrorObject(error)
        }
    },
    findChecked: function (list, nameId) {
        try {
            return Array.from(list).map(v => v.checked && v.id.includes(nameId) ? v : '').filter(Boolean)
        }
        catch(error) {
            this.throwErrorObject(error)
        }
    },
    hideCmp: function () {
        try {
            console.log('hideCmp')
            window.cmp.resolveFormFinished(true);
        }
        catch(error) {
            this.throwErrorObject(error)
        }
    },
    throwErrorObject: function(error) {
        const currentError = {
            errorCode: undefined,
            errorName: error.name,
            description: error.message
        }
        window.cmp.rejectFormFinished(currentError);
    }
}

function checkHasOwnProp(vendorList, prop) {
    return vendorList && vendorList.hasOwnProperty(prop) ? Object.values(vendorList[prop]) : [];
}

function saveVendorsAndRender(tcf, vendorList) {
    state.allVendorList.set(tcf, vendorList);
    console.log('Display all vendors list:', state.allVendorList);
    renderVendors(tcf, vendorList);
}

function vendorsCountRender() {
    const vendorsInfoContentText = `${state.tcfVendorsCount} TCF vendor(s) and ${state.adVendorsCount} ad partner(s)`;
    const vendorsInfoElement = document.querySelector('.vendors-count-info');
    if (vendorsInfoElement) {
        vendorsInfoElement.innerHTML += vendorsInfoContentText;
    }
}

let currentVendorList;
export function renderVendors(tcf, vList) {
    const vendors = checkHasOwnProp(vList, 'vendors');
    const purposes = checkHasOwnProp(vList, 'purposes');
    const features = checkHasOwnProp(vList, 'features');
    const specialPurposes = checkHasOwnProp(vList, 'specialPurposes');
    const specialFeatures = checkHasOwnProp(vList, 'specialFeatures');

    const subSettingsOfVendors = ['purposes', 'specialPurposes', 'features', 'specialFeatures'];

    currentVendorList = {};
    const vendorList = vendors?.length ? {
        ...vList,
        purposes,
        specialPurposes,
        features,
        specialFeatures,
        vendors
    } : {
        purposes: [],
        specialPurposes: [],
        features: [],
        specialFeatures: [],
        vendors: vList ? Object.values(vList) : [],
    };
    currentVendorList = Object.assign({}, vendorList);

    function vendorTitle(vendor) {
        if (state.consentDialogVersion === 'AcceptEverything') {
            return `
                ${vendor.name}
                ${vendor.usesCookies
                ? `<p>Cookie duration: ${getDaysFromSeconds(vendor.cookieMaxAgeSeconds)}. Cookie duration resets each
                    session. Uses other forms of storage.</p>`
                : `<p>Doesn't use cookies</p>`
            }`;
        }

        return ``;
    }

    buildListConsentFirstPage(vendorList)

    displayScreens.showAllVendors(vendorList.vendors);

    const htmlVendorList = vendorList
        .vendors
        .map(vendor =>
            createPreferences(
                `${vendorTitle(vendor)}`,
                `
                ${buildDetails(vendor, subSettingsOfVendors)}
                ${buildConsentSwitcher(tcf, vendor)}
                ${buildLegIntPurposesSwitcher(tcf, vendor)}
            `)
        )
        .join('');


    let vendorListSelector;
    if (tcf === TypesTCF.IAB_TCF_V2) {
        vendorListSelector = document.querySelector('.vendorList');
        state.tcfVendorsCount += vendorList.vendors.length;
    } else {
        vendorListSelector = document.querySelector('.vendorListAdPartner');
        state.adVendorsCount += vendorList.vendors.length;
    }

    const storageDialog = document.querySelector('.dialog-storage');
    const closeBtn = document.querySelector('.storage-dialog-close-btn');
    if(closeBtn) {
        closeBtn.addEventListener("click", () => {
            if(storageDialog) {
                storageDialog.close();
            }
        });
    }
    setVendorsToTemplate(vendorListSelector, htmlVendorList);

    setTimeout(() => initStorageDisclosureDialog(vendorList, storageDialog));
}

function initStorageDisclosureButton(vendor) {
    if (!(vendor.hasOwnProperty('deviceStorageDisclosure') && vendor.deviceStorageDisclosure)) {
        return '';
    }
    return `
    <div class="preferences__link" id="vendorStorageDetails_${vendor.id}">
        <span>Storage details</span>
    </div>
    `;
}

function initStorageDisclosureDialog(vendorList, storageDialog) {
    vendorList.vendors.forEach(vendor => {
        if (vendor.hasOwnProperty('deviceStorageDisclosure') && vendor.deviceStorageDisclosure) {
            const storageDetailsLink = document.getElementById('vendorStorageDetails_' + vendor.id);
            if(storageDetailsLink) {
                storageDetailsLink.addEventListener("click", () => {
                    if(storageDialog) {
                        storageDialog.showModal();
                    }
                    const dialogConent = document.querySelector('.dialog__content--storage');

                    if(vendor.deviceStorageDisclosure.disclosures?.length) {
                        vendor.deviceStorageDisclosure.disclosures.forEach(disclosure => {
                            const name = disclosure.identifier || '';
                            const type = disclosure.type || '';
                            const duration = Math.round(disclosure.maxAgeSeconds/3600/24) || 0;
                            const domains = disclosure.domains || [];
                            const purposes = disclosure.purposes.map(purposeId => vendorList.purposes[purposeId]?.name);
                            const cookieRefresh = disclosure.cookieRefresh || false;

                            const dialogHtml = `
                                <b>Name:</b><span> ${name}</span></br>
                                <b>Type:</b><span> ${type}</span></br>
                                <b>Duration:</b><span> ${duration} (days)</span></br>
                                <b>Domain:</b><span> *${domains}</span></br>
                                <b>Purposes:</b></br><ul class="dialog__list">${buildPurpose(purposes)}</ul>
                                <b>Refreshes Cookies:</b><span> ${cookieRefresh}</span>
                                </br></br>`;
                            if(dialogConent) {
                                dialogConent.innerHTML += dialogHtml;
                            }
                        })
                    }
                    
                });
            }
        }
    });
}
function buildPurpose(purposes) {
    return purposes.map(p => `<li>${p}</li>`)
    .join('');
}

function setVendorsToTemplate(selector, htmlVendorList) {
    if (selector.childNodes.length > 0) {
        selector.innerHTML += htmlVendorList;
    } else {
        selector.innerHTML = htmlVendorList;
    }
}

//  --------------------- find privacy link by current lang ---------------------
function vendorPolicyUrl(vendor) {
    if (!vendor.urls[0].privacy) {
        return '';
    }
    return `<a href="${vendor.urls[0].privacy}" target="_blank" class="preferences__link">
                <span>Privacy Policy <i class="icn icn-privacy-policy"></i></span>
            </a>`;
}

function buildDetails(vendor, subSettings) {
    return `<div class="preferences__list-link">
                ${hasSubSettings(currentVendorList, subSettings) ? `<div class="preferences__link dialog--open">
                    <span>View details</span>
                    <dialog class="dialog">
                        <h3 class="dialog__title">${vendor.name}</h3>
                        <div class="dialog__content">
                            <span class="dialog__txt">To ${vendor.name} vendors can:</span>
                            <ul class="dialog__list">
                                ${buildConsentNamesList(vendor, subSettings)}
                            </ul>
                        </div>

                        <div class="dialog__footer">
                            <button class="button button-primary-inverted dialog__btn">Close</button>
                        </div>
                    </dialog>
                </div>` : `<div class="preferences__list-link"></div>`}
                ${initStorageDisclosureButton(vendor)}
                ${vendorPolicyUrl(vendor)}
            </div>`
}

function buildConsentNamesList(vendor, keySettings) {
    return keySettings.map(key => {
        if (!vendor[key] || !vendor[key].length) {
            return;
        }

        return vendor[key]
            .map(p => `<li>${currentVendorList[key].find(item => item.id === p).name}</li>`)
            .join('');
    }).join('');
}

function hasSubSettings(vendor, itemSettings) {
    return itemSettings.some(item => vendor && vendor.hasOwnProperty(item) && vendor[item].length);
}

function getSubNameVendorId(tcf) {
    return tcf === TypesTCF.GOOGLE_PRIVACY ? 'vendorGoogle_' : tcf === TypesTCF.APD_PRIVACY_V2 ? 'vendorApd_' : 'vendor_';
}

function buildConsentSwitcher(tcf, vendor) {
    const subNameId = getSubNameVendorId(tcf);
    const switcher = `<div class="switch-control">
                        <div class="switch-control__label">Consent</div>
                        <label class="switch-control" for="${subNameId + vendor.id}">
                            <input type="checkbox"
                                   class="checkboxSwitcher"
                                   id="${subNameId + vendor.id}"
                                   name="${subNameId + vendor.id}"
                            />
                            <span class="track">
                                <span class="peg"></span>
                            </span>
                        </label>
                     </div>`

    return tcf !== TypesTCF.IAB_TCF_V2 || (vendor.features && vendor.features.length) ? switcher : '';
}

function buildLegIntPurposesSwitcher(tcf, vendor) {
    if (tcf !== TypesTCF.IAB_TCF_V2) {
        return '';
    }

    return vendor.legIntPurposes && vendor.legIntPurposes.length
        ? `<div class="switch-control">
                <div class="switch-control__label">
                    Legitimate interest
                    <i class="icn dialog--open icn-help">
                        <dialog class="dialog">
                            <h4 class="dialog__title">How does legitimate interest work?</h4>
                            <div class="dialog__content">
                                <span>Some vendors are not asking for you consent, but are using personal data on the basis of their legitimate interest.</span>
                            </div>
                            <div class="dialog__footer">
                                <button class="button button-primary-inverted dialog__btn">Close</button>
                            </div>
                        </dialog>
                    </i>
                </div>
                <label class="switch-control" for="${'vendorLegitimate_' + vendor.id}">
                    <input type="checkbox"
                           class="checkboxSwitcher"
                           id="${'vendorLegitimate_' + vendor.id}"
                           name="${'vendorLegitimate_' + vendor.id}"
                    />
                    <span class="track">
                        <span class="peg"></span>
                    </span>
                </label>
            </div>`
        : '';
}

function buildListConsentFirstPage(vendorList) {
    buildPurposesList(
        '.purposeList',
        vendorList.purposes,
        'purpose',
        vendorList.vendors
    );

    buildPurposesList(
        '.specialPurposeList',
        vendorList.specialPurposes,
        'specialPurpose',
        vendorList.vendors
    );

    buildPurposesList(
        '.featuresList',
        vendorList.features,
        'features',
        vendorList.vendors
    );

    buildPurposesList(
        '.specialFeaturesList',
        vendorList.specialFeatures,
        'specialFeatures',
        vendorList.vendors
    );
}

function buildPurposesList(selector, list, type, vendors) {
    if (list.length === 0) {
        return '';
    }

    document.querySelector(selector).innerHTML = list
        .map(item => {
            const consentCount = vendors.filter(vendor => vendor?.purposes?.some(purpose => purpose === item.id)).length || 0;
            const legitimateInterestCount = vendors.filter(vendor => vendor?.legIntPurposes?.some(purpose => purpose === item.id)).length || 0;
            vendors.filter(vendor => vendor.legIntPurposes.some(purpose => purpose === item.id)).length
            return createPreferences(
                createTitlePreferences(
                    item.name,
                    ``
                ),
                `<p>${item.description}</p>
                      <div class="switch-control">
                          <div class="switch-control__label">Consent (${consentCount} vendors)</div>
                          <label class="switch-control" for="${type + '_' + item.id}">
                              <input type="checkbox"
                                     class="checkboxSwitcher"
                                     id="${type + '_' + item.id}"
                                     name="${type + '_' + item.id}">
                              <span class="track">
                                  <span class="peg"></span>
                              </span>
                          </label>
                      </div>

                      ${true ? `<div class="switch-control">
                          <div class="switch-control__label">
                              Legitimate interest (${legitimateInterestCount} vendors)
                              <i class="icn dialog--open icn-help">
                                  <dialog class="dialog">
                                      <h4 class="dialog__title">How does legitimate interest work?</h4>
                                      <div class="dialog__content">
                                          <span>Some vendors are not asking for you consent, but are using personal data on the basis of their legitimate interest.</span>
                                      </div>
                                      <div class="dialog__footer">
                                          <button class="button button-primary-inverted dialog__btn">Close</button>
                                      </div>
                                  </dialog>
                              </i>
                          </div>
                          <label class="switch-control" for="${type + 'Legitimate_' + item.id}">
                              <input type="checkbox"
                                     class="checkboxSwitcher"
                                     id="${type + 'Legitimate_' + item.id}"
                                     name="${type + 'Legitimate_' + item.id}"
                              />
                              <span class="track">
                                  <span class="peg"></span>
                              </span>
                          </label>
                      </div>` : ''}`
            )}
        ).join('');
}

export function createPreferences(title, body) {
    return `<div class="preferences__item">
                ${title}
                ${body}
            </div>`;
}

export function createTitlePreferences(title, dialogBody) {
    return `<h3>
                ${title}
                ${dialogBody ? `<i class="icn dialog--open icn-help"><dialog class="dialog">${dialogBody}</dialog></i>` : ''}
            </h3>`;
}

export function renderLogo(base64img) {
    const img = document.querySelector('.logo img');
    if (base64img) {
        img.src = base64img;
    } else {
        img.style.display = 'none';
    }
}

export function renderAppName(appName) {
    const app = document.querySelector(".logo h2");
    app.innerText = appName;
}

export function checkSelectedVendors(tcf, decodedConsentObj) {
    if (!decodedConsentObj) {
        return;
    }

    // checked purpose consent
    decodedConsentObj.purposeConsents.forEach(id => {
        document.getElementById('purpose_' + id).checked = true;
    });

    // checked purpose legitimate
    decodedConsentObj.purposeLegitimateInterests.forEach(id => {
        const selector = document.getElementById('purposeLegitimate_' + id);
        if (!selector) {
            return;
        }

        selector.checked = true;
    });

    // checked specialFeatures
    decodedConsentObj.specialFeatureOptins.forEach(id => {
        const selector = document.getElementById('specialFeatures_' + id);
        if (!selector) {
            return;
        }

        selector.checked = true;
    });

    // checked consent
    decodedConsentObj.vendorConsents.forEach(id => {
        let selector;
        switch (tcf) {
            case TypesTCF.GOOGLE_PRIVACY:
                selector = document.getElementById('vendorGoogle_' + id);
                break;
            case TypesTCF.APD_PRIVACY_V2:
                selector = document.getElementById('vendorApd_' + id);
                break;
            default:
                selector = document.getElementById('vendor_' + id);
                break;
        }

        if (!selector) {
            return;
        }

        selector.checked = true;
    });

    // checked legitimate
    decodedConsentObj.vendorLegitimateInterests.forEach(id => {
        const selector = document.getElementById('vendorLegitimate_' + id);
        if (!selector) {
            return;
        }

        selector.checked = true;
    });
}


