const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.log(error.message);
  }
};

connectDb();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let Person = require("./models/personSchema");

const createAndSavePerson = async (done) => {
  try {
    const person = new Person({
      name: "Jake",
      age: 33,
      favouriteFoods: ["Burgers", "Pizza"],
    });

    await person.save();
    done(null, person);
  } catch (error) {
    console.error(error);
  }
};

const createManyPeople = async (arrayOfPeople, done) => {
  try {
    await Person.create(arrayOfPeople);
    done(null, arrayOfPeople);
  } catch (error) {
    console.error(error);
  }
};

const findPeopleByName = async (personName, done) => {
  try {
    const person = await Person.find({
      name: personName,
    });
    done(null, person);
  } catch (error) {
    console.error(error);
  }
};

const findOneByFood = async (food, done) => {
  try {
    const favoriteFood = await Person.findOne({
      favoriteFoods: food,
    });
    done(null, favoriteFood);
  } catch (error) {
    console.error(error);
  }
};

const findPersonById = async (personId, done) => {
  try {
    const person = await Person.findById(personId);
    done(null, person);
  } catch (error) {
    console.error(error);
  }
};

const findEditThenSave = async (personId, done) => {
  try {
    const person = await Person.findById(personId);

    const foodToAdd = "hamburger";

    person.favoriteFoods.push(foodToAdd);

    await person.save();

    done(null, person);
  } catch (error) {
    console.error(error);
  }
};

const findAndUpdate = async (personName, done) => {
  try {
    const ageToSet = 20;
    const person = await Person.findOneAndUpdate(
      { name: personName },
      { age: ageToSet },
      { new: true }
    );

    done(null, person);
  } catch (error) {
    console.error(error);
  }
};

const removeById = async (personId, done) => {
  try {
    const person = await Person.findByIdAndDelete(personId);
    done(null, person);
  } catch (error) {
    console.error(error);
  }
};

const removeManyPeople = async (done) => {
  try {
    const nameToRemove = "Mary";

    const people = await Person.remove({ name: nameToRemove });

    done(null, people);
  } catch (error) {
    console.error(error);
  }
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
