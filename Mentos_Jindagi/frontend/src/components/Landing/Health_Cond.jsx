import React from "react";

function Health_Cond() {
	const conditions = [
		{ image: "/Assets/Cold.avif", caption: "Cold" },
		{ image: "/Assets/Skin_Rash.avif", caption: "Skin Rash" },
		{ image: "/Assets/Sore_Throat.avif", caption: "Sore Throat" },
		{ image: "/Assets/Joint_Pain.avif", caption: "Joint Pain" },
		{ image: "/Assets/Chest_Pain.avif", caption: "Chest Pain" },
		{ image: "/Assets/Fatigue.avif", caption: "Fatigue" },
		{ image: "/Assets/Headache.avif", caption: "Headache" },
	];
	return (
		<div className="w-full pb-12">
			{/* Title */}
			<div className="w-1/2 text-2xl font-sans text-left px-5 py-6 mt-12 ml-[7%]">
				<p>We Got You Through This</p>
			</div>

			{/* Conditions Grid */}
			<section className="flex flex-col max-w-[90%] mx-auto gap-0">
				<div className="flex justify-around gap-0 m-0">
					{conditions.map((condition, index) => (
						<figure key={index} className="flex-1 text-center m-0">
							<img
								src={condition.image}
								alt={condition.caption}
								className="w-[100px] h-[100px] object-contain block mx-auto rounded-xl"
							/>
							<figcaption className="font-sans text-base mt-[15%]">
								{condition.caption}
							</figcaption>
						</figure>
					))}
				</div>
			</section>
		</div>
	);
}

export default Health_Cond;
