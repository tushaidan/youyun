import Sidebar from "./modules/sidebar"
import HistoryMixin from '../history_mixin'

class Cloud extends React.Component {
    static contextTypes = {
        location: React.PropTypes.object
    };
    verifyRoute() {
        if (this.context.location.pathname == "/cloud")
            this.props.history.pushState(null, "/cloud/access")
    }
    componentDidUpdate() {
        this.verifyRoute()
    }
    componentDidMount() {
        this.verifyRoute()
    }
    render() {
        return (
            <div className="row">
                <div className="col-sm-2 col-clear">
                    <Sidebar />
                </div>
                <div className="col-sm-10">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default HistoryMixin(Cloud)
