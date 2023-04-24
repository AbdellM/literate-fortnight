class Login {
	constructor(form, fields) {
		this.form = form;
		this.fields = fields;
		this.values = {};
		this.validateonSubmit();
	}

	validateonSubmit() {
		let self = this;

		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			var error = 0;
			self.fields.forEach((field) => {
				const input = document.querySelector(`#${field}`);
				if (self.validateFields(input) == false) {
					error++;
				}
				this.values[field] = input.value;
			});
			if (error == 0) {
				//do login api here
				const url = 'http://localhost:3000/login';
				fetch(url, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(this.values)
				})
					.then(response => {
						if (!response.ok) {
							return response.json().then(error => {
								throw new Error(error.message);
							});
						}
						return response.json();
					})
					.then(data => {
						if (data.token) {
							localStorage.setItem("token", data.token);


							const parts = data.token.split('.');

							// Decode the payload (second part)
							const isAdmin = JSON.parse(atob(parts[1])).isAdmin;

							console.log(isAdmin);


							if (isAdmin) {
								window.location.href = 'admin/admin.html';
							} else {
								window.location.href = 'user/user.html';
							}
							// this.form.submit();
						}
					})
					.catch(error => this.form.querySelector(".error-popup").innerText = error.message);
			}
		});
	}

	validateFields(field) {
		if (field.value.trim() === "") {
			this.setStatus(
				field,
				`${field.previousElementSibling.innerText} cannot be blank`,
				"error"
			);
			return false;
		} else {
			if (field.type == "password") {
				if (field.value.length < 8) {
					this.setStatus(
						field,
						`${field.previousElementSibling.innerText} must be at least 8 characters`,
						"error"
					);
					return false;
				} else {
					this.setStatus(field, null, "success");
					return true;
				}
			} else {
				this.setStatus(field, null, "success");
				return true;
			}
		}
	}

	setStatus(field, message, status) {
		const errorMessage = field.parentElement.querySelector(".error-message");

		if (status == "success") {
			if (errorMessage) {
				errorMessage.innerText = "";
			}
			field.classList.remove("input-error");
		}

		if (status == "error") {
			errorMessage.innerText = message;
			field.classList.add("input-error");
		}
	}
}

const form = document.querySelector(".loginForm");
if (form) {
	const fields = ["username", "password"];
	const validator = new Login(form, fields);
}
