$(document).ready(function() {
	var equation = "";
	var display = "";
	$(".btn").click(function() {
		var that = $(this).html();
		// anything not involving calculation
		if (that.match(/[0-9]/)) {
			equation += that;
			if (display.match(/[^\.0-9]/)) {
				display = that;
			}
			// ensure full number gets put on display when adding digits after cancelling
			else if ((equation.match(/[\.0-9]/g)).length == equation.length) {
				display = equation;
			}
			else {
				display += that;
			}
		}
		else if (that == "pi") {
			if ((display == "" && equation == "") || display.match(/[^0-9]/) || (display.length == 0 && (equation.match(/[\.0-9]/g)).length != equation.length)) {
				display = 3.14159;
				equation += display;
			}
		}
		else if (that == "AC") {
			display = "";
			equation = "";
		}
		else if (that == "CE") {
			display = "";

			// remove digits until an operator is hit from equation
			var arr = equation.split("");
			while (arr.length > 0) {
				var temp = arr.pop();
				if (temp.match(/[^\.0-9]/)) {
					break;
				}
			}
			equation = arr.join("");
		}
		else if (that.match(/[\.]/)) {
			if (display.match(/[\.]/) == null) {
				if (display[display.length - 1].match(/[^0-9]/)) {
					display = that;
					equation += that;
				}
				else {
					display += that;
					equation += that;
				}
			}
		}
		else if (that.match(/[^=]/)) {
			if (equation[equation.length - 1].match(/[0-9]/)) {
				equation += that;
				display = that;
			}
		}
		else if (that.match("\=") && equation[equation.length - 1].match(/[0-9]/)) {
			var temp = 0;
			var numbers = equation.split(/[^\.0-9]/g);
			// handles negative numbers
			if (numbers[0] == "") {
				numbers.shift();
				numbers[0] *= -1;
			}
			numbers.push(numbers.shift());
			for (var i = 0; i < numbers.length; i++) {
				numbers[i] = parseFloat(numbers[i]);
			}
			var operators = equation.split("").filter(function(item, i, arr) {
				return item.match(/[^\.0-9]/);
			});
			for (var j = 0; j < operators.length; j++) {
				switch (operators[j]) {
					case "\xD7":
						temp = numbers.pop() * numbers.shift();
						numbers.push(temp);
						break;
					case "\xF7":
						temp = numbers.pop() / numbers.shift();
						numbers.push(temp);
						break;
					case "\x2B":
						temp = numbers.pop() + numbers.shift();
						numbers.push(temp);
						break;
					case "\u2212":
						temp = numbers.pop() - numbers.shift();
						numbers.push(temp);
						break;
				}
			}
			display = numbers[0].toString();
			equation = display;
		}
		$("#equation").html(equation);
		$("#display").html(display);
	});
});