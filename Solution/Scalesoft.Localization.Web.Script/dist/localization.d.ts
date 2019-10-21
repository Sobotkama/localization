declare const LocalizationStatusSuccess: (text: string, scope: string) => ILocalizationStatus;
declare const LocalizationDictionaryStatusSuccess: (scope: string) => IDictionaryError;
declare class Localization {
    private mGlobalScope;
    private mCultureCookieName;
    private mCurrentCulture;
    private readonly mDictionary;
    private readonly mDictionaryQueue;
    private mPluralizedDictionary;
    private readonly mPluralizedDictionaryQueue;
    private readonly mLocalizationConfiguration;
    private mErrorHandlerCalled;
    constructor(localizationConfiguration?: ILocalizationConfiguration);
    private callErrorHandler;
    private getTranslationOnError;
    /**
     * @deprecated Use translateAsync or getDictionaryAsync() => translate
     */
    translate(text: string, scope?: string, cultureName?: string): ILocalizedString;
    translateAsync(text: string, scope?: string, cultureName?: string): Promise<ILocalizationResult>;
    /**
     *@deprecated Use translateFormatAsync or getDictionaryAsync() => translateFormat
     */
    translateFormat(text: string, parameters: string[], scope?: string, cultureName?: string): ILocalizedString;
    translateFormatAsync(text: string, parameters: string[], scope?: string, cultureName?: string): Promise<ILocalizationResult>;
    /**
     *@deprecated Use translatePluralizationAsync or getPluralizationDictionaryAsync() => translatePluralization
     */
    translatePluralization(text: string, number: number, scope?: string, cultureName?: string): ILocalizedString;
    translatePluralizationAsync(text: string, number: number, scope?: string, cultureName?: string): Promise<ILocalizationResult>;
    private getFallbackTranslation;
    private handleError;
    configureSiteUrl(siteUrl: string): void;
    /**
     *@deprecated Use getDictionaryAsync
     */
    private getDictionary;
    getDictionaryAsync(scope?: string, cultureName?: string): Promise<ILocalizationDictionaryResult<LocalizationDictionary>>;
    /**
     *@deprecated Use getPluralizationDictionaryAsync
     */
    private getPluralizationDictionary;
    getPluralizationDictionaryAsync(scope?: string, cultureName?: string): Promise<ILocalizationDictionaryResult<LocalizationPluralizationDictionary>>;
    private checkCultureName;
    private checkScope;
    /**
     *@deprecated Use getLocalizationDictionaryAsync
     */
    private getLocalizationDictionary;
    private getLocalizationDictionaryAsync;
    /**
     *@deprecated Use getPluralizationLocalizationDictionaryAsync
     */
    private getPluralizationLocalizationDictionary;
    private getPluralizationLocalizationDictionaryAsync;
    private dictionaryKey;
    /**
     *@deprecated Use downloadDictionaryAsync
     */
    private downloadDictionary;
    private downloadDictionaryAsync;
    private processDictionaryQueue;
    /**
     * @deprecated Use downloadPluralizedDictionaryAsync
     */
    private downloadPluralizedDictionary;
    private downloadPluralizedDictionaryAsync;
    private processPluralizedDictionaryQueue;
    private getDownloadPromise;
    private getBaseUrl;
    getCurrentCulture(): string;
    private setCurrentCulture;
    private getParsedCultureCookie;
    private getCurrentCultureCookie;
}
declare class LocalizationDictionary {
    private readonly mDictionary;
    constructor(dictionary: string);
    translate(text: string, fallback: () => ILocalizedString): ILocalizedString | null;
    translateFormat(text: string, parameters: string[], fallback: () => ILocalizedString): ILocalizedString;
    private formatString;
}
declare class LocalizationPluralizationDictionary {
    private readonly mDictionary;
    constructor(dictionary: string);
    translatePluralization(text: string, number: number, fallback: () => ILocalizedString): ILocalizedString;
}
declare enum LocalizationErrorResolution {
    Null = 0,
    Key = 1
}
interface ILocalizationConfiguration {
    errorResolution: LocalizationErrorResolution;
    siteUrl?: string;
    onError?: (localizationError: ILocalizationError) => void;
}
interface ILocalizationCookie {
    DefaultCulture: string;
    CurrentCulture: string | null;
}
interface ILocalizationError {
    text: string;
    scope: string;
    message: string;
    errorType?: string;
    dictionary?: string;
    context?: object;
}
interface ILocalizationStatus {
    success: boolean;
    text: string;
    scope: string;
    message: string;
    errorType?: string;
    dictionary?: string;
    context?: object;
}
interface IDictionaryError {
    scope: string;
    context: object | null;
}
interface ILocalizationDictionaryResult<TDictionary> {
    result: TDictionary | null;
    status: IDictionaryError;
}
interface ILocalizationResult {
    result: ILocalizedString;
    status: ILocalizationStatus;
}
interface ILocalizedString {
    name: string;
    resourceNotFound: boolean;
    value: string;
}
interface IPluralizedString {
    intervals: IIntervalWithTranslation[];
    defaultLocalizedString: ILocalizedString;
}
interface IIntervalWithTranslation {
    interval: PluralizationInterval;
    localizedString: ILocalizedString;
}
declare class PluralizationInterval {
    readonly start: number;
    readonly end: number;
    constructor(start: number, end: number);
}
declare class LocalizationUtils {
    static getCookie(name: string): string;
    static isInInterval(value: number, interval: PluralizationInterval): boolean;
}
