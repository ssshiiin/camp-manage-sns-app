import React from 'react';
import { Route, Switch, useLocation } from 'react-router';

import { BringSlideNav } from './components';
import { ScrollToTopOnMount } from './components/Utility';
import { useGaTrackPage } from './Function';
import { IndexBring, IndexSave } from './templates';

const RouterGear = (props) => {
  const userId = props.match.params.id;
  // const deleteTemplate = async (deleteTemplate_name) => {
  //   const response = await axios.post(`/api/templates/delete/${user_id}`
  //     , [deleteTemplate_name]);

  //   getTemplates();
  //   getGear();
  //   getCountBring();
  // }

  const location = useLocation();
  useGaTrackPage(location.pathname);

  return (
    <>
      <ScrollToTopOnMount />
      <div className="gear">
        <BringSlideNav />
        <Switch>
          <Route path={`/${userId}/bring/save`} exact render={() => <IndexSave userId={userId} />} />
          <Route path={`/${userId}/bring`} exact render={() => <IndexBring />} />
        </Switch>
      </div>
    </>
  );
};

export default RouterGear;
