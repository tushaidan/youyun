import Sidebar from "./modules/sidebar"
import HistoryMixin from '../history_mixin'

class AppMain extends React.Component {
    componentDidMount() { // could not change to componentWillUpdate, routes willbe source side by trans
        if (this.props.routes.length < 3)
            this.props.history.pushState(null, `/app/${this.props.params.appId}/pandect`)
    }
    render() {
        return (
            <div className="row">
                <div className="col-sm-2 col-clear">
                    <Sidebar appId={this.props.params.appId}/>
                </div>
                <div className="col-sm-10">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default HistoryMixin(AppMain)

// https://github.com/rackt/react-router/issues/1531
// {React.cloneElement(this.props.children, { appId: this.props.params.appId })}
