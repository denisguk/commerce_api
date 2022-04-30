
function getRelations(relations) {
    if (relations && Array.isArray(relations)) {
        return relations;
    }

    return [relations]
}

export {
    getRelations,
}
