import Lines from "../charts/lines"
import request from "../request"
import monitor_type from "../enums/monitor_types"

class ServiceDependent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            parameters: [{
                    "group": "分组1",
                    "item": "参数1",
                    "value": "value1",
                    "description": "描述1"
                },{
                    "group": "分组2",
                    "item": "参数2",
                    "value": "value2",
                    "description": "描述2"
                },{
                    "group": "分组3",
                    "item": "参数3",
                    "value": "value3",
                    "description": "描述3"
                },{
                    "group": "分组3",
                    "item": "参数4",
                    "value": "value4",
                    "description": "描述4"
                },
            ],
            parameters_groups: [
                {
                    "value": "all",
                    "label": "全部"
                }, {
                    "value": "分组1",
                    "label": "分组1"
                }, {
                    "value": "分组2",
                    "label": "分组2"
                }, {
                    "value": "分组3",
                    "label": "分组3"
                }
            ]
        }
    }
    renderParametersTable(data) {
        this.parameters_table && this.parameters_table.destroy()
        this.parameters_table = new Handsontable(document.querySelector("#parameters_table"), {
            data: data,
            colHeaders: ["参数分组", "参数项", "参数值", "描述"],
            stretchH: 'all',
            columns: [
                {
                    data: 'group',
                    editor: false
                }, {
                    data: 'item',
                    editor: false
                }, {
                    data: 'value'
                }, {
                    data: 'description',
                    editor: false
                }
            ],
            search: {
                queryMethod: function(queryStr, value) {
                    return value.includes(queryStr)
                }
            },
            afterRender: function() {
                $("#parameters_table tbody>tr").each(function() {
                    $(this).children("td").eq(2).append($("<i>", {class: "glyphicon glyphicon-pencil fn-right"}))
                })
            }
        })
        Handsontable.Dom.addEvent(document.querySelector("#parameters_search"), 'keyup', (e)=> {
            let queryResult = this.parameters_table.search.query(e.currentTarget.value)
            this.parameters_table.render()
        })
    }
    componentDidUpdate() {
        $("#parameters_select2dom").select2().off("select2:select").on("select2:select", (e)=> {
            let group = e.params.data.id
            let data = this.state.parameters
            if (group != "all")
                data = _.filter(this.state.parameters, {'group': group})
            this.renderParametersTable(data)
        })
        this.renderParametersTable(this.state.parameters)
    }
    componentDidMount() {
        this.componentDidUpdate()
    }
    render() {
        return (
            <div id="service_dependent">
                <h2>应用参数配置</h2>
                <div className="fn-clear">
                    <label className="radio-inline">
                      <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" checked /> 内置服务
                    </label>
                    <label className="radio-inline">
                      <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" /> 外置服务
                    </label>
                    <div className="fn-right">
                        <input id="parameters_search" type="text" className="form-control mr10" placeholder="搜索" />
                    </div>
                </div>
                <table id="parameters_table" className="mt10"></table>
            </div>
        )
    }
}

export default ServiceDependent
