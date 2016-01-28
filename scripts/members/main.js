import Sidebar from "./modules/sidebar"
import HistoryMixin from '../history_mixin'

class MemberMain extends React.Component {
    componentDidMount() {
        if (this.props.routes.length < 3)
            this.props.history.pushState(null, `/members/users`)
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

export default HistoryMixin(MemberMain)
