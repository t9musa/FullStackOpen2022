const mongoose = require('mongoose')

const password = process.argv[2]  //pqvT92umi3PQxP4
const url =
`mongodb+srv://t9musa00:${password}@cluster0.3hcf1p1.mongodb.net/noteApp?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)


if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
else if (process.argv.length>4) {

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(result => {
    console.log(`${process.argv[3]} added to database`)
    mongoose.connection.close()
  })

} else {

  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(x => {
      console.log(x.name, x.number)
    })
    mongoose.connection.close()
  })
}
