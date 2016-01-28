import "../bower_components/bootstrap-sass/assets/javascripts/bootstrap/button.js"
import "../bower_components/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js"
import "../bower_components/bootstrap-sass/assets/javascripts/bootstrap/collapse.js"
import "../bower_components/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js"
import "../bower_components/bootstrap-sass/assets/javascripts/bootstrap/modal.js"
import "../bower_components/bootstrap-sass/assets/javascripts/bootstrap/popover.js"
import "../bower_components/bootstrap-sass/assets/javascripts/bootstrap/tab.js"

// import Transdux from "transdux"
// import { Router, Route, Link } from 'react-router' // coz gulp watch performance
const Router = ReactRouter.Router
const Route = ReactRouter.Route
const IndexRoute = ReactRouter.IndexRoute

import config from "./config"
import "./assembly"

import Main from "./main"

import Login from "./account/login"
import Register from "./account/register"
import Pandect from "./pandect"
import Setting from "./account/setting"

import Member from "./members/main"
import MemberDepartments from "./members/departments"
import MemberAuths from "./members/auths"
import MemberRoles from "./members/roles"
import MemberUsers from "./members/users"

import App from "./apps/main"
import AppNew from "./apps/new"
import AppIndex from "./apps/index"

import AppPandect from "./apps/pandect"
import AppMonitor from "./apps/monitor"
import AppPartition from "./apps/partition"
import AppSetting from "./apps/setting"
import AppDelivery from "./apps/delivery"
import AppDependent from "./apps/dependent"
import AppElasticity from "./apps/elasticity"

import AppSchedules from "./apps/schedules/index"
import AppSchedule from "./apps/schedules/item"
import AppScheduleNew from "./apps/schedules/new"
import AppScheduleEdit from "./apps/schedules/edit"

import AppNodes from "./apps/nodes/index"
import AppNode from "./apps/nodes/item"
import AppNodeNew from "./apps/nodes/new"

import Service from "./services/main"
import ServiceNew from "./services/new"
import ServiceIndex from "./services/index"

import ServicePandect from "./services/pandect"
import ServiceMonitor from "./services/monitor"
import ServicePartition from "./services/partition"
import ServiceSetting from "./services/setting"
import ServiceDependent from "./services/dependent"
import ServiceElasticity from "./services/elasticity"

import ServiceSchedules from "./services/schedules/index"
import ServiceSchedule from "./services/schedules/item"
import ServiceScheduleNew from "./services/schedules/new"
import ServiceScheduleEdit from "./services/schedules/edit"

import ServiceNodes from "./services/nodes/index"
import ServiceNode from "./services/nodes/item"
import ServiceNodeNew from "./services/nodes/new"

import Cloud from "./cloud/main"

import CloudAccesses from "./cloud/access/index"
import CloudAccessNew from "./cloud/access/new"
import CloudAccessEdit from "./cloud/access/edit"

import CloudNodes from "./cloud/nodes/index"
import CloudNode from "./cloud/nodes/item"
import CloudNodeNew from "./cloud/nodes/new"

import CloudNets from "./cloud/nets/index"
import CloudNetNew from "./cloud/nets/new"
import CloudNet from "./cloud/nets/item"
import CloudNetEdit from "./cloud/nets/edit"

import CloudIps from "./cloud/ips/index"
import CloudIpNew from "./cloud/ips/new"

import CloudScripts from "./cloud/scripts/index"
import CloudScript from "./cloud/scripts/item"
import CloudScriptNew from "./cloud/scripts/new"
import CloudScriptExecute from "./cloud/scripts/execute"

ReactDOM.render((
    <Router>
        <Route component={Main} path="/">
            <Route component={Login} path="login"/>
            <Route component={Register} path="register"/>
            <Route component={Setting} path="setting"/>
            <Route component={Pandect} path="pandect"/>

            <Route component={Member} path="members">
                <Route component={MemberDepartments} path="departments"/>
                <Route component={MemberAuths} path="auths"/>
                <Route component={MemberRoles} path="roles"/>
                <Route component={MemberUsers} path="users"/>
            </Route>

            <Route component={AppIndex} path="apps"/>
            <Route component={AppNew} path="app/new"/>
            <Route component={App} path="app/:appId">
                <Route component={AppPandect} path="pandect"/>
                <Route component={AppMonitor} path="monitor"/>
                <Route component={AppPartition} path="partition"/>
                <Route component={AppSetting} path="setting"/>
                <Route component={AppDelivery} path="delivery"/>
                <Route component={AppDependent} path="dependent"/>
                <Route component={AppElasticity} path="elasticity"/>

                <Route component={AppSchedules} path="schedules"/>
                <Route component={AppScheduleNew} path="schedule/new"/>
                <Route component={AppSchedule} path="schedule/:scheduleId"/>
                <Route component={AppScheduleEdit} path="schedule/:scheduleId/edit"/>

                <Route component={AppNodes} path="nodes"/>
                <Route component={AppNodeNew} path="node/new"/>
                <Route component={AppNode} path="node/:nodeId"/>
            </Route>

            <Route component={ServiceIndex} path="services"/>
            <Route component={ServiceNew} path="service/new"/>
            <Route component={Service} path="service/:serviceId">
                <Route component={ServicePandect} path="pandect"/>
                <Route component={ServiceMonitor} path="monitor"/>
                <Route component={ServicePartition} path="partition"/>
                <Route component={ServiceSetting} path="setting"/>
                <Route component={ServiceDependent} path="dependent"/>
                <Route component={ServiceElasticity} path="elasticity"/>

                <Route component={ServiceSchedules} path="schedules"/>
                <Route component={ServiceScheduleNew} path="schedule/new"/>
                <Route component={ServiceSchedule} path="schedule/:scheduleId"/>
                <Route component={ServiceScheduleEdit} path="schedule/:scheduleId/edit"/>

                <Route component={ServiceNodes} path="nodes"/>
                <Route component={ServiceNodeNew} path="node/new"/>
                <Route component={ServiceNode} path="node/:nodeId"/>
            </Route>

            <Route component={Cloud} path="cloud">
                <Route component={CloudAccesses} path="access"/>
                <Route component={CloudAccessNew} path="access/new"/>
                <Route component={CloudAccessEdit} path="access/:accessId/edit"/>

                <Route component={CloudNodes} path="nodes"/>
                <Route component={CloudNode} path="node/:nodeId"/>
                <Route component={CloudNodeNew} path="node/new"/>

                <Route component={CloudNets} path="nets"/>
                <Route component={CloudNetNew} path="net/new"/>
                <Route component={CloudNet} path="net/:netId"/>
                <Route component={CloudNetEdit} path="net/:nodeId/edit"/>

                <Route component={CloudIps} path="ips"/>
                <Route component={CloudIpNew} path="ip/new"/>

                <Route component={CloudScripts} path="scripts"/>
                <Route component={CloudScriptNew} path="script/new"/>
                <Route component={CloudScriptExecute} path="script/execute"/>
                <Route component={CloudScript} path="script/:scriptId"/>
            </Route>
        </Route>
    </Router>
), document.querySelector('#body'))
