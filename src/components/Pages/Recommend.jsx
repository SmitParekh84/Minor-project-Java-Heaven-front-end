import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const items = [
  {
    title: "Cappuccino",
    description: "Coffee mixed with steamed milk and topped with foamed milk.",
    price: "₹ 240.00",
    imageUrl: "https://cafefabrique.com/cdn/shop/articles/Cappuccino.jpg",
    _id: "66fbfdccef33cf658aa610fa",
  },
  {
    title: "Espresso",
    description: "A strong coffee brewed by forcing hot water through finely-ground coffee beans.",
    price: "₹ 399.00",
    imageUrl: "https://img.freepik.com/free-psd/delicious-coffee-cup-isolated_23-2151806481.jpg",
    _id: "66fbfdccef33cf658aa610f9",
  },
  {
    title: "Vanilla Latte",
    description: "A delicious blend of espresso and steamed milk, topped with vanilla.",
    price: "₹ 599.00",
    imageUrl: "https://img.freepik.com/free-psd/close-up-coffee-cup_23-2151806475.jpg",
    _id: "66fbfe516180509ebce8f488",
  },
];

export default function Widget() {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const handleAddItem = (item) => {
    console.log("Navigating to item:", item);
    navigate(`/item/${item._id}`);
  };

  return (
    <div className="mx-auto max-w-7xl pt-20 sm:py-14 lg:py-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">Barista Recommends</h2>
        <a href="/menu" className="text-secondary hover:underline">View Menu</a>
      </div>
      <Slider {...settings} className="flex">
        {items.map((item) => (
          <div key={item._id} className="px-2">
            <div className="bg-white rounded-lg shadow-md flex flex-col p-4 relative min-w-7 md:min-w-8">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-32 object-cover mb-4 mx-auto"
              />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-[var(--foreground)] font-semibold">{item.title}</h3>
                <p className="text-[var(--muted-foreground)] text-sm">{item.description}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[var(--foreground)] font-semibold">{item.price}</span>
                <button
                  className="bg-secondary text-primary-foreground px-4 py-2 rounded-lg shadow hover:bg-secondary"
                  onClick={() => handleAddItem(item)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
