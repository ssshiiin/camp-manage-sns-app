import { useEffect } from 'react';
import ReactGA from 'react-ga';

const trackingId = process.env.MIX_GOOGLE_TRACKING_ID;
ReactGA.initialize(trackingId);

const useGaTrackPage = (path) => {
  useEffect(() => {
    ReactGA.pageview(path);
  }, [path]);
};

export default useGaTrackPage;
