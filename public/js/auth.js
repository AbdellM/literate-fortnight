class Auth {
	constructor() {
        document.querySelector("body").style.display = "none";
		const token = localStorage.getItem("token");
		this.validateAuth(token);
	}

	validateAuth(token) {
		if (!token) {
			window.location.replace("/");
		} else {
            document.querySelector("body").style.display = "block";
		}
	}

	logOut() {
		localStorage.removeItem("token");
		window.location.replace("/");
	}
}
