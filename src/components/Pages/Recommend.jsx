import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const items = [
  {
    title: "Cappuccino",
    description: "Coffee mixed with steamed milk and topped with foamed milk.",
    price: "₹ 240.00",
    imageUrl: "https://img.freepik.com/free-psd/close-up-coffee-cup_23-2151806475.jpg?t=st=1727901716~exp=1727905316~hmac=61df07149cfa106c42a113cb81f21c706e61293628f76e57b36cc40fb72b4ca2&w=740",
  },
  {
    title: "Espresso",
    description: "A strong coffee brewed by forcing hot water through finely-ground coffee beans.",
    price: "₹ 399.00",
    imageUrl: "https://img.freepik.com/free-psd/delicious-coffee-cup-isolated_23-2151806481.jpg?t=st=1727901498~exp=1727905098~hmac=2f35f8083e7d1f35575b81f67512d156696c14c4ecdcf8a61d1831e92b41fe1c&w=740",
  },
  {
    title: "Vanilla Latte",
    description: "A delicious blend of espresso and steamed milk, topped with vanilla.",
    price: "₹ 599.00",
    imageUrl: "https://img.freepik.com/free-psd/close-up-coffee-cup_23-2151806475.jpg?t=st=1727901716~exp=1727905316~hmac=61df07149cfa106c42a113cb81f21c706e61293628f76e57b36cc40fb72b4ca2&w=740",
  }
  // Add more items here
];

export default function Widget() {
  const settings = {
    dots: true,
    infinite: true,

    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,


    autoplay: true,
    autoplaySpeed: 3000,
    slide: 'div',
    cssEase: 'linear',



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
    <div className="mx-auto max-w-7xl pt-20 sm:py-14 lg:py-20 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">Barista Recommends</h2>
        <a href="/menu" className="text-secondary hover:underline">View Menu</a>
      </div>
      <Slider {...settings} className="flex">
        {items.map((item, index) => (
          <div key={index} className="px-2"> {/* Added padding for spacing */}
            <div className="bg-muted-foreground rounded-lg shadow-md flex flex-col p-4 relative min-w-7 md:min-w-8">
              <img src={item.imageUrl} alt={item.title} className="w-16 h-16 mb-4 mx-auto" />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-[var(--foreground)] font-semibold">{item.title}</h3>
                <p className="text-[var(--muted-foreground)] text-sm">{item.description}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[var(--foreground)] font-semibold">{item.price}</span>
                <button className="bg-secondary text-primary-foreground px-4 py-2 rounded-lg shadow hover:bg-secondary">Add Item</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
