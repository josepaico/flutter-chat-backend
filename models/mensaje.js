
const {Schema, model} = require('mongoose');

const MensajeSchema = Schema({
    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    online: {
        type: Boolean,
        default: false
    },
    mensaje: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

MensajeSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;

    return object;
});

module.exports = model('Mensaje', MensajeSchema);