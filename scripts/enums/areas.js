export let areas = {
    1: "杭州",
    2: "上海",
    3: "广州",
    4: "北京",
}

export let areasOption = Object.keys(areas).map(function(value, index) {
    return {
        value: value,
        label: areas[value]
    }
})
