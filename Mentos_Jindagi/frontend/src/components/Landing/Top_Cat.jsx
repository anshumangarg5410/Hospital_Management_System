import React from 'react'

function Top_Cat() {
    const categories = [
    { image: "/Assets/top_deals.avif", caption: "Top Deals" },
    { image: "/Assets/Back_to_Routine.avif", caption: "Back to Routine" },
    { image: "/Assets/Beauty.avif", caption: "Beauty" },
    { image: "/Assets/mom_and_baby.avif", caption: "Mom & Baby" },
    { image: "/Assets/Nutrition_web.avif", caption: "Nutrition" },
    { image: "/Assets/Medical_Essentials.avif", caption: "Medical Essentials" },
    { image: "/Assets/Most_Clicked.avif", caption: "Most Clicked" }
  ];

  return (
 <div className="w-full ">
      {/* Title */}
      <div className="w-1/2 text-2xl font-sans text-left px-5 py-6 mt-12 ml-[7%]">
        <p>Top Categories</p>
      </div>

      {/* Categories Grid */}
      <section className="flex flex-col max-w-[90%] mx-auto gap-0">
        <div className="flex justify-around gap-0 m-0">
          {categories.map((category, index) => (
            <figure key={index} className="flex-1 text-center m-0">
              <img 
                src={category.image} 
                alt={category.caption}
                className="w-[100px] h-[100px] object-contain block mx-auto rounded-xl"
              />
              <figcaption className="font-sans text-base mt-[15%]">
                {category.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Top_Cat
