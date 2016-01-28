import Lines from "../charts/lines"
import request from "../request"
import monitor_type from "../enums/monitor_types"

class ParametersTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            // data: [{
            //         "group": "分组1",
            //         "name": "参数1",
            //         "value": "value1",
            //         "description": "描述1"
            //     },{
            //         "group": "分组2",
            //         "name": "参数2",
            //         "value": "value2",
            //         "description": "描述2"
            //     },{
            //         "group": "分组3",
            //         "name": "参数3",
            //         "value": "value3",
            //         "description": "描述3"
            //     },{
            //         "group": "分组3",
            //         "name": "参数4",
            //         "value": "value4",
            //         "description": "描述4"
            //     },
            // ],
            groups: [
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
    storeData = [];
    subFormData() {
        let kvdata = {}
        this.state.data.forEach(function(item) {
            kvdata[item.key] = item.value || ""
        })
        this.props.setState({appConf: kvdata})
    }
    renderParametersTable() {
        let _this = this
        this.parameters_table && this.parameters_table.destroy()
        this.parameters_table = new Handsontable(document.querySelector("#parameters_table"), {
            data: this.state.data,
            colHeaders: ["参数分组", "参数项", "参数值", "描述"],
            stretchH: 'all',
            columns: [
                {
                    data: 'group',
                    editor: false
                }, {
                    data: 'name',
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
            afterChange: function (changes, source) {
                if (source !== 'loadData') {
                    _this.subFormData()
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
    loadData() {
        request(`applications/type/param_conf/${this.props.param}`).done((data)=> {
            this.storeData = data

            this.setState({data: this.storeData})
            this.subFormData()
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.param != this.props.param) {
            this.loadData()
            return
        }
        this.renderParametersTable()
    }
    componentDidMount() {
        // this.subFormData()
        $("#parameters_select2dom").select3((e)=> {
            let data = this.state.data
            if (group != "all")
                data = _.filter(this.storeData, {'group': e.params.data.id})

            this.setState({data: data})
            this.subFormData()
        })
    }
    render() {
        return (
            <div id="parameters_box">
                <div className="fn-tar">
                    <input id="parameters_search" type="text" className="form-control mr10" placeholder="搜索" />
                    <select id="parameters_select2dom">
                        {this.state.groups.map(function(option, i) {
                            return <option key={option.value} value={option.value}>{option.label}</option>
                        })}
                    </select>
                </div>
                <table id="parameters_table" className="mt10"></table>
            </div>
        )
    }
}

export default ParametersTable
