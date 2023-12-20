$('input#submit').on('click', () => {
	createIdTemplate();
});

$('form#EmployeeDetails').change(() => {
	createIdTemplate();
})

$('form#EmergencyDetails').change(() => {
	createIdTemplate();
})

function createIdTemplate() {

	let employee = {
		name: $('form#EmployeeDetails')[0]['employee-name'].value,
		position: $('form#EmployeeDetails')[0]['employee-position'].value,
		address: $('form#EmployeeDetails')[0]['employee-address'].value,
		id_num: $('form#EmployeeDetails')[0]['employee-id-num'].value,
		sss_num: $('form#EmployeeDetails')[0]['employee-sss-num'].value,
		tin_num: $('form#EmployeeDetails')[0]['employee-tin-num'].value,
		signature: $('form#EmployeeDetails')[0]['employee-signature'].files[0],
		image: $('form#EmployeeDetails')[0]['employee-image'].files[0]
	}

	let emergency = {
		name: $('form#EmergencyDetails')[0]['emergency-name'].value,
		contact: $('form#EmergencyDetails')[0]['emergency-contact'].value,
		address: $('form#EmergencyDetails')[0]['emergency-address'].value,
		expiry: $('form#EmergencyDetails')[0]['emergency-expiry'].valueAsDate,
		signature: $('form#EmergencyDetails')[0]['emergency-signature'].files[0]
	}

	canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	canvas.width = 773;
	canvas.height = 609;

	// Id template
	let image = new Image();
	image.src = 'assets/id-template.png';
	ctx.drawImage(image, 0, 0);

	// Text
	ctx.font = "bold 14px Arial";
	ctx.fillStyle = "#000000";

	var subLen = 45

	ctx.fillText(employee.address.substring(0, subLen), 24, 53);
	ctx.fillText(employee.address.substring(subLen, subLen*2), 24, 73);
	ctx.fillText(employee.address.substring((subLen*2)+1, subLen*3), 24, 93);

	ctx.fillText(employee.sss_num, 96, 133);
	ctx.fillText(employee.tin_num, 96, 158);

	ctx.fillText(emergency.name, 78, 314);
	ctx.fillText(emergency.contact, 142, 339);

	var subLen = 37
	ctx.fillText(emergency.address.substring(0, subLen), 111, 363);
	ctx.fillText(emergency.address.substring(subLen, subLen*2), 111, 383);

	ctx.font = "bold 20px Arial";
	ctx.fillStyle = "#ff0000";
	
	if(emergency.expiry)
		ctx.fillText(emergency.expiry.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }), 138, 422);

	ctx.font = "bold 26px Arial";
	ctx.fillStyle = "#000000";
	ctx.fillText(employee.id_num, 631, 232);
	ctx.fillText(employee.name, 405, 355);
	ctx.fillText(employee.position, 405, 420);

	if(employee.signature) {
		let employee_sig = new Image();
		employee_sig.src = URL.createObjectURL(employee.signature);
		employee_sig.onload = () => {
			height = 80
			width = Math.round(employee_sig.width * (height / employee_sig.height));
			ctx.drawImage(employee_sig, 485	, 440, width, height);
		}
	}

	if(emergency.signature) {
		let emergency_image = new Image();
		emergency_image.src = URL.createObjectURL(emergency.signature);
		emergency_image.onload = () => {
			height = 80
			width = Math.round(emergency_image.width * (height / emergency_image.height));
			ctx.drawImage(emergency_image, 110, 426, width, height);
		}
	}

	if(employee.image) {
		let employee_image = new Image();
		employee_image.src = URL.createObjectURL(employee.image);
		employee_image.onload = () => {
			ctx.drawImage(employee_image, 425, 120, 178, 178);
		}
	}
		

}

createIdTemplate();