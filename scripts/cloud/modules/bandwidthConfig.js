class BandwidthConfig extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            net_flowtype: 1
        }
    }
    renderSilder() {
        let flowtypeSlider = document.getElementById('flowtype_slider');
        noUiSlider.create(flowtypeSlider, {
            start: 1,
            connect: 'lower',
            range: {
                min: 0,
                max: 100
            },
            pips: {
                mode: 'positions',
        		values: [0,25,50,75,100],
        		density: 25,
                format: wNumb({
                    postfix: 'M'
                })
            }
        })

        let flowtypeInput = document.getElementById('flowtype_input');
        flowtypeSlider.noUiSlider.on('update', function(values, handle) {
        	flowtypeInput.value = values[handle]
        })
        flowtypeInput.addEventListener('change', function(){
        	flowtypeSlider.noUiSlider.set([this.value])
        })

        $("#flowtype_slider .noUi-value", this.root).each(function(){
            if ($(this).hasClass("noUi-value-large"))
                $(this).removeClass("noUi-value-large")
        })
    }
    componentDidMount () {
        this.root = $("#bandwidth_config")
        this.renderSilder()
    }
    onNetFlowType(value, e) {
        this.setState({net_flowtype: value})
    }
    render() {
        return (
            <div id="bandwidth_config" className="form-group">
                <label className="col-sm-3 control-label">公网带宽：</label>
                <div className="col-sm-9">
                    <ReactRadioGroup name="net_flowtype" value={this.state.net_flowtype} onChange={::this.onNetFlowType}>
                        <label className="radio-inline">
                            <input type="radio" name="net_flowtype" value={1} /> 固定模式
                        </label>
                        <label className="radio-inline">
                            <input type="radio" name="net_flowtype" value={2} /> 流量模式
                        </label>
                    </ReactRadioGroup>
                    <div className={this.state.net_flowtype == 1? "": "fn-none"}>
                        <div id="flowtype_slider" style={{marginTop: 20}}></div>
                        <input type="number" id="flowtype_input" style={{marginTop: 50}} />Mbps
                    </div>
                </div>
            </div>
        )
    }
}

export default BandwidthConfig
