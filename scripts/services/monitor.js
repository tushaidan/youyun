import Lines from "../charts/lines"
import request from "../request"
import MonitorRuntime from "../modules/monitorRuntime"
import MonitorHistory from "../modules/monitorHistory"

class ServiceMonitor extends React.Component {
    render() {
        return (
            <div>
                <h2>监控汇总</h2>
                <MonitorRuntime />
                <h2>实时监控</h2>
                <MonitorHistory />
            </div>
        )
    }
}

export default ServiceMonitor
