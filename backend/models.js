const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const ProduceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  garden: {
    type: Schema.Types.ObjectId,
  },
  price: {
    type: Number,
    required: true,
  },
  note: {
    type: String
  },
  image: {
    type: String,
    // required: true,
  }
});

const GardenSchema = new Schema({
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number
  },
  name: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  address: {
    type: String
  },
  bio: {
    type: String
  },
  produce: {
    type: [Schema.Types.ObjectId]
  }, 
  image: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId
  }
});

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gardens: {
    type: [Schema.Types.ObjectId],
  },
  image: {
    type: String,
  }
});

UserSchema.pre('save', function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = bcrypt.hashSync(user.password, 10);
  }
  return next(); 
});

UserSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);
const Garden = mongoose.model('Garden', GardenSchema);
const Produce = mongoose.model('Produce', ProduceSchema);

module.exports = { Garden, User, Produce };