import Sidebar from "./modules/sidebar"
import HistoryMixin from '../history_mixin'

class ServiceItem extends React.Component {
    componentDidMount() { // could not change to componentWillUpdate, routes willbe source side by trans
        if (this.props.routes.length < 3)
            this.props.history.pushState(null, `/service/${this.props.params.serviceId}/pandect`)
    }
    render() {
        return (
            <div className="row">
                <div className="col-sm-2 col-clear">
                    <Sidebar serviceId={this.props.params.serviceId}/>
                </div>
                <div className="col-sm-10">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default HistoryMixin(ServiceItem)
