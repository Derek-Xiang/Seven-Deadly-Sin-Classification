import React, { Component } from 'react';
import {HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import DeadlySins from './DeadlySins';
import Map from './pages/map/index';
import Analysis from './pages/analysis';
import App from './App';
import NoMatch from './pages/NoMatch';
import Home from './pages/home';

class DRouter extends Component{
    render(){
        return (
            <HashRouter>
                <DeadlySins>
                    <Route exact path="/" render={() => <Redirect to="/app/home" push />} />   
                    <Route  path='/app' render={()=>
                        <App>
                            <Switch>
                            <Route path={`/app/map`} component={Map}/>
                            <Route path='/app/analysis' component={ Analysis }/>
                            <Route path='/app/home' component={Home}/>
                            <Route component={NoMatch}/>
                            </Switch>
                         </App>                   
                    } />
                </DeadlySins>
            </HashRouter>
        );
    }
}
export default DRouter;