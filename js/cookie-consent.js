const GA_ID = "G-KM7S2D8GH8";
const GTM_ID = "GTM-59SD8JZ4";

// Завантажує Google-теги лише після згоди
function loadGoogleTags() {
    if (window.googleTagsLoaded) return;
    window.googleTagsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", GA_ID);

    const gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(gaScript);

    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    const gtmScript = document.createElement("script");
    gtmScript.async = true;
    gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=" + GTM_ID;
    document.head.appendChild(gtmScript);
}

CookieConsent.run({
    guiOptions: {
        consentModal: {
            layout: "box",
            position: "bottom right",
            equalWeightButtons: true,
        },
        preferencesModal: { layout: "box" },
    },

    categories: {
        necessary: { enabled: true, readOnly: true },
        analytics: {
            autoClear: {
                cookies: [{ name: /^(_ga|_gid)/ }],
            },
        },
    },

    onConsent: () => {
        if (CookieConsent.acceptedCategory("analytics")) loadGoogleTags();
    },

    onChange: ({ changedCategories }) => {
        if (changedCategories.includes("analytics")) {
            if (CookieConsent.acceptedCategory("analytics")) {
                loadGoogleTags();
            } else {
                window.location.reload(); // зупиняє вже завантажені скрипти
            }
        }
    },

    language: {
        default: "en",
        translations: {
            en: {
                consentModal: {
                    title: "Cookies on this site",
                    description:
                        "I use analytics cookies (Google Analytics) to understand how visitors use my portfolio. They are only enabled if you accept.",
                    acceptAllBtn: "Accept",
                    acceptNecessaryBtn: "Reject",
                    showPreferencesBtn: "Manage preferences",
                },
                preferencesModal: {
                    title: "Cookie preferences",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Reject all",
                    savePreferencesBtn: "Save preferences",
                    closeIconLabel: "Close",
                    sections: [
                        {
                            title: "Strictly necessary",
                            description:
                                "Required for the site to work. They cannot be switched off.",
                            linkedCategory: "necessary",
                        },
                        {
                            title: "Analytics",
                            description:
                                "Google Analytics and Google Tag Manager help me see which pages are visited. Data is used only for statistics.",
                            linkedCategory: "analytics",
                        },
                    ],
                },
            },
        },
    },
});