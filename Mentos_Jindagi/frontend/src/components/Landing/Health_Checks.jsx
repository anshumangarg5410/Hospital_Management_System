import React from "react";

function Health_Checks() {
	const healthChecks = [
		{
			image: "/Assets/MA_PackageCover_FLU.avif",
			title: "FLU Vaccine - Adult",
			price: "₹ 99",
			tag: "At Clinic Only",
		},
		{
			image: "/Assets/MA_PackageCover_FLU2.avif",
			title: "FLU Vaccine - Pediatric",
			price: "₹ 99",
			tag: "At Clinic Only",
		},
		{
			image: "/Assets/Vitamin_D_uZLYdJ9.avif",
			title: "Vitamin D Test",
			price: "₹ 99",
			tag: "At Clinic Only",
		},
		{
			image: "/Assets/Basic_Health_Package.avif",
			title: "Basic Health Package",
			price: "₹ 99",
			tag: "At Clinic Only",
		},
		{
			image: "/Assets/HealthCheckup_Cover-1.avif",
			title: "Pro Health Package",
			price: "₹ 99",
			tag: "At Clinic Only",
		},
	];

	return (
		<div className="w-full ">
			{/* Title */}
			<div className="w-1/2 text-2xl font-sans text-left px-5 py-2.5 mt-12 ml-[7%]">
				<p>Affordable Health Checks and Diagnostics</p>
			</div>

			{/* Cards Grid */}
			<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 max-w-[85%] mx-auto p-5">
				{healthChecks.map((item, index) => (
					<article
						key={index}
						className="bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden transition-transform duration-200 hover:-translate-y-1">
						<div className="relative">
							<span className="absolute top-2.5 left-2.5 bg-blue-600 text-white text-xs px-2 py-1 rounded">
								{item.tag}
							</span>
							<img
								src={item.image}
								alt={item.title}
								className="w-[92%] h-[166px] object-cover block border-b border-gray-200 rounded-xl m-2"
							/>
						</div>
						<div className="p-3 text-left">
							<p className="text-base my-2 text-gray-800 font-sans">
								{item.title}
							</p>
							<p className="text-base font-bold text-gray-800">{item.price}</p>
						</div>
					</article>
				))}
			</section>
		</div>
	);
}

export default Health_Checks;
