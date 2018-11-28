var mongoose = require('mongoose');

var ShoppingSchema = new mongoose.Schema({
  Name: String,
  Price: Number,
  Ordered: {type: Number, default: 0},
  Picture: String
});

ShoppingSchema.methods.upOrder = function(cb) {
  this.Ordered += 1;
  this.save(cb);
};

mongoose.model('Shopping', ShoppingSchema);