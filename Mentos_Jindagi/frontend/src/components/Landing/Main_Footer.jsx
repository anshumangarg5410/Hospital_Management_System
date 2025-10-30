import React from "react";

function Main_Footer() {
	return (
		<footer className="bg-gray-100 text-gray-700 py-10 px-5 font-arial w-full m-0">
			<div className="flex flex-wrap justify-between gap-8 max-w-6xl mx-auto">
				{/* About Section */}
				<div className="flex-1 min-w-[250px]">
					<h3 className="mb-4 text-gray-700">Hospital Management System</h3>
					<p className="text-gray-700 text-sm leading-relaxed">
						Providing 24/7 healthcare with the best doctors, modern facilities,
						and patient-friendly services. Your health is our priority.
					</p>
				</div>

				{/* Quick Links */}
				<div className="flex-1 min-w-[250px]">
					<h4 className="mb-4 text-gray-700">Quick Links</h4>
					<ul className="list-none p-0">
						<li className="mb-2">
							<a
								href="#"
								className="text-gray-700 text-sm no-underline leading-relaxed hover:text-blue-600 transition-colors">
								Home
							</a>
						</li>
						<li className="mb-2">
							<a
								href="#"
								className="text-gray-700 text-sm no-underline leading-relaxed hover:text-blue-600 transition-colors">
								About Us
							</a>
						</li>
						<li className="mb-2">
							<a
								href="#"
								className="text-gray-700 text-sm no-underline leading-relaxed hover:text-blue-600 transition-colors">
								Departments
							</a>
						</li>
						<li className="mb-2">
							<a
								href="#"
								className="text-gray-700 text-sm no-underline leading-relaxed hover:text-blue-600 transition-colors">
								Doctors
							</a>
						</li>
						<li className="mb-2">
							<a
								href="#"
								className="text-gray-700 text-sm no-underline leading-relaxed hover:text-blue-600 transition-colors">
								Contact
							</a>
						</li>
					</ul>
				</div>

				{/* Contact */}
				<div className="flex-1 min-w-[250px]">
					<h4 className="mb-4 text-gray-700">Contact Us</h4>
					<p className="text-gray-700 text-sm leading-relaxed mb-2">
						<strong>Address:</strong> 123 Health Street, New Delhi, India
					</p>
					<p className="text-gray-700 text-sm leading-relaxed mb-2">
						<strong>Phone:</strong> +91 98765 43210
					</p>
					<p className="text-gray-700 text-sm leading-relaxed">
						<strong>Email:</strong> info@hospital.com
					</p>
				</div>

				{/* Emergency */}
				<div className="flex-1 min-w-[250px]">
					<h4 className="mb-4 text-gray-700">Emergency</h4>
					<p className="text-gray-700 text-sm leading-relaxed mb-2">
						Helpline: <strong>102 / 108</strong>
					</p>
					<p className="text-gray-700 text-sm leading-relaxed mb-4">
						24/7 Ambulance and Emergency Support
					</p>
					<div className="flex gap-2">
						<a href="#" className="hover:scale-110 transition-transform">
							<img src="/Assets/facebook.jpeg" alt="Facebook" className="w-7" />
						</a>
						<a href="#" className="hover:scale-110 transition-transform">
							<img src="/Assets/twitter.png" alt="Twitter" className="w-7" />
						</a>
						<a href="#" className="hover:scale-110 transition-transform">
							<img src="/Assets/linkedin.png" alt="LinkedIn" className="w-7" />
						</a>
					</div>
				</div>
			</div>

			{/* Bottom */}
			<div className="text-center mt-8 pt-2.5 border-t border-gray-600 text-xs text-gray-700">
				<p>© 2025 Hospital Management System | All Rights Reserved</p>
			</div>
		</footer>
	);
}

export default Main_Footer;
