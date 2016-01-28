const Link = ReactRouter.Link
import request from "../../request"
import HistoryMixin from '../../history_mixin'

class Sidebar extends React.Component {
    static contextTypes = { // https://github.com/rackt/react-router/blob/master/CHANGES.md#state-mixin
        location: React.PropTypes.object
    };
    constructor(props) {
        super(props)
        this.state = {
            apps: []
        }
    }
    loadApps() {
        request("applications").done(res => {
            if (_.isEmpty(res)) return
            this.setState({apps: res.datas})
        })
    }
    componentDidMount() {
        this.loadApps()
    }
    componentDidUpdate() {
        $("#select2apps").select3((e)=> {
            let appId = e.params.data.id
            this.props.history.pushState(null, `/app/${appId}`)
        })
    }
    render() {
        return (
            <div id="sidebar">
                <select value={this.props.appId} id="select2apps" readOnly="true">
                    {this.state.apps.map((app, index) => {
                        return <option key={app.applicationId} value={app.applicationId}>{app.applicationName}</option>
                    })}
                </select>
                <ul id="sidenav">
                    <li className={this.context.location.pathname.endsWith("pandect")? "active": ""}>
                        <Link to={`/app/${this.props.appId}/pandect`}><i className="glyphicon glyphicon-signal mr5"></i>应用总览</Link>
                    </li>
                    <li className={this.context.location.pathname.endsWith("monitor")? "active": ""}>
                        <Link to={`/app/${this.props.appId}/monitor`}><i className="glyphicon glyphicon-eye-open mr5"></i>运行监控</Link>
                    </li>
                    <li className={this.context.location.pathname.startsWith(`/app/${this.props.appId}/node`)? "active": ""}>
                        <Link to={`/app/${this.props.appId}/nodes`}><i className="glyphicon glyphicon-equalizer mr5"></i>节点管理</Link>
                    </li>
                    <li className={this.context.location.pathname.endsWith("partition")? "active": ""}>
                        <Link to={`/app/${this.props.appId}/partition`}><i className="glyphicon glyphicon-object-align-bottom mr5"></i>分区管理</Link>
                    </li>
                    <li className={this.context.location.pathname.endsWith("setting")? "active": ""}>
                        <Link to={`/app/${this.props.appId}/setting`}><i className="fa fa-cog mr5"></i>应用配置</Link>
                    </li>
                    <li className={this.context.location.pathname.endsWith("elasticity")? "active": ""}>
                        <Link to={`/app/${this.props.appId}/elasticity`}><i className="fa fa-signal mr5"></i>弹性策略</Link>
                    </li>
                    <li className={this.context.location.pathname.endsWith("dependent")? "active": ""}>
                        <Link to={`/app/${this.props.appId}/dependent`}><i className="fa fa-sitemap mr5"></i>依赖服务</Link>
                    </li>
                    <li className={this.context.location.pathname.endsWith("delivery")? "active": ""}>
                        <Link to={`/app/${this.props.appId}/delivery`}><i className="fa fa-sort-amount-asc mr5"></i>交付过程</Link>
                    </li>
                    <li className={this.context.location.pathname.startsWith(`/app/${this.props.appId}/schedule`)? "active": ""}>
                        <Link to={`/app/${this.props.appId}/schedules`}><i className="fa fa-share-alt-square mr5"></i>作业调度</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default HistoryMixin(Sidebar)
