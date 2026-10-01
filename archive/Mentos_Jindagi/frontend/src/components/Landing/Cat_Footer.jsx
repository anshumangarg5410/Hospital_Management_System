import React from "react";

function Cat_Footer() {
	const categories = [
		{
			title: "Mother & Baby",
			items: [
				"Baby Diapering",
				"Baby Bath & Skin Care",
				"Baby Food & Supplements",
				"Kids Food & Supplements",
				"Moms & Maternity",
				"Baby Medical Essentials",
				"Baby Feeding Accessories",
				"Baby Health & Safety",
				"Baby Gear & Nursery",
			],
		},
		{
			title: "Beauty",
			items: [
				"Skin Care",
				"Sun Protection",
				"Hair Care",
				"Bath & Body Care",
				"Fragrance",
				"Make Up",
				"Hand & Foot Care",
				"Kits & Combos",
				"Trending Skincare",
			],
		},
		{
			title: "Personal Care",
			items: [
				"Dental Hygiene",
				"Feminine Hygiene",
				"Sexual Wellness",
				"Hygiene Essentials",
				"Hair Removal",
				"Men's Grooming",
				"Travel & Comfort",
			],
		},
		{
			title: "Health & Wellness",
			items: [
				"Health Support",
				"Vitamins",
				"Minerals",
				"Wellness & Lifestyle",
				"Specialty Supplements",
				"Gut Health",
				"Sports Nutrition",
				"Health Food",
				"Shop by Women's Health",
				"Shop by Men's Health",
				"Shop by Nutrition Trends",
			],
		},
		{
			title: "Medical Essentials",
			items: [
				"Cough & Fever",
				"Cold & Flu",
				"Pain Relief",
				"Pharmacy Remedies",
				"Digestive Remedies",
				"First Aid",
				"Medical Supplies",
				"Specialist Remedies",
			],
		},
		{
			title: "Equipment & Homecare",
			items: [
				"Health Monitors",
				"Orthopedic Supports",
				"Mobility Support",
				"Bath & Shower Support",
				"Homecare Bed & Accessories",
				"Respiratory Care",
				"Massagers",
			],
		},
		{
			title: "Lifestyle & Fitness",
			items: [
				"Fitness & Exercise",
				"Health Food & Beverages",
				"Aromatherapy",
				"Sleep & Relaxation",
			],
		},
		{
			title: "Eye Care & Opticals",
			items: [
				"Sunglasses",
				"Reading Glasses",
				"Contact Lenses",
				"Eye Care Accessories",
				"Optical Frames",
			],
		},
		{
			title: "Pet Care",
			items: ["Pet First Aid", "Pet Supplements", "Pet Grooming"],
		},
	];
	return (
		<section className="py-10 px-5 border-t border-gray-300 font-sans">
			{/* Categories Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-6xl mx-auto">
				{categories.map((category, index) => (
					<div key={index} className="category-col">
						<h4 className="mb-3 text-base text-gray-900 font-semibold">
							{category.title}
						</h4>
						<ul className="list-none p-0">
							{category.items.map((item, itemIndex) => (
								<li
									key={itemIndex}
									className="text-sm mb-2 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors duration-300">
									{item}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			{/* Bottom Bar */}
			<div className="mt-10 pt-4 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4 max-w-6xl mx-auto">
				{/* Help Center */}
				<div className="flex items-center gap-4">
					<p className="text-sm text-gray-700">We're Always Here To Help</p>
					<a href="./HTML/contactpage.html">
						<button className="bg-white text-teal-600 border border-teal-600 px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 hover:bg-teal-50">
							Help Center
						</button>
					</a>
				</div>

				{/* Social Links */}
				{/* <div className="flex items-center gap-3">
					<span className="text-sm text-gray-700 mr-1">Follow Us On:</span>
					<a
						href="#"
						className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
						<Facebook size={18} />
					</a>
					<a
						href="#"
						className="text-gray-700 hover:text-pink-600 transition-colors duration-300">
						<Instagram size={18} />
					</a>
					<a
						href="#"
						className="text-gray-700 hover:text-blue-400 transition-colors duration-300">
						<Twitter size={18} />
					</a>
					<a
						href="#"
						className="text-gray-700 hover:text-blue-700 transition-colors duration-300">
						<Linkedin size={18} />
					</a>
					<a
						href="#"
						className="text-gray-700 hover:text-red-600 transition-colors duration-300">
						<Youtube size={18} />
					</a>
				</div> */}
			</div>
		</section>
	);
}

export default Cat_Footer;
