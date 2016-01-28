class StoreConfig extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            configs: []
        }
    }
    bildState() {
        let diskStorages = this.state.configs.map((item)=> {
            return {
                size: item
            }
        })
        this.props.setState({diskStorages: diskStorages})
    }
    remove(e) {
        let index = e.currentTarget.dataset.index
        confirm("确定删除？").done(()=> {
            let configs = this.state.configs.filter(function(item, i) {
                i != index
            })
            this.setState({configs: configs})
            this.bildState()
        })
    }
    add() {
        if (this.state.configs.length >= 4) {
            alert("不能超过4个")
            return
        }
        let value = parseInt(document.querySelector("#store_config>.addinput").value)
        if (!value) {
            alert("容量不正确")
            return
        }
        this.state.configs.push(value)
        this.forceUpdate()
        this.bildState()
    }
    componentDidMount() {
        this.bildState()
    }
    render() {
        return (
            <div id="store_config">
                {this.state.configs.map((item, i)=> {
                    return <span key={i}>{item}G <i className="glyphicon glyphicon-remove" data-index={i} onClick={::this.remove}></i></span>
                })}
                <input type="number" className="form-control addinput" />GB
                <a className="glyphicon glyphicon-plus" onClick={::this.add}></a>
            </div>
        )
    }
}

export default StoreConfig
