var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var IEvangelist;
(function (IEvangelist) {
    var Intersections;
    (function (Intersections) {
        // The TypeScript compiler will now treat any
        // two extended types as a single type, with
        // everything from both...
        function extend(first, second) {
            var result = {};
            for (var id in first) {
                result[id] = first[id];
            }
            for (var id in second) {
                if (!result.hasOwnProperty(id)) {
                    result[id] = second[id];
                }
            }
            return result;
        }
        var Person = (function () {
            function Person(name) {
                this.name = name;
            }
            return Person;
        }());
        var ConsoleLogger = (function () {
            function ConsoleLogger() {
            }
            ConsoleLogger.prototype.log = function () {
                // ...
            };
            return ConsoleLogger;
        }());
        var david = extend(new Person("David Pine"), new ConsoleLogger());
        var name = david.name;
        david.log();
    })(Intersections = IEvangelist.Intersections || (IEvangelist.Intersections = {}));
})(IEvangelist || (IEvangelist = {}));
(function (IEvangelist) {
    var Unions;
    (function (Unions) {
        // Takes a string and adds "padding" to the left.
        // If 'padding' is a string, then 'padding' is appended to the left side.
        // If 'padding' is a number, then that number of spaces is added to the left side.
        function padLeft(value, padding) {
            if (typeof padding === "number") {
                return Array(padding + 1).join(" ") + value;
            }
            if (typeof padding === "string") {
                return padding + value;
            }
            throw new Error("Expected string or number, got '" + padding + "'.");
        }
        padLeft("Hello world", 4); // returns "    Hello world"
        // passes at compile time, fails at runtime.
        var indentedString = padLeft("Hello world", true);
        function unionPadLeft(value, padding) {
            // ...
        }
        indentedString = unionPadLeft("Hello world", true); // errors during compilation
        function getSmallPet() {
            return null;
        }
        var pet = getSmallPet();
        pet.layEggs(); // okay
        // pet.swim();    // errors
        // Each of these property accesses will cause an error
        if (pet.swim) {
            pet.swim();
        }
        else if (pet.fly) {
            pet.fly();
        }
        // We can use "type assertions" to reason about a given type.
        // This will solve the problem.
        if (pet.swim) {
            pet.swim();
        }
        else {
            pet.fly();
        }
        // User-defined type assertion
        function isBird(pet) {
            return pet.fly !== undefined;
        }
        // Both calls to 'swim' and 'fly' are now okay.
        if (isBird(pet)) {
            pet.fly(); // Cannot swim
        }
        else {
            pet.swim(); // Cannot fly
        }
    })(Unions = IEvangelist.Unions || (IEvangelist.Unions = {}));
})(IEvangelist || (IEvangelist = {}));
(function (IEvangelist) {
    var TypeGaurds;
    (function (TypeGaurds) {
        // Leveraging "typeof"
        function isNumber(x) {
            return typeof x === "number";
        }
        function isString(x) {
            return typeof x === "string";
        }
        function padLeft(value, padding) {
            if (isNumber(padding)) {
                return Array(padding + 1).join(" ") + value;
            }
            if (isString(padding)) {
                return padding + value;
            }
            throw new Error("Expected string or number, got '" + padding + "'.");
        }
        // TypeScript can do this for primitive types automatically
        function builtitPadLeft(value, padding) {
            if (typeof padding === "number") {
                return Array(padding + 1).join(" ") + value;
            }
            if (typeof padding === "string") {
                return padding + value;
            }
            throw new Error("Expected string or number, got '" + padding + "'.");
        }
        var SpaceRepeatingPadder = (function () {
            function SpaceRepeatingPadder(numSpaces) {
                this.numSpaces = numSpaces;
            }
            SpaceRepeatingPadder.prototype.getPaddingString = function () {
                return Array(this.numSpaces + 1).join(" ");
            };
            return SpaceRepeatingPadder;
        }());
        var StringPadder = (function () {
            function StringPadder(value) {
                this.value = value;
            }
            StringPadder.prototype.getPaddingString = function () {
                return this.value;
            };
            return StringPadder;
        }());
        function getRandomPadder() {
            return Math.random() < 0.5 ?
                new SpaceRepeatingPadder(4) :
                new StringPadder("  ");
        }
        // Type is 'SpaceRepeatingPadder | StringPadder'
        var padder = getRandomPadder();
        if (padder instanceof SpaceRepeatingPadder) {
            padder; // type narrowed to 'SpaceRepeatingPadder'
        }
        if (padder instanceof StringPadder) {
            padder; // type narrowed to 'StringPadder'
        }
    })(TypeGaurds = IEvangelist.TypeGaurds || (IEvangelist.TypeGaurds = {}));
})(IEvangelist || (IEvangelist = {}));
(function (IEvangelist) {
    var TypeAliases;
    (function (TypeAliases) {
        // Aliasing doesn't actually create a new type.
        // It creates a new name to refer to that type.
        function getName(n) {
            if (typeof n === "string") {
                return n;
            }
            else {
                return n();
            }
        }
        var people;
        var s = people.name;
        var s = people.next.name;
        var s = people.next.next.name;
        var s = people.next.next.next.name;
    })(TypeAliases = IEvangelist.TypeAliases || (IEvangelist.TypeAliases = {}));
})(IEvangelist || (IEvangelist = {}));
(function (IEvangelist) {
    var StringLiterals;
    (function (StringLiterals) {
        var UIElement = (function () {
            function UIElement() {
            }
            UIElement.prototype.animate = function (dx, dy, easing) {
                switch (easing) {
                    case "ease-in": break;
                    case "ease-out": break;
                    case "ease-in-out": break;
                    default: throw new Error("Nope!");
                }
            };
            return UIElement;
        }());
        var button = new UIElement();
        button.animate(0, 0, "ease-in");
        // button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here
    })(StringLiterals = IEvangelist.StringLiterals || (IEvangelist.StringLiterals = {}));
})(IEvangelist || (IEvangelist = {}));
(function (IEvangelist) {
    var DiscriminatedUnion;
    (function (DiscriminatedUnion) {
        // 1) Types that have a common, string literal property — the discriminant.
        // 2) A type alias that takes the union of those types — the union.
        // 3) Type guards on the common property.
        function area(s) {
            switch (s.kind) {
                case "square": return s.size * s.size;
                case "rectangle": return s.height * s.width;
                case "circle": return Math.PI * Math.pow(s.radius, 2);
            }
        }
    })(DiscriminatedUnion = IEvangelist.DiscriminatedUnion || (IEvangelist.DiscriminatedUnion = {}));
})(IEvangelist || (IEvangelist = {}));
(function (IEvangelist) {
    var PolymorphicThis;
    (function (PolymorphicThis) {
        var BasicCalculator = (function () {
            function BasicCalculator(value) {
                if (value === void 0) { value = 0; }
                this.value = value;
            }
            BasicCalculator.prototype.currentValue = function () {
                return this.value;
            };
            BasicCalculator.prototype.add = function (operand) {
                this.value += operand;
                return this;
            };
            BasicCalculator.prototype.multiply = function (operand) {
                this.value *= operand;
                return this;
            };
            return BasicCalculator;
        }());
        var value = new BasicCalculator(2)
            .multiply(5)
            .add(1)
            .currentValue();
        var ScientificCalculator = (function (_super) {
            __extends(ScientificCalculator, _super);
            function ScientificCalculator(value) {
                if (value === void 0) { value = 0; }
                return _super.call(this, value) || this;
            }
            ScientificCalculator.prototype.sin = function () {
                this.value = Math.sin(this.value);
                return this;
            };
            return ScientificCalculator;
        }(BasicCalculator));
        var wowValue = new ScientificCalculator(2)
            .multiply(5)
            .sin()
            .add(1)
            .currentValue();
    })(PolymorphicThis = IEvangelist.PolymorphicThis || (IEvangelist.PolymorphicThis = {}));
})(IEvangelist || (IEvangelist = {}));
(function (IEvangelist) {
    var IndexedTypes;
    (function (IndexedTypes) {
        // The "keyof" ensures that whatever the consumer provides to for "K",
        // that it property of the given type "T".
        function pluck(obj, names) {
            return names.map(function (name) { return obj[name]; });
        }
        var person = {
            name: 'David',
            age: 32
        };
        var strings = pluck(person, ['name']); // ok, string[]
        // The compiler checks that name is actually a property on Person
        // let error = pluck(person, ['age', 'unknown']);
        function getProperty(obj, name) {
            return obj[name]; // obj[name] is of type T[K]
        }
        var name = getProperty(person, 'name');
        var age = getProperty(person, 'age');
        // let unknown = getProperty(person, 'unknown');
    })(IndexedTypes = IEvangelist.IndexedTypes || (IEvangelist.IndexedTypes = {}));
})(IEvangelist || (IEvangelist = {}));
