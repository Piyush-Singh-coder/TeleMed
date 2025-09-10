export const loadJitsiScript = (domain = "8x8.vc") => {
  const src = `https://${domain}/external_api.js`;
  return new Promise((resolve, reject) => {
    if (window.JitsiMeetExternalAPI) {
      return resolve(window.JitsiMeetExternalAPI);
    }

    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.onload = () => resolve(window.JitsiMeetExternalAPI);
      existing.onerror = (e) => reject(e);
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      if (window.JitsiMeetExternalAPI) resolve(window.JitsiMeetExternalAPI);
      else reject(new Error("Jitsi script loaded but JitsiMeetExternalAPI not found"));
    };
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
};
