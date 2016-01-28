class BillingConfig extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            costType: 1
        }
    }
    onBillingType(value, e) {
        this.setState({costType: value})
    }
    componentDidMount() {
        this.root = $("#billing_config")
        let slider = document.getElementById('billing_slider')

        noUiSlider.create(slider, {
            start: 1,
            step: 1,
            connect: "lower",
            range: {
                min: 1,
                max: 12
            },
            pips: {
                mode: 'steps',
                density: 10,
                format: wNumb({postfix: '个月'})
            }
        })

        slider.noUiSlider.on('change', (values)=> {
            this.props.setState({costMonth: parseInt(values[0])})
        })

        this.fixUi()
    }
    fixUi() {
        $("#billing_slider .noUi-value", this.root).each(function() {
            if ($(this).text() == "10个月")
                $(this).text("1年")
            else if ($(this).text() == "11个月")
                $(this).text("2年")
            else if ($(this).text() == "12个月")
                $(this).text("3年")

            if ($(this).hasClass("noUi-value-large"))
                $(this).removeClass("noUi-value-large")
        })
    }
    render() {
        return (
            <div id="billing_config">
                <ReactRadioGroup name="costType" value={this.state.costType} onChange={::this.onBillingType}>
                    <label className="radio-inline">
                        <input type="radio" name="costType" value={1} />
                        按量计费
                    </label>
                    <label className="radio-inline">
                        <input type="radio" name="costType" value={2} />
                        包年包月
                    </label>
                </ReactRadioGroup>
                <div className={this.state.costType == 2
                    ? ""
                    : "fn-none"}>
                    <div id="billing_slider"></div>
                </div>
            </div>
        )
    }
}

export default BillingConfig
