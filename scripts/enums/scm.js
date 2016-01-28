export const scm = {
    // "git": "Git",
    // "mercurial": "Mercurial",
    // "tfs": "Team Foundation Server",
    "svn": "Subversion"
}

export let scmOption = Object.keys(scm).map(function(value, index) {
    return {
        value: value,
        label: scm[value]
    }
})
