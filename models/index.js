const ENGINE_DB = process.env.ENGINE_DB

const pathModels = (ENGINE_DB === 'nosql') ? './nosql/' : './mysql/'

const models = {
    usersModel: require(pathModels+'users'),
    tracksModel: require(pathModels+'tracks'),
    comerciosModel: require(pathModels+'comercios'),
    webpagesModel: require(pathModels+'webpages'),
    storageModel: require(pathModels+'storage'),
    fotosModel: require(pathModels+'fotos'),
    textosModel: require(pathModels+'textos')
}

module.exports = models