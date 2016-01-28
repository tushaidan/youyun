export let cpus = {
    1: "1核",
    2: "2核",
    4: "4核",
    8: "8核",
    16: "16核",
    32: "32核",
}

export let cpusOption = Object.keys(cpus).map(function(value, index) {
    return {
        value: value,
        label: cpus[value]
    }
})

export let memorys = {
    1: "1G",
    2: "2G",
    4: "4G",
    8: "8G",
    16: "16G",
    32: "32G",
    64: "64G",
    128: "128G",
}

export let memorysOption = Object.keys(memorys).map(function(value, index) {
    return {
        value: value,
        label: memorys[value]
    }
})
