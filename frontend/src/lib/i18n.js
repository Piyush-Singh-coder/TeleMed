import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        heroTitle: "Your Complete Telemedicine Solution",
        heroDesc:
          "Connect with doctors, manage your health, and access medicines—all in one platform.",
        getStarted: "Get Started",
        features: "Key Features",
        patientTitle: "For Patients",
        patientDesc:
          "Book appointments, consult online, track prescriptions, and manage health records seamlessly.",
        doctorTitle: "For Doctors",
        doctorDesc:
          "Manage appointments, consult patients online, and update prescriptions effortlessly.",
        aiTitle: "AI Consult",
        aiDesc:
          "Get AI-powered preliminary consultations to understand symptoms and recommended next steps.",
        secureTitle: "Secure & Reliable",
        secureDesc:
          "Built with modern security practices to protect your health data and ensure safe consultations.",

        // Footer
        company: "Company",
        about: "About us",
        contact: "Contact",
        careers: "Careers",
        services: "Services",
        patientPortal: "Patient Portal",
        doctorDashboard: "Doctor Dashboard",
        aiConsult: "AI Consult",
        legal: "Legal",
        terms: "Terms of use",
        privacy: "Privacy policy",
        cookies: "Cookie policy",
        tagline:
          "Bringing healthcare closer to you with modern technology.",
      },
    },
    hi: {
      translation: {
        heroTitle: "आपका संपूर्ण टेलीमेडिसिन समाधान",
        heroDesc:
          "डॉक्टरों से जुड़ें, अपने स्वास्थ्य का प्रबंधन करें, और दवाओं तक पहुँचें—सब एक ही प्लेटफॉर्म पर।",
        getStarted: "शुरू करें",
        features: "मुख्य विशेषताएं",
        patientTitle: "मरीज़ों के लिए",
        patientDesc:
          "अपॉइंटमेंट बुक करें, ऑनलाइन परामर्श लें, प्रिस्क्रिप्शन ट्रैक करें और स्वास्थ्य रिकॉर्ड का प्रबंधन करें।",
        doctorTitle: "डॉक्टरों के लिए",
        doctorDesc:
          "अपॉइंटमेंट मैनेज करें, मरीजों को ऑनलाइन परामर्श दें और प्रिस्क्रिप्शन अपडेट करें।",
        aiTitle: "एआई परामर्श",
        aiDesc:
          "लक्षणों को समझने और अगले कदम जानने के लिए एआई-संचालित प्राथमिक परामर्श प्राप्त करें।",
        secureTitle: "सुरक्षित और विश्वसनीय",
        secureDesc:
          "आपके स्वास्थ्य डेटा की सुरक्षा और सुरक्षित परामर्श सुनिश्चित करने के लिए आधुनिक सुरक्षा उपाय।",

        // Footer
        company: "कंपनी",
        about: "हमारे बारे में",
        contact: "संपर्क करें",
        careers: "करियर",
        services: "सेवाएँ",
        patientPortal: "मरीज़ पोर्टल",
        doctorDashboard: "डॉक्टर डैशबोर्ड",
        aiConsult: "एआई परामर्श",
        legal: "कानूनी",
        terms: "उपयोग की शर्तें",
        privacy: "गोपनीयता नीति",
        cookies: "कुकी नीति",
        tagline:
          "आधुनिक तकनीक के साथ स्वास्थ्य सेवाओं को आपके करीब लाना।",
      },
    },
    pa: {
      translation: {
        heroTitle: "ਤੁਹਾਡਾ ਪੂਰਾ ਟੈਲੀਮੇਡਿਸਿਨ ਹੱਲ",
        heroDesc:
          "ਡਾਕਟਰਾਂ ਨਾਲ ਜੁੜੋ, ਆਪਣੀ ਸਿਹਤ ਦਾ ਪ੍ਰਬੰਧ ਕਰੋ ਅਤੇ ਦਵਾਈਆਂ ਤੱਕ ਪਹੁੰਚੋ—ਸਭ ਕੁਝ ਇੱਕ ਪਲੇਟਫਾਰਮ ਤੇ।",
        getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
        features: "ਮੁੱਖ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
        patientTitle: "ਮਰੀਜ਼ਾਂ ਲਈ",
        patientDesc:
          "ਮੁਲਾਕਾਤਾਂ ਬੁੱਕ ਕਰੋ, ਆਨਲਾਈਨ ਸਲਾਹ ਕਰੋ, ਪ੍ਰਿਸਕ੍ਰਿਪਸ਼ਨ ਟ੍ਰੈਕ ਕਰੋ ਅਤੇ ਸਿਹਤ ਰਿਕਾਰਡ ਸੰਭਾਲੋ।",
        doctorTitle: "ਡਾਕਟਰਾਂ ਲਈ",
        doctorDesc:
          "ਮੁਲਾਕਾਤਾਂ ਪ੍ਰਬੰਧਿਤ ਕਰੋ, ਮਰੀਜ਼ਾਂ ਨਾਲ ਆਨਲਾਈਨ ਸਲਾਹ ਕਰੋ ਅਤੇ ਪ੍ਰਿਸਕ੍ਰਿਪਸ਼ਨ ਅੱਪਡੇਟ ਕਰੋ।",
        aiTitle: "ਏਆਈ ਸਲਾਹ",
        aiDesc:
          "ਲੱਛਣਾਂ ਨੂੰ ਸਮਝਣ ਅਤੇ ਅਗਲੇ ਕਦਮਾਂ ਦੀ ਸਿਫਾਰਸ਼ ਲਈ ਏਆਈ-ਚਲਿਤ ਪ੍ਰਾਰੰਭਿਕ ਸਲਾਹ ਪ੍ਰਾਪਤ ਕਰੋ।",
        secureTitle: "ਸੁਰੱਖਿਅਤ ਅਤੇ ਭਰੋਸੇਯੋਗ",
        secureDesc:
          "ਆਧੁਨਿਕ ਸੁਰੱਖਿਆ ਪ੍ਰਣਾਲੀਆਂ ਨਾਲ ਤੁਹਾਡੇ ਸਿਹਤ ਡਾਟਾ ਦੀ ਰੱਖਿਆ ਅਤੇ ਸੁਰੱਖਿਅਤ ਸਲਾਹ।",

        // Footer
        company: "ਕੰਪਨੀ",
        about: "ਸਾਡੇ ਬਾਰੇ",
        contact: "ਸੰਪਰਕ",
        careers: "ਕੈਰੀਅਰ",
        services: "ਸੇਵਾਵਾਂ",
        patientPortal: "ਮਰੀਜ਼ ਪੋਰਟਲ",
        doctorDashboard: "ਡਾਕਟਰ ਡੈਸ਼ਬੋਰਡ",
        aiConsult: "ਏਆਈ ਸਲਾਹ",
        legal: "ਕਾਨੂੰਨੀ",
        terms: "ਵਰਤੋਂ ਦੀਆਂ ਸ਼ਰਤਾਂ",
        privacy: "ਪਰਾਈਵੇਸੀ ਨੀਤੀ",
        cookies: "ਕੁਕੀ ਨੀਤੀ",
        tagline:
          "ਆਧੁਨਿਕ ਤਕਨਾਲੋਜੀ ਨਾਲ ਸਿਹਤ ਸੇਵਾਵਾਂ ਨੂੰ ਤੁਹਾਡੇ ਨੇੜੇ ਲਿਆਉਣਾ।",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
