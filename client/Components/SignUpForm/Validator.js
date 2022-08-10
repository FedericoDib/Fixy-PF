export function clientValidate(input) {
	// const [errors, setErrors] = React.useState ({});
	let errors = {};
	if (!input.name) {
		errors.name = 'Name is required';
	} else if (/([0-9])/.test(input.name)) {
		errors.name = 'Name is invalid, only strings';
	}
	if (!input.phoneNumber) {
		errors.phoneNumber = 'Phone number is required';
	}
	if (!input.province) {
		errors.province = 'Province is required';
	} else if (/([0-9])/.test(input.province)) {
		errors.province = 'Province is invalid, only strings';
	}
	if (!input.city) {
		errors.city = 'city is required';
	} else if (/([0-9])/.test(input.city)) {
		errors.city = 'city is invalid, only strings';
	}
	if (!input.address) {
		errors.address = 'address is required';
	}
	if (!input.perfilPic) {
		errors.address = 'address is required';
	}
	return errors;
}

export function professionalValidate(input) {
	// const [errors, setErrors] = React.useState ({});
	let errors = {};
	if (!input.name) {
		errors.name = 'Name is required';
	} else if (/([0-9])/.test(input.name)) {
		errors.name = 'Name is invalid, only strings';
	}
	if (!input.phoneNumber) {
		errors.phoneNumber = 'Phone number is required';
	}
	if (!input.province) {
		errors.province = 'Province is required';
	} else if (/([0-9])/.test(input.province)) {
		errors.province = 'Province is invalid, only strings';
	}
	if (!input.city) {
		errors.city = 'city is required';
	} else if (/([0-9])/.test(input.city)) {
		errors.city = 'city is invalid, only strings';
	}
	if (!input.address) {
		errors.address = 'address is required';
	}
	if (!input.perfilPic) {
		errors.perfilPic = 'perfilPic is required';
	}
	if (!input.enrollment) {
		errors.enrollment = 'enrollment is required';
	}
	if (!input.profession) {
		errors.profession = 'profession is required';
	}
	return errors;
}

export function requestValidate(input) {
	// const [errors, setErrors] = React.useState ({});
	let errors = {};
	if (!input.affair) {
		errors.affair = 'affair is required';
	}
	if (!input.address) {
		errors.address = 'address is required';
	}
	if (input.profession === 'Unknown') {
		errors.profession = 'profession is required';
	}
	if (!input.description) {
		errors.description = 'description is required';
	}
	return errors;
}
