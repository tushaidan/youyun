export let events = {
    0: "应用安装前",
    1: "应用安装后",
    2: "应用启动前",
    3: "应用启动后",
    4: "应用卸载前",
    5: "应用卸载后",
    6: "应用停止前",
    7: "应用停止后"
}

export let eventsOption = Object.keys(events).map(function(value, index) {
    return {
        value: value,
        label: events[value]
    }
})
