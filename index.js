const wheel = document.querySelector(".wheel");
const balls = document.querySelectorAll(".ball");

const form = document.querySelector("form");
const recaptchaContainer = document.getElementById("recaptcha-container");

const radius = 120; // Adjust this value based on your requirements
const angle = (Math.PI * 2) / balls.length;
let rotation = 0;

balls.forEach((ball, index) => {
	const x = Math.round(radius * Math.cos(rotation) - ball.offsetWidth / 2);
	const y = Math.round(radius * Math.sin(rotation) - ball.offsetHeight / 2);

	ball.style.transform = `translate(${x}px, ${y}px)`;
	rotation += angle;
});

let hamburguer = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

hamburguer.onclick = () => {
	hamburguer.classList.toggle("bx-x");
	navbar.classList.toggle("active");
};

let sections = document.querySelectorAll("section");
let navlinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
	sections.forEach((section) => {
		let top = window.scrollY;
		let offset = section.offsetTop - 100;
		let height = section.offsetHeight;
		let id = section.getAttribute("id");
		if (top >= offset && top < offset + height) {
			navlinks.forEach((link) => {
				link.classList.remove("active");
				document
					.querySelector("header nav a[href*=" + id + "]")
					.classList.add("active");
			});
		}
	});

	let header = document.querySelector("header");
	header.classList.toggle("sticky", window.scrollY > 100);

	hamburguer.classList.remove("bx-x");
	navbar.classList.remove("active");
};

form.addEventListener("submit", function (event) {
	event.preventDefault(); // Prevent the form from submitting
	const name = document.getElementById("name");
	const email = document.getElementById("email");
	const message = document.getElementById("message");

	// Display the reCAPTCHA container
	recaptchaContainer.style.display = "block";

	const captchaResponse = grecaptcha.getResponse();
	console.log(captchaResponse);
	console.log(captchaResponse.length);
	if (captchaResponse.length == 0) {
		throw new Error("Captcha not completed");
	} else {
		const formData = new FormData(event.target);
		const params = new URLSearchParams(formData);
		fetch("https://formspree.io/f/xgejoolw", {
			method: "POST",
			body: params,
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));

		recaptchaContainer.style.display = "none";
		name.value = "";
		email.value = "";
		message.value = "";
		grecaptcha.reset();

		// Show the modal
		const modal = document.getElementById("modal");
		modal.style.display = "block";

		const closeBtn = document.querySelector(".close");
		closeBtn.addEventListener("click", function () {
			const modal = document.getElementById("modal");
			modal.style.display = "none";
		});
	}
});
