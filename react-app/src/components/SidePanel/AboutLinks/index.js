import "./AboutLinks.css";

const AboutLinks = () => {
	return (
		<div className="side-panel-about-container">
			<h3>Meet The Developers</h3>
			<div className="about-profiles">
				<div className="side-panel-about-profile">
					<img
						src="http://splitabill.s3.amazonaws.com/preserve/1d5fa99297fa407e94f293f5ad0e40ff.png"
						alt="cody-pic"
					></img>
					<div className="links">
						<p>Cody Lavene</p>
						<div className="about-icons">
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
				</div>
				<div className="side-panel-about-profile">
					<img
						src="http://splitabill.s3.amazonaws.com/preserve/5291b74b486d48b19223f3aab8097bd4.jpg"
						alt="fiona-pic"
					></img>
					<div className="links">
						<p>Fiona Choi</p>
						<div className="about-icons">
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
				</div>
				<div className="side-panel-about-profile">
					<img
						src="http://splitabill.s3.amazonaws.com/preserve/f2f1be08ffc9479ca754ad89a3b6f85d.jpg"
						alt="vivian-pic"
					></img>
					<div className="links">
						<p>Vivian Thach</p>
						<div className="about-icons">
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
		</div>
	);
};

export default AboutLinks;
