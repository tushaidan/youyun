import request from "../../request"
import HistoryMixin from '../../history_mixin'
import {getHeight} from "../../assembly"
import {eventsOption} from "../../enums/scheduling_event"
const Link = ReactRouter.Link

class AppScheduleIndex extends React.Component {
    static contextTypes = {
        location: React.PropTypes.object
    };
    constructor(props) {
        super(props)
        this.state = {
            data: [{
                scheduleId: "1",
                name: '调度名称 1',
                range: '整体应用节点',
                type: '轮询',
                timing: '每周一早上9点',
                recent_time: '2015-11-9 12:23',
                recent_status: '成功',
            }, {
                scheduleId: "2",
                name: '调度名称 2',
                range: '节点A',
                type: '定时',
                timing: '2015-11-9 12:23 执行',
                recent_time: '2015-11-9 12:23',
                recent_status: '成功',
            }, {
                scheduleId: "3",
                name: '调度名称 3',
                range: '整体应用节点',
                type: '轮询',
                timing: '节点磁盘利用率>80%执行',
                recent_time: '2015-11-9 12:23',
                recent_status: '成功',
            }]
        }
    }
    renderTable() {
        $("select.select2dom", this.root).select2().on("select2:select", (e)=> {
            let type = e.params.data.id
            type = type == "all"? _.map(eventsOption, 'label'): type
            this.$table.bootstrapTable('filterBy', {type: type})
        })

        this.$delete = $("#delete", this.root)
        this.$table = $('#schedule_table', this.root).bootstrapTable({
            height: getHeight() - 68,
            columns: [{
                checkbox: true
            }, {
                field: 'scheduleId',
                visible: false
            }, {
                field: 'name',
                title: '调度名称',
            }, {
                field: 'range',
                title: '作用范围'
            }, {
                field: 'type',
                title: '执行方式'
            }, {
                field: "timing",
                title: '执行事件'
            }, {
                field: "recent_time",
                title: '最近执行时间',
                sortable: true,
            }, {
                field: "recent_status",
                title: '最近执行状态'
            }, {
                field: 'operate',
                title: '操作',
                align: 'center',
                events: {
                    "click .detail": (e, value, row, index)=> {
                        this.props.history.pushState(null, `/app/${this.props.params.appId}/schedule/${row.scheduleId}`)
                    },
                    "click .edit": (e, value, row, index)=> {
                        this.props.history.pushState(null, `/app/${this.props.params.appId}/schedule/${row.scheduleId}/edit`)
                    }
                },
                formatter: `
                    <a class="detail" href="javascript:void(0)">详情</a>
                    <a class="edit" href="javascript:void(0)">编辑</a>
                `
            }],
            data: this.state.data
        })

        this.$table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', ()=> {
            let selections = this.getIdSelections()
            this.$delete.prop('disabled', !selections.length)
        })
        this.$delete.click(()=> {
            let ids = this.getIdSelections()
            this.$table.bootstrapTable('remove', {
                field: 'id',
                values: ids
            });
            this.$delete.prop('disabled', true)
        })
    }
    getIdSelections() {
        return $.map(this.$table.bootstrapTable('getSelections'), function (row) {
            return row.scheduleId
        })
    }
    loadData() {
        // request("triggerevents").done(data => {
        //     this.state.data = data
        // })
    }
    componentDidMount() {
        this.root = $("#schedule")
        this.loadData()
        this.renderTable()
    }
    render() {
        return (
            <div id="schedule">
                <h2>作业调度</h2>
                <div id="schedule_toolbar">
                    <Link to={`app/${this.props.params.appId}/schedule/new`} className="btn btn-primary">新增</Link>
                    <a className="btn btn-danger ml10" id="delete">删除</a>
                    <span id="schedule_events" className="ml10">
                        执行方式：
                        <select value={this.state.event} className="select2dom">
                            <option value="all">全部</option>
                            {eventsOption.map(function(option, i) {
                                return <option key={option.value} value={option.label}>{option.label}</option>
                            })}
                        </select>
                    </span>
                </div>
                <table id="schedule_table"
                    data-toolbar="#schedule_toolbar"
                    data-search="true">
                </table>
            </div>
        )
    }
}

export default HistoryMixin(AppScheduleIndex)
