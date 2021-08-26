import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';

import Profile from './Profile/Profile';
import Home from './Home/Home';
import SubCategory from './SubCategory';
import BringGear from './BringGear/BringGear';
import GearSaveLists from './SaveGear/SaveGear';
import AddBringGear from './BringGear/AddBringGear';
import LoginRoute from '../routes/LoginRoute';


function Main(props){
    return (
        <main>
            <div className="main-category">
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path={`/${props.user.id}/bring_lists`} exact render={() => <BringGear
                    user_id={props.user.id}/> 
                }/>
                <Route path={`/${props.user.id}/bring_lists/add`} exact render={() => <AddBringGear
                    user_id={props.user.id}/> 
                }/>
                <Route path={`/${props.user.id}/save_lists`} exact render={() => <GearSaveLists
                    user_id={props.user.id}/> 
                }/>
                <Route path={`/${props.user.id}`} render={() => <Profile
                    user_id={props.user.id}/> 
                }/>
                <Redirect to="/" />
            </Switch>
            </div>
            <SubCategory />
        </main>
    )
}

export default Main;