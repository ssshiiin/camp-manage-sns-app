import React from 'react';
import { Route, Switch } from "react-router";


import { BringSlideNav } from './components';
import ScrollToTopOnMount from './templates/ScrollToTopOnMount';
import { IndexBring, IndexSave } from './templates';

const RouterGear = (props) => {
  const user_id = props.match.params.id;
  // const deleteTemplate = async (deleteTemplate_name) => {
  //   const response = await axios.post(`/api/templates/delete/${user_id}`
  //     , [deleteTemplate_name]);

  //   getTemplates();
  //   getGear();
  //   getCountBring();
  // }

  return (
    <>
      <ScrollToTopOnMount />
      <div className="gear">
        <BringSlideNav />
        <Switch>
          <Route path={`/${user_id}/bring/save`} exact render={() => <IndexSave user_id={user_id} />} />
          <Route path={`/${user_id}/bring`} exact render={() => <IndexBring user_id={user_id} />} />
        </Switch>
      </div>
    </>
  )
}

export default RouterGear;