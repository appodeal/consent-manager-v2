/**
 * iOS specific authorization status for app tracking.
 */
enum AuthorizationStatusIOS {
    /**
     * The value that returns when the app can’t determine the user’s
     * authorization status for access to app-related data for tracking the
     * user or the device.
     */
    NOT_DETERMINED = 0,
    /**
     * The value that returns if authorization to access app-related data for
     * tracking the user or the device has a restricted status.
     */
    RESTRICTED = 1,
    /**
     * The value that returns if the user denies authorization to access
     * app-related data for tracking the user or the device.
     */
    DENIED = 2,
    /**
     * The value that returns if the user authorizes access to app-related data for
     * tracking the user or the device.
     */
    AUTHORIZED = 3,
}

/**
 * Consent object for IAB TCF.
 * Stored on the client side
 */
interface ConsentObject {
    [key: string]: any;
}

/**
 * Interface for the ConsentManagerPlatform.
 */
interface ConsentManagerPlatform {
    /**
     * Set the iOS authorization status for app tracking.
     * Should be called before trying to load form.
     * @param authorizationStatus The authorization status.
     */
    setAuthorizationStatusIOS(authorizationStatus: AuthorizationStatusIOS): void;
    /**
     * Request authorization status for app tracking.
     * @returns Closure that implements request authorization status.
     * on the SDK.
     */
    onRequestAuthorizationStatusIOS: () => Promise<AuthorizationStatusIOS>;
    /**
     * The SDK passes previously stored consent object to the ConsentManager.
     * Should be called before trying to load form.
     * @param tcf Version of TCF.
     * @param values ConsentObject.
     */
    setConsent(tcf: string, values: ConsentObject): void;
    /**
     * On update consent callback function.
     * @param tcf Version of TCF.
     * @param values ConsentObject.
     * @returns Closure implemented by the SDK.
     */
    onUpdateConsent: (tcf: string, values: ConsentObject) => void;
    /**
     * The SDK passes app data before trying to load form.
     * @param appName Localized app name.
     * @param version app version.
     * @param icon Base64 encoded app icon.
     */
    setApp(appName: string, version: string, icon: string): void;
    /**
     * Request to show form.
     * @returns Promise that returns true if form was shown successfully.
     * false if form was not shown.
     */
    show(): Promise<Boolean>;
}
