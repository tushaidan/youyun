import request from "../../request"
import status from "../../enums/app_status"

class ApplicationTable extends React.Component {
    static colunm = ["应用名称", "应用状态", "应用数据源", "应用所占资源"];
    constructor(props) {
        super(props)
        this.state = {
            table: {}
        }
    }
    renderTable() {
        request(`applications`).done(res => {
            let data1 = res || []
            let data = _.map(data1, function(item) {
                item.runStatusObj = status[item.runStatus]
                return [item.applicationName, item.runStatusObj.text, item.type, item.memory]
            })
            $(this.state.table).empty()
            let hot = new Handsontable(this.state.table, {
                data: data,
                colHeaders: ApplicationTable.colunm,
                stretchH: 'all',
                readOnly: true,
            })
        })
    }
    componentDidMount() {
        this.state.table = document.querySelector("#apps_table")
        this.renderTable()
    }
    componentDidUpdate() {
        this.renderTable()
    }
    render() {
        return (
            <div id="apps_table"></div>
        )
    }
}

export default ApplicationTable
