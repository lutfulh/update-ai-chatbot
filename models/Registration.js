const mongoose = require("mongoose")

const { schema } = mongoose;

const registrationSchema = new schema({
    productName:String,
    number:SVGAnimatedInteger,
    email:String
});

mongoose.model('registration',registrationSchema);