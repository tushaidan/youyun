import request from "../../request"
import HistoryMixin from '../../history_mixin'
import NodeIndex from "../modules/nodeIndex"
const Link = ReactRouter.Link

class CloudNodeIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    loadData() {
        // request("triggerevents").done(data => {
        //     this.state.data = data
        // })
    }
    componentDidMount() {
        this.root = $("#cloud_nodes")
        this.loadData()
    }
    addNode() {

    }
    render() {
        return (
            <div id="cloud_nodes">
                <h2>云节点</h2>
                <div className="status_pandect">
                    <span className="green"><i>●</i>45</span>
                    <span className="orange ml5"><i>●</i>2</span>
                    <span className="red ml5"><i>●</i>1</span>
                </div>
                <NodeIndex />
            </div>
        )
    }
}

export default HistoryMixin(CloudNodeIndex)
