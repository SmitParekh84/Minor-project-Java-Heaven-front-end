import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const items = [
  {
    title: "Cappuccino",
    description: "SHORT(0).",
    price: "₹ 283.50",
    imageUrl: "https://placehold.co/100x100",
  },
  {
    title: "Signature Hot Chocolate",
    description: "SHORT(237 ML), 284 kcal",
    price: "₹ 294.00",
    imageUrl: "https://placehold.co/100x100",
  },
  {
    title: "Vanilla Milkshake",
    description: "TALL(354 ML), PER SERVE (354ml) - 531 Kcal",
    price: "₹ 367.50",
    imageUrl: "https://placehold.co/100x100",
  }
  // Add more items here
];

export default function Widget() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768, // Small devices (tablets)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Medium devices (desktops)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="bg-[var(--background)] p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">Barista Recommends</h2>
        <a href="#" className="text-[var(--primary)] hover:underline">View Menu</a>
      </div>
      <Slider {...settings} className="bg-primary flex space-x-4">
        {items.map((item, index) => (
          <div key={index} className="bg-[var(--card)] rounded-lg shadow-md flex flex-col p-4 relative min-w-[240px] md:min-w-[300px] mx-auto">
            <img src={item.imageUrl} alt={item.title} className="w-16 h-16 mb-4 mx-auto" />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-[var(--foreground)] font-semibold">{item.title}</h3>
              <p className="text-[var(--muted-foreground)] text-sm">{item.description}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-[var(--foreground)] font-semibold">{item.price}</span>
              <button className="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-lg shadow hover:bg-[var(--primary)]/80">Add Item</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
