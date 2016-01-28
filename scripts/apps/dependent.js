import ServiceConfig from './modules/serviceConfig'

class Dependent extends React.Component {
    render() {
        return (
            <div>
                <h2>依赖服务配置</h2>
                <ServiceConfig />
            </div>
        )
    }
}

export default Dependent
