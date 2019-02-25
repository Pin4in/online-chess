const mongoose = require('../libs/mongoose');
const crypto = require('crypto');
const _ = require('lodash');
const config = require('config');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Email is required',
    validate: [
      {
        validator(value) {
          return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
        },
        message: 'Invalid email'
      }
    ],
    unique: 'This email is used'
  },
  username: {
    type: String,
    required: 'User name is required',
    unique: 'This name is taken'
  },
  passwordHash: {
    type: String,
  },
  salt: {
    type: String,
  },
}, {
  timestamps: true,
});

function generatePassword(salt, password) {
  return crypto.pbkdf2Sync( password, salt, config.get('crypto.hash.iterations'),
    config.get('crypto.hash.length'), 'sha512').toString('hex');
}

userSchema.methods.setPassword = async function setPassword(password) {
  if (password !== undefined) {
    if (password.length < 4) {
      throw new Error('Password length should not less then 4 symbols');
    }
  }

  this.salt = crypto.randomBytes(config.get('crypto.hash.length')).toString('hex');
  this.passwordHash = await generatePassword(this.salt, password);
};

userSchema.methods.checkPassword = function(password) {
  if (!password) return false;

  const hash = generatePassword(this.salt, password);

  return hash === this.passwordHash;
};

module.exports = mongoose.model('User', userSchema);
