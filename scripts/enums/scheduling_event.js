export let events = {
    0: "轮询",
    1: "定时",
    2: "触发",
}

export let eventsOption = Object.keys(events).map(function(value, index) {
    return {
        value: value,
        label: events[value]
    }
})
