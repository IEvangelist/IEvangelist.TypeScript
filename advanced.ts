namespace IEvangelist.Intersections {

    // The TypeScript compiler will now treat any
    // two extended types as a single type, with
    // everything from both...

    function extend<T, U>(first: T, second: U): T & U {
        let result = <T & U>{};
        for (let id in first) {
            (<any>result)[id] = (<any>first)[id];
        }
        for (let id in second) {
            if (!result.hasOwnProperty(id)) {
                (<any>result)[id] = (<any>second)[id];
            }
        }
        return result;
    }

    class Person {
        constructor(public name: string) { }
    }
    interface Loggable {
        log(): void;
    }
    class ConsoleLogger implements Loggable {
        log() {
            // ...
        }
    }
    var david = extend(new Person("David Pine"), new ConsoleLogger());
    var name = david.name;
    david.log();
}

namespace IEvangelist.Unions {

    // Takes a string and adds "padding" to the left.
    // If 'padding' is a string, then 'padding' is appended to the left side.
    // If 'padding' is a number, then that number of spaces is added to the left side.

    function padLeft(value: string, padding: any) {
        if (typeof padding === "number") {
            return Array(padding + 1).join(" ") + value;
        }
        if (typeof padding === "string") {
            return padding + value;
        }
        throw new Error(`Expected string or number, got '${padding}'.`);
    }

    padLeft("Hello world", 4); // returns "    Hello world"

    // passes at compile time, fails at runtime.
    let indentedString = padLeft("Hello world", true);

    type stringOrNumber = string | number;
    function unionPadLeft(value: string, padding: stringOrNumber) {
        // ...
    }
    
    // indentedString = unionPadLeft("Hello world", true); // errors during compilation

    // More on union types...

    interface Bird {
        fly();
        layEggs();
    }

    interface Fish {
        swim();
        layEggs();
    }

    function getSmallPet(): Fish | Bird {
        return null;
    }

    let pet = getSmallPet();

    pet.layEggs(); // okay
    // pet.swim();    // errors

    // Each of these property accesses will cause an error
    // if (pet.swim) {
    //     pet.swim();
    // }
    // else if (pet.fly) {
    //     pet.fly();
    // }

    // We can use "type assertions" to reason about a given type.
    // This will solve the problem.

    if ((<Fish>pet).swim) {
        (<Fish>pet).swim();
    }
    else {
        (<Bird>pet).fly();
    }

    // User-defined type assertion

    function isBird(pet: Fish | Bird): pet is Bird {
        return (<Bird>pet).fly !== undefined;
    }

    // Both calls to 'swim' and 'fly' are now okay.

    if (isBird(pet)) {
        
        pet.fly(); // Cannot swim
    }
    else {
        pet.swim(); // Cannot fly
    }
}

namespace IEvangelist.TypeGaurds {

    // Leveraging "typeof"

    function isNumber(x: any): x is number {
        return typeof x === "number";
    }

    function isString(x: any): x is string {
        return typeof x === "string";
    }

    function padLeft(value: string, padding: string | number) {
        if (isNumber(padding)) {
            return Array(padding + 1).join(" ") + value;
        }
        if (isString(padding)) {
            return padding + value;
        }
        throw new Error(`Expected string or number, got '${padding}'.`);
    }

    // TypeScript can do this for primitive types automatically

    function builtitPadLeft(value: string, padding: string | number) {
        if (typeof padding === "number") {
            return Array(padding + 1).join(" ") + value;
        }
        if (typeof padding === "string") {
            return padding + value;
        }
        throw new Error(`Expected string or number, got '${padding}'.`);
    }

    // Leveraging "instanceof"

    interface Padder {
        getPaddingString(): string
    }

    class SpaceRepeatingPadder implements Padder {
        constructor(private numSpaces: number) { }
        getPaddingString() {
            return Array(this.numSpaces + 1).join(" ");
        }
    }

    class StringPadder implements Padder {
        constructor(private value: string) { }
        getPaddingString() {
            return this.value;
        }
    }

    function getRandomPadder() {
        return Math.random() < 0.5 ?
            new SpaceRepeatingPadder(4) :
            new StringPadder("  ");
    }

    // Type is 'SpaceRepeatingPadder | StringPadder'
    let padder: Padder = getRandomPadder();

    if (padder instanceof SpaceRepeatingPadder) {
        padder; // type narrowed to 'SpaceRepeatingPadder'
    }
    if (padder instanceof StringPadder) {
        padder; // type narrowed to 'StringPadder'
    }
}

namespace IEvangelist.TypeAliases {

    // Aliasing doesn't actually create a new type.
    // It creates a new name to refer to that type.

    type Name = string;

    type NameResolver = () => string;

    type NameOrResolver = Name | NameResolver;

    function getName(n: NameOrResolver): Name {
        if (typeof n === "string") {
            return n;
        }
        else {
            return n();
        }
    }

    // Like interfaces, aliases can be generic

    type Container<T> = { value: T };

    type Tree<T> = {
        value: T;
        left: Tree<T>;
        right: Tree<T>;
    }

    // Together with "intersection types", we can do this

    type LinkedList<T> = T & { next: LinkedList<T> };

    interface Person {
        name: string;
    }

    var people: LinkedList<Person>;
    var s = people.name;
    var s = people.next.name;
    var s = people.next.next.name;
    var s = people.next.next.next.name;
}

namespace IEvangelist.StringLiterals {
    type Easing = "ease-in" | "ease-out" | "ease-in-out";
    class UIElement {
        animate(dx: number, dy: number, easing: Easing) {
            switch (easing) {
                case "ease-in": break;
                case "ease-out": break;
                case "ease-in-out": break;
                default: throw new Error("Nope!");
            }
        }
    }

    let button = new UIElement();
    button.animate(0, 0, "ease-in");
    //button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here
}

namespace IEvangelist.DiscriminatedUnion {
    interface Square {
        kind: "square";
        size: number;
    }
    interface Rectangle {
        kind: "rectangle";
        width: number;
        height: number;
    }
    interface Circle {
        kind: "circle";
        radius: number;
    }

    type Shape = Square | Rectangle | Circle;

    // 1) Types that have a common, string literal property — the discriminant.
    // 2) A type alias that takes the union of those types — the union.
    // 3) Type guards on the common property.

    function area(s: Shape) {
        switch (s.kind) {
            case "square": return s.size * s.size;
            case "rectangle": return s.height * s.width;
            case "circle": return Math.PI * s.radius ** 2;
        }
    }
}

namespace IEvangelist.PolymorphicThis {
    class BasicCalculator {
        public constructor(protected value: number = 0) { }

        public currentValue(): number {
            return this.value;
        }

        public add(operand: number): this {
            this.value += operand;
            return this;
        }

        public multiply(operand: number): this {
            this.value *= operand;
            return this;
        }

        // omitted for brevity...
    }

    let value =
        new BasicCalculator(2)
            .multiply(5)
            .add(1)
            .currentValue();

    class ScientificCalculator extends BasicCalculator {
        public constructor(value: number = 0) {
            super(value);
        }

        public sin(): this {
            this.value = Math.sin(this.value);
            return this;
        }

        // ...
    }

    let wowValue =
        new ScientificCalculator(2)
            .multiply(5)
            .sin()
            .add(1)
            .currentValue();
}

namespace IEvangelist.IndexedTypes {

    // The "keyof" ensures that whatever the consumer provides to for "K",
    // that it property of the given type "T".

    function pluck<T, K extends keyof T>(obj: T, names: K[]): T[K][] {
        return names.map(name => obj[name]);
    }

    interface Person {
        name: string;
        age: number;
    }

    let person: Person = {
        name: 'David',
        age: 32
    };

    let strings: string[] = pluck(person, ['name']); // ok, string[]

    // The compiler checks that name is actually a property on Person

    // let error = pluck(person, ['age', 'unknown']);

    function getProperty<T, K extends keyof T>(obj: T, name: K): T[K] {
        return obj[name]; // obj[name] is of type T[K]
    }

    let name: string = getProperty(person, 'name');
    let age: number = getProperty(person, 'age');
    // let unknown = getProperty(person, 'unknown');
}

namespace IEvangelist.MappedTypes {

    // A common task is to take an existing type and 
    // make each of its properties optional or readonly

    class Person {
        name: string;
        age: number;
    }

    interface PersonPartial {
        name?: string;
        age?: number;
    }

    interface PersonReadonly {
        readonly name: string;
        readonly age: number;
    }

    // With type aliases, generics and keyof we can do some amazing things

    type Readonly<T> = {
        readonly [P in keyof T]: T[P];
    }

    type Partial<T> = {
        [P in keyof T]?: T[P];
    }

    var person: Partial<Person>;
    person
}