const countPV = () => {
  const trackingId = process.env.MIX_GOOGLE_TRACKING_ID;
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());

  gtag('config', trackingId);
};

export default countPV;
