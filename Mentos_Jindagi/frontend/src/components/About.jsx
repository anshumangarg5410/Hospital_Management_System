import React from "react";
import { useState } from "react";

function About() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};
	return (
		<div className="min-h-screen bg-gray-50 mt-[10vh]">

			{/* Main Content */}
			<main className="max-w-100vw mx-auto px-4 sm:px-6 lg:px-8 py-10">
				{/* What is HMS Section */}
				<section className="bg-white rounded-xl shadow-sm p-8 mb-6 hover:shadow-md transition-shadow duration-300">
					<h2 className="text-3xl font-bold text-gray-800 mb-6">
						What is HMS?
					</h2>
					<p className="text-gray-600 leading-relaxed text-lg">
						HMS (Hospital Management System) is a digital solution designed to
						help hospitals manage their daily operations more efficiently. Our
						software handles patient registration, appointment scheduling,
						medical records, billing, and reporting all in one place.
					</p>
				</section>

				{/* Why Choose HMS Section */}
				<section className="bg-white rounded-xl shadow-sm p-8 mb-6 hover:shadow-md transition-shadow duration-300">
					<h2 className="text-3xl font-bold text-gray-800 mb-6">
						Why Choose HMS?
					</h2>
					<p className="text-gray-600 leading-relaxed text-lg mb-8">
						Managing a hospital involves many complex processes. HMS simplifies
						these tasks by providing an easy-to-use platform that connects all
						departments and streamlines workflows. This means less paperwork,
						fewer errors, and more time for patient care.
					</p>

					{/* Features Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						<div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600 hover:bg-blue-50 transition-colors duration-300">
							<h3 className="font-bold text-gray-800 mb-3 text-lg">
								Easy to Use
							</h3>
							<p className="text-gray-600">
								Simple interface that staff can learn quickly
							</p>
						</div>
						<div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600 hover:bg-blue-50 transition-colors duration-300">
							<h3 className="font-bold text-gray-800 mb-3 text-lg">Secure</h3>
							<p className="text-gray-600">
								Patient data is protected with advanced security
							</p>
						</div>
						<div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600 hover:bg-blue-50 transition-colors duration-300">
							<h3 className="font-bold text-gray-800 mb-3 text-lg">Reliable</h3>
							<p className="text-gray-600">
								System works 24/7 without interruption
							</p>
						</div>
						<div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600 hover:bg-blue-50 transition-colors duration-300">
							<h3 className="font-bold text-gray-800 mb-3 text-lg">Support</h3>
							<p className="text-gray-600">
								Technical help available when you need it
							</p>
						</div>
					</div>
				</section>

				{/* Our Mission Section */}
				<section className="bg-white rounded-xl shadow-sm p-8 mb-6 hover:shadow-md transition-shadow duration-300">
					<h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
					<p className="text-gray-600 leading-relaxed text-lg">
						We want to make hospital management easier and more efficient. By
						using technology to handle routine tasks, healthcare workers can
						focus on what they do best - taking care of patients.
					</p>
				</section>

				{/* Who We Serve Section */}
				<section className="bg-white rounded-xl shadow-sm p-8 mb-6 hover:shadow-md transition-shadow duration-300">
					<h2 className="text-3xl font-bold text-gray-800 mb-6">
						Who We Serve
					</h2>
					<p className="text-gray-600 leading-relaxed text-lg">
						HMS is used by hospitals, clinics, and healthcare centers of all
						sizes. From small community clinics to large multi-specialty
						hospitals, our system adapts to meet different needs and
						requirements.
					</p>
				</section>

				{/* Contact Information Section */}
				<section className="bg-white rounded-xl shadow-sm p-8 mb-6 hover:shadow-md transition-shadow duration-300">
					<h2 className="text-3xl font-bold text-gray-800 mb-6">
						Contact Information
					</h2>
					<p className="text-gray-600 leading-relaxed text-lg">
						For more information about HMS or to schedule a demo, please contact
						our team. We're here to help you understand how our system can
						benefit your healthcare facility.
					</p>
				</section>
			</main>

			
		</div>
	);
}

export default About;
