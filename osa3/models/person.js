const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })

  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const validatePhoneNumber = function(v) {
  const parts = v.split('-')
  if (parts.length !== 2) return false
  if (parts[0].length < 2 || parts[0].length > 3) return false
  return /^\d+$/.test(parts[0]) && /^\d+$/.test(parts[1])
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: validatePhoneNumber,
      message: (props) => `${props.value} is not a valid phone number! Use format XX-XXXXXXX or XXX-XXXXXXXX`
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)