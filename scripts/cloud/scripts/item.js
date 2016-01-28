import request from "../../request"
const Link = ReactRouter.Link

class CloudScript extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            platforms: [
                {
                    label: "Linux",
                    value: 1,
                },
                {
                    label: "Windows",
                    value: 2,
                }
            ],
            objects: [
                {
                    label: "对象1",
                    value: 1,
                },
                {
                    label: "对象2",
                    value: 2,
                }
            ],
            types: [
                {
                    label: "类型1",
                    value: 1,
                },
                {
                    label: "类型2",
                    value: 2,
                }
            ],
            data: {

            }
        }
    }
    componentDidMount() {
        this.root = $("#cloud_script")
    }
    submit(e) {

    }
    onChangeArea(value, e) {
        this.setState({area: value})
    }
    render() {
        return (
            <div id="cloud_script">
                <h2>脚本 {this.state.name} 详情
                    <Link className="fn-right" to={`/cloud/scripts`}>返回脚本库列表</Link>
                </h2>
                <div className="row mt20">
                    <div className="col-md-3 fn-tar">
                        脚本内容：
                    </div>
                    <div className="col-md-9">
                        <pre dangerouslySetInnerHTML={{__html: `
# 打印进程信息
# 打印进程信息
# 打印进程信息
# 打印进程信息
echo '---------进程信息-----------'
get-process

# 打印服务信息
echo '---------服务信息-----------'
get-service
                        `}}></pre>
                    </div>
                </div>
                <div className="row mt20">
                    <div className="col-md-3 fn-tar">
                        脚本执行记录：
                    </div>
                    <div className="col-md-9">
                        <table className="table table-condensed">
                            <thead>
                                <tr>
                                    <th>执行时间</th>
                                    <th>执行节点</th>
                                    <th>执行人</th>
                                    <th>结果</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>2015-12-9 13:00</th>
                                    <td>节点A(10.9.8.1)</td>
                                    <td>admin</td>
                                    <td>成功</td>
                                </tr>
                                <tr>
                                    <th>2015-12-9 13:00</th>
                                    <td>节点A(10.9.8.1)</td>
                                    <td>admin</td>
                                    <td>成功</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default CloudScript
