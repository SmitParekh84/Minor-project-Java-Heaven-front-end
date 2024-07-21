import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const items = [
  { src: "https://www.starbucks.in/assets/icon/Bestseller.webp", alt: "Bestseller", label: "Bestseller" },
  { src: "https://www.starbucks.in/assets/icon/Drinks.webp", alt: "Drinks", label: "Drinks" },
  { src: "https://www.starbucks.in/assets/icon/Food.webp", alt: "Food", label: "Food" },
  { src: "https://www.starbucks.in/assets/icon/Merchandise.webp", alt: "Merchandise", label: "Merchandise" },
  { src: "https://www.starbucks.in/assets/icon/CoffeeAtHome.webp", alt: "Coffee At Home", label: "Coffee At Home" },
  { src: "https://www.starbucks.in/assets/icon/ReadyToEat.webp", alt: "Ready to Eat", label: "Ready to Eat" },
  { src: "https://www.starbucks.in/assets/icon/Bestseller.webp", alt: "Bestseller", label: "Bestseller" },
  { src: "https://placehold.co/100x100?text=Drinks", alt: "Drinks", label: "Drinks" },
  { src: "https://placehold.co/100x100?text=Food", alt: "Food", label: "Food" },
  { src: "https://placehold.co/100x100?text=Merchandise", alt: "Merchandise", label: "Merchandise" },
  { src: "https://placehold.co/100x100?text=Coffee+At+Home", alt: "Coffee At Home", label: "Coffee At Home" },
  { src: "https://placehold.co/100x100?text=Ready+to+Eat", alt: "Ready to Eat", label: "Ready to Eat" },

];

export default function TypeMenu() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  return (
    <div className="mx-auto max-w-7xl pt-8 sm:py-18 lg:pt-20">
      <h2 className="text-center text-2xl font-bold text-foreground mb-8">Handcrafted Curations</h2>
      <Slider {...settings} className="flex justify-center ">
        {items.map((item, index) => (
          <div key={index} className="text-center px-2">
            <img className="w-24 h-24 rounded-full mx-auto" src={item.src} alt={item.alt} />
            <p className="mt-2 text-sm text-foreground">{item.label}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}
