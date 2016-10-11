$(document).ready(function() {
	var equation = "";
	var display = "";
	$(".btn").click(function() {
		var that = $(this).html();
		console.log(that);
		console.log(that.match(/[\.]/));
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
		$("#equation").html(equation);
		$("#display").html(display);
		// TODO: actual calculation
	});
});