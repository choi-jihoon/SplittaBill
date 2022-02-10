import "./AboutLinks.css";

const AboutLinks = () => {
	return (
		<div className="side-panel-about-container">
			<h4>Meet The Developers</h4>
			<div className="">
                <div className="">
					Cody Lavene
					<div className="links">
						<a
							href="https://github.com/codylavene"
							target="_blank"
							rel="noreferrer"
						>
							<i className="fab fa-github"></i>
						</a>
						<a
							href="https://www.linkedin.com/in/codylavene/"
							target="_blank"
							rel="noreferrer"
						>
							<i className="fab fa-linkedin"></i>
						</a>
					</div>
				</div>
				<div className="">
					Fiona Choi
					<div className="links">
						<a
							href="https://github.com/choi-jihoon"
							target="_blank"
							rel="noreferrer"
						>
							<i className="fab fa-github"></i>
						</a>
						<a
							href="https://www.linkedin.com/in/jihoon-choi-a6967a221/"
							target="_blank"
							rel="noreferrer"
						>
							<i className="fab fa-linkedin"></i>
						</a>
					</div>
				</div>
				<div className="">
					Vivian Thach
					<div className="links">
						<a
							href="https://github.com/bobaguardian"
							target="_blank"
							rel="noreferrer"
						>
							<i className="fab fa-github"></i>
						</a>
						<a
							href="https://www.linkedin.com/in/vivianthach1023/"
							target="_blank"
							rel="noreferrer"
						>
							<i className="fab fa-linkedin"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutLinks;
