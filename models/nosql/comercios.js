const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const ComerciosScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        cif: {
            type: String
        },
        direccion: {
            type: String            
        },
        email: {
            type: String
        },
        telefono: {
            type: String
        },
        idpagina: {
            type: Number
        },
    },
    {
        timestamps: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)

/**
 * Implementar método propio (custom findAllData static function) con relación a Storage
 */
ComerciosScheme.statics.findAllData = function() {
    // "this." hace referencia a su propio modelo
    const joinData = this.aggregate([
        {
            // lookup =~ join (STAGE 1)
            $lookup: {
                from: "storages",
                localField: "mediaId", // tracks.mediaId
                foreignField: "_id",   // storages._id
                as: "audio" // Alias audio
            }
        },
      /*{
            // From left join to inner join (STAGE 2) 
            $unwind:"$audio"
        } */
    ])
    return joinData
}

ComerciosScheme.statics.findOneData = function(id) {
    // "this." hace referencia a su propio modelo
    const joinData = this.aggregate([
        {
            // Match by id (STAGE 1)
            $match: {
                _id: mongoose.Types.ObjectId(id)
            }
        },
        {
            // lookup =~ join (STAGE 2)
            $lookup: {
                from: "storages",
                localField: "mediaId", // tracks.mediaId
                foreignField: "_id",   // storages._id
                as: "audio" // Alias audio
            }
        },
     /* {
            // From left join to inner join (STAGE 3) 
            $unwind:"$audio"
        }, */
    ])
    return joinData
}

ComerciosScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("comercios", ComerciosScheme) // Nombre de la colección (o de la tabla en SQL)