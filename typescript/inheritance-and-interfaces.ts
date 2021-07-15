/**
 * interface which specifies all properties of a living being
 */
interface IlivingBeing {
  name: string;
}

/**
 * Interface which specifies the bark method
 */
interface IBark {
  bark(): string; // functie die een string returned
}

// You can't instantiate an abstract class so this class is merely used as a base
abstract class animal implements IlivingBeing {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  makeNoise() {
    return "No sound!";
  }
}

/**
 * The feline class extends the animal class, as such it gets all properties and methods of the animal class
 */
class feline extends animal {
  // we receive a name and age and pass it to the super class (animal)
  constructor(name: string, age: number) {
    super(name, age);
  }

  // override the makeNoise method for felines
  makeNoise() {
    return "Miaauw";
  }
}

/**
 * The canine class extends animal but aditionally implements the bark interface
 * This means that we can put canine's in three groups now:
 * - objects that implement IBark
 * - Animals
 * - Canines
 *
 * we can mark canine as abstract because we have subdivided the canines into
 * dogs and wolves below.
 */
abstract class canine extends animal implements IBark {
  constructor(name: string, age: number) {
    super(name, age);
  }

  makeNoise() {
    return this.bark();
  }

  bark(): string {
    return "Woof not implemented";
  }

  howl() {
    return "Hooooowwwllll!";
  }
}

/**
 * The dog class simply extends canine and overrides the bark method
 * Because dogs are happy creatures they can also wag their tails
 */
class dog extends canine {
  constructor(name: string, age: number) {
    super(name, age);
  }

  wagTail() {
    return "happy";
  }

  bark() {
    return "wooof";
  }
}

/**
 * Simply extends from canine and implements a louder bark (more o's in wooof)
 */
class wolf extends canine {
  constructor(name: string, age: number) {
    super(name, age);
  }

  bark() {
    return "wooooof";
  }
}

/**
 * A rat is what we call those teeny tiny dogs (like chihuahuas)
 */
class rat extends canine {
  size: string;

  constructor(name: string, age: number) {
    super(name, age);
  }

  howl() {
    return "garble " + super.howl();
  }

  bark() {
    return "woof";
  }
}

//
// The classes below show that we can even group "animals" and "others" together
// if they all implement the same (ILivingBeing) interface
//

class person implements IlivingBeing {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

/**
 * Aliens don't really have a name (they have a designation, military race and all)
 * in order to class them as IlivingBeing we need to give them a name (because humans like to name everything)
 * we do this in the constructor by simply using the aliens designation as its name.
 */
class alien implements IlivingBeing {
  name: string;
  designation: number;

  constructor(num: number) {
    this.designation = num;
    this.name = this.designation.toString();
  }
}

//  _______        _
// |__   __|      | |
//    | | ___  ___| |_   _ __ _   _ _ __  ___
//    | |/ _ \/ __| __| | '__| | | | '_ \/ __|
//    | |  __/\__ \ |_  | |  | |_| | | | \__ \
//    |_|\___||___/\__| |_|   \__,_|_| |_|___/

// object declarations
let cat1 = new feline("cat1", 6);
let cat2 = new feline("cat2", 4);
let dog1 = new dog("dog1", 12);
let wolf1 = new wolf("wolf", 7);
let dog2 = new dog("dog2", 4);
let rat1 = new rat("rattekop", 6);
let person1 = new person("John");
let alien1 = new alien(12351);

// Arr declarations
let animals: animal[] = [cat1, cat2, dog1, wolf1, dog2, rat1];
let dogs: dog[] = [dog1, dog2];
let canines: canine[] = [dog1, dog2, wolf1, rat1];
let barkers: IBark[] = [...canines];
let felines: feline[] = [cat1];
let livingBeings: IlivingBeing[] = [
  cat1,
  cat2,
  dog1,
  wolf1,
  dog2,
  rat1,
  person1,
  alien1,
];

// for loops
console.log("Dog Wagtails");
dogs.forEach((dog) => {
  console.log(dog.wagTail());
});
console.log(" ");

console.log("Canine Howls");
canines.forEach((canine) => {
  console.log(canine.howl());
});
console.log(" ");

console.log("Animals makeNoise");
animals.forEach((animal) => {
  console.log(animal.makeNoise());
});
console.log(" ");

console.log("Beings name");
livingBeings.forEach((livingbeing) => {
  console.log(livingbeing.name, livingbeing);
});
console.log(" ");

console.log("Barkers");
barkers.forEach((barker) => {
  console.log(barker.bark());
});
