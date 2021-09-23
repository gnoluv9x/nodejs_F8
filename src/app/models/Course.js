const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const Course = new Schema({
    _id : {type : Number},
    name: { type : String , required: true },
    description: { type : String , required: true },
    image: { type : String },
    videoId : { type : String , required : true},
    level: { type : String , required : true},
    slug: { type: String, slug: "name" , unique: true }
},{
    _id : false,
    collection: 'courses',
    timestamps : true,
});

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete ,  {
        deletedAt : true,
        overrideMethods: 'all' ,
});
Course.plugin(AutoIncrement);

module.exports = mongoose.model('courses', Course);