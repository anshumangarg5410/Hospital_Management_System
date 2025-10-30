import React, { useState } from "react";

function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
		termsAccepted: false,
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.termsAccepted) {
			alert("Please accept the terms and conditions");
			return;
		}

		setIsSubmitting(true);
		// Simulate form submission
		setTimeout(() => {
			alert("Your message has been sent successfully!");
			setFormData({ name: "", email: "", message: "", termsAccepted: false });
			setIsSubmitting(false);
		}, 2000);
	};

	return (
		<>
			<div className="min-h-screen bg-gray-50 mt-[10vh]">
				<div className="flex flex-col lg:flex-row min-h-screen">
					{/* Left Section - Contact Form */}
					<div className="w-full lg:w-1/2 bg-white p-8 lg:p-20 flex flex-col justify-center">
						<div className="max-w-md mx-auto w-full">
							{/* Header */}
							<div className="text-center mb-10">
								<p className="text-xs text-gray-500 font-medium tracking-widest uppercase mb-4">
									CONTACT US
								</p>
								<h1 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
									Get in touch with us
								</h1>
								<p className="text-gray-600 leading-relaxed">
									Fill out the form below or schedule a meeting with us at your
									convenience.
								</p>
							</div>

							{/* Contact Form */}
							<div className="space-y-6">
								{/* Name Field */}
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
										NAME
									</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										placeholder="Your name"
										required
										className="w-full px-4 py-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
									/>
								</div>

								{/* Email Field */}
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
										EMAIL
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
										placeholder="Enter Your Email"
										required
										className="w-full px-4 py-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
									/>
								</div>

								{/* Message Field */}
								<div>
									<label
										htmlFor="message"
										className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
										MESSAGE
									</label>
									<textarea
										id="message"
										name="message"
										value={formData.message}
										onChange={handleInputChange}
										rows="5"
										placeholder="Enter Your Message"
										className="w-full px-4 py-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 resize-vertical"
									/>
								</div>

								{/* Terms and Conditions */}
								<div className="flex items-start space-x-3">
									<input
										type="checkbox"
										id="terms"
										name="termsAccepted"
										checked={formData.termsAccepted}
										onChange={handleInputChange}
										required
										className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
									/>
									<label
										htmlFor="terms"
										className="text-sm text-gray-600 leading-relaxed">
										I agree with{" "}
										<a
											href="#"
											className="text-blue-600 hover:text-blue-700 transition-colors">
											Terms and Conditions
										</a>
									</label>
								</div>

								{/* Submit Button */}
								<button
									onClick={handleSubmit}
									disabled={isSubmitting}
									className="w-full bg-gray-800 text-white py-4 px-6 rounded-lg font-semibold text-sm hover:bg-gray-900 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
									{isSubmitting ? "Sending..." : "Send Your Request"}
								</button>
							</div>

							{/* Alternative Contact Methods */}
							<div className="mt-8 pt-6 border-t border-gray-200">
								<p className="text-center text-sm text-gray-600 font-medium mb-5">
									<strong>You can also Contact Us via</strong>
								</p>
								<div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
									<div className="flex items-center justify-center space-x-3">
										{/* <Mail className="w-5 h-5 text-blue-600" /> */}
										<span className="text-sm text-gray-700">
											contact.growthhx@gmail.com
										</span>
									</div>
									<div className="flex items-center justify-center space-x-3">
										{/* <Phone className="w-5 h-5 text-blue-600" /> */}
										<span className="text-sm text-gray-700">
											+91 7648909213
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Section - Services & Locations */}
					<div className="w-full lg:w-1/2 bg-gray-50 p-8 lg:p-20 flex flex-col justify-center">
						<div className="max-w-md mx-auto w-full">
							{/* Services Section */}
							<div className="mb-12">
								<h3 className="text-xl font-semibold text-gray-900 mb-6">
									With our services you can
								</h3>
								<ul className="space-y-4">
									<li className="flex items-start space-x-3">
										{/* <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /> */}
										<span className="text-sm text-gray-700 leading-relaxed">
											Improve usability of your product
										</span>
									</li>
									<li className="flex items-start space-x-3">
										{/* <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /> */}
										<span className="text-sm text-gray-700 leading-relaxed">
											Engage users at a higher level and outperform your
											competition
										</span>
									</li>
									<li className="flex items-start space-x-3">
										{/* <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /> */}
										<span className="text-sm text-gray-700 leading-relaxed">
											Reduce the onboarding time and improve sales
										</span>
									</li>
									<li className="flex items-start space-x-3">
										{/* <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /> */}
										<span className="text-sm text-gray-700 leading-relaxed">
											Balance user needs with your business goal
										</span>
									</li>
								</ul>
							</div>

							{/* Locations Section */}
							<div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
										<h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
											<span className="mr-2">🇺🇸</span>USA
										</h4>
										<p className="text-sm text-gray-700 leading-relaxed">
											280 W, 17th street
											<br />
											4th floor, Flat no: 407
											<br />
											New York NY, 10018
										</p>
									</div>
									<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
										<h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
											<span className="mr-2">🇮🇳</span>India
										</h4>
										<p className="text-sm text-gray-700 leading-relaxed">
											Plot No 8-2-601/p/15ms
											<br />
											Banjara Hills, Road No 10
											<br />
											Hyderabad, 500034
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Contact;
