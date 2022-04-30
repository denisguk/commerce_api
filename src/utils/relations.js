
function getRelations(relations) {
    if (!relations) {
        return undefined
    }

    if (Array.isArray(relations)) {
        return relations;
    }

    return [relations]
}

export {
    getRelations,
}
