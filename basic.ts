interface Foo {
    nonsense(): string;
}

class Bar implements Foo {
    nonsense(): string {
        return "Hello, Chicago Code Camp!";
    }
}

class Types {
    trueOrFalse: boolean = true;
    message: string = "Hi there";
    value: number = 7;
    tuple: [string, number, Date] = ["David", 32, new Date(1984, 7, 7)];
    children: Types[] = [];
    nothing = null;
    nonExistent = undefined;
}

enum DayOfWeek {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}