import React from "react";

function Services_Grid() {
	const services = [
		{
			href: "./HTML/medicine.html",
			image: "/Assets/shop_pharmacy.webp",
			alt: "Shop Pharmacy",
			caption: "Shop Pharmacy",
		},
		{
			href: "#home",
			image: "/Assets/order_prescription.webp",
			alt: "Order Prescription",
			caption: "Order Prescription",
		},
		{
			href: "./HTML/login_pat.html",
			image: "/Assets/Consult_Doctor.avif",
			alt: "Book a Doctor",
			caption: "Book a Doctor",
		},
		{
			href: "./HTML/appointment3.html",
			image: "/Assets/instant_consultant.webp",
			alt: "Instant Consult",
			caption: "Instant Consult",
		},
		{
			href: "./HTML/login_pat.html",
			image: "/Assets/records.webp",
			alt: "My Records",
			caption: "My Records",
		},
		{
			href: "#home",
			image: "/Assets/Optical.avif",
			alt: "Optical Store",
			caption: "Optical Store",
		},
		{
			href: "#home",
			image: "/Assets/Offers.avif",
			alt: "Exclusive Offers",
			caption: "Exclusive Offers",
		},
	];

	return (
		<div>
			<section className="flex flex-col max-w-[100%] px-[5vw] py-[40px] mx-auto " id="services">
				<div className="flex justify-around gap-0 m-0">
					{services.map((service, index) => (
						<figure key={index} className="flex-1 text-center m-0">
							<a href={service.href} className="block">
								<img
									src={service.image}
									className="w-[100px] h-[100px] object-contain block mx-auto rounded-xl"
								/>
								<figcaption className="font-sans text-base mt-[15%]">
									{service.caption}
								</figcaption>
							</a>
						</figure>
					))}
				</div>
			</section>
		</div>
	);
}

export default Services_Grid;
