import request from "../../../request"

class LogTable extends React.Component {
    static colunm = ["时间", "执行用户", "动作"];
    constructor(props) {
        super(props)
        this.state = {
            table: {}
        }
    }
    renderTable() {
        request(`syslogs/${this.props.type}/${this.props.paramsId}?pageSize=1000&currentPage=1`).done(res => {
            let data1 = (res && res.logs) || []
            let data = _.map(data1, function(item){
                return [item.startTime, item.sort, item.msg]
            })
            $(this.state.table).empty()
            let hot = new Handsontable(this.state.table, {
                data: data,
                colHeaders: LogTable.colunm,
                stretchH: 'all',
                readOnly: true,
            })
        })
    }
    componentDidMount() {
        this.state.table = document.querySelector("#app_log_table")
        this.renderTable()
    }
    componentDidUpdate() {
        this.renderTable()
    }
    render() {
        return (
            <div id="app_log_table"></div>
        )
    }
}

export default LogTable
