import { Users, Stethoscope, Activity, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex-grow">
        <h1 className="text-5xl font-bold mb-6">{t("heroTitle")}</h1>
        <p className="text-lg max-w-2xl mb-8">{t("heroDesc")}</p>
        <div className="flex items-center gap-3">
          <select
            onChange={changeLanguage}
            className="select select-bordered bg-white select-lg border-2 text-blue-600 rounded-2xl"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="pa">ਪੰਜਾਬੀ</option>
          </select>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{t("features")}</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {/* Patients */}
          <div className="card rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="card-body items-center text-center">
              <Users className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="card-title">{t("patientTitle")}</h3>
              <p className="text-sm text-gray-500">{t("patientDesc")}</p>
            </div>
          </div>

          {/* Doctors */}
          <div className="card rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="card-body items-center text-center">
              <Stethoscope className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="card-title">{t("doctorTitle")}</h3>
              <p className="text-sm text-gray-500">{t("doctorDesc")}</p>
            </div>
          </div>

          {/* AI Consult */}
          <div className="card rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="card-body items-center text-center">
              <Activity className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="card-title">{t("aiTitle")}</h3>
              <p className="text-sm text-gray-500">{t("aiDesc")}</p>
            </div>
          </div>

          {/* Security */}
          <div className="card rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="card-body items-center text-center">
              <ShieldCheck className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="card-title">{t("secureTitle")}</h3>
              <p className="text-sm text-gray-500">{t("secureDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer flex justify-between bg-base-200 p-10 text-base-content mt-auto">
  <aside>
    <p className="text-lg font-bold">TeleMed+</p>
    <p className="text-sm">{t("tagline")}</p>
  </aside>
  <nav>
    <h6 className="footer-title">{t("company")}</h6>
    <a className="link link-hover">{t("about")}</a>
    <a className="link link-hover">{t("contact")}</a>
    <a className="link link-hover">{t("careers")}</a>
  </nav>
  <nav>
    <h6 className="footer-title">{t("services")}</h6>
    <a className="link link-hover">{t("patientPortal")}</a>
    <a className="link link-hover">{t("doctorDashboard")}</a>
    <a className="link link-hover">{t("aiConsult")}</a>
  </nav>
  <nav>
    <h6 className="footer-title">{t("legal")}</h6>
    <a className="link link-hover">{t("terms")}</a>
    <a className="link link-hover">{t("privacy")}</a>
    <a className="link link-hover">{t("cookies")}</a>
  </nav>
</footer>
    </div>
  );
}
