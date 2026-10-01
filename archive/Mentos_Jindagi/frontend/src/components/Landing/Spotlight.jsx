import React from "react";

function Spotlight() {
	const brands = [
		"/Assets/brand1.avif",
		"/Assets/brand2.avif",
		"/Assets/brand3.avif",
		"/Assets/brand4.avif",
		"/Assets/brand5.avif",
		"/Assets/brand6.avif",
		"/Assets/brand7.avif",
	];
	return (
		<div className="w-full ">
			{/* Title */}
			<div className="w-1/2 text-2xl font-sans text-left px-5 py-2.5 mt-12 ml-[7%]">
				<p>Brands In Spotlight</p>
			</div>

			{/* Brands Grid */}
			<section className="flex flex-col max-w-[90%] mx-auto gap-0">
				{/* First Row */}
				<div className="flex justify-around gap-0 m-0">
					{brands.map((brand, index) => (
						<figure key={index} className="flex-1 text-center m-0">
							<img
								src={brand}
								alt={`Brand ${index + 1}`}
								className="w-[100px] h-[100px] object-contain block mx-auto rounded-xl"
							/>
						</figure>
					))}
				</div>

				{/* Second Row */}
				<div className="flex justify-around gap-0 m-0 mt-4">
					{brands.map((brand, index) => (
						<figure key={`row2-${index}`} className="flex-1 text-center m-0">
							<img
								src={brand}
								alt={`Brand ${index + 1}`}
								className="w-[100px] h-[100px] object-contain block mx-auto rounded-xl"
							/>
						</figure>
					))}
				</div>
			</section>
		</div>
	);
}

export default Spotlight;
