var Bar = (function () {
    function Bar() {
    }
    Bar.prototype.nonsense = function () {
        return "Hello, Chicago Code Camp!";
    };
    return Bar;
}());
var Types = (function () {
    function Types() {
        this.trueOrFalse = true;
        this.message = "Hi there";
        this.value = 7;
        this.tuple = ["David", 32, new Date(1984, 7, 7)];
        this.children = [];
        this.nothing = null;
        this.nonExistent = undefined;
    }
    return Types;
}());
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek[DayOfWeek["Sunday"] = 0] = "Sunday";
    DayOfWeek[DayOfWeek["Monday"] = 1] = "Monday";
    DayOfWeek[DayOfWeek["Tuesday"] = 2] = "Tuesday";
    DayOfWeek[DayOfWeek["Wednesday"] = 3] = "Wednesday";
    DayOfWeek[DayOfWeek["Thursday"] = 4] = "Thursday";
    DayOfWeek[DayOfWeek["Friday"] = 5] = "Friday";
    DayOfWeek[DayOfWeek["Saturday"] = 6] = "Saturday";
})(DayOfWeek || (DayOfWeek = {}));
