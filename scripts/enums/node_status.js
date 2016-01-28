export let status = {
    0: "未运行",
    1: "启动中",
    2: "运行中",
    3: "停止中",
    4: "错误",
}

export let statusOption = Object.keys(status).map(function(value, index) {
    return {
        value: value,
        label: status[value]
    }
})
