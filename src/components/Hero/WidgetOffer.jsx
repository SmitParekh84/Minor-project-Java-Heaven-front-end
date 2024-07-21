import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const offers = [
  {
    title: "Starbucks Rewards",
    description: "Collect Stars Any Way You Pay. Rewards got a makeover—no surprises, just perks!",
    imageUrl: "https://static.vecteezy.com/system/resources/previews/029/283/030/original/coffee-coffee-cup-coffee-cup-coffee-cup-clipart-restaurant-coffee-cup-transparent-background-ai-generative-free-png.png",
  },
  {
    title: "Dunkin' Donuts Offer",
    description: "Get a free donut with any beverage purchase every Wednesday.",
    imageUrl: "https://static.vecteezy.com/system/resources/previews/029/283/030/original/coffee-coffee-cup-coffee-cup-coffee-cup-clipart-restaurant-coffee-cup-transparent-background-ai-generative-free-png.png",
  },
  {
    title: "Tim Hortons Deal",
    description: "Buy one, get one free on select beverages.",
    imageUrl: "https://static.vecteezy.com/system/resources/previews/029/283/030/original/coffee-coffee-cup-coffee-cup-coffee-cup-clipart-restaurant-coffee-cup-transparent-background-ai-generative-free-png.png",
  },
  // Add more offers here
];

export default function WidgetOffer() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="mx-auto max-w-7xl pt-32 sm:py-18 lg:pt-28">
      
      <Slider {...settings} className="flex  justify-center ">
        {offers.map((offer, index) => (
          <div key={index} className="flex flex-col items-center bg-secondary py-16 px-6  rounded-lg shadow-lg ">
            <div className="flex items-center justify-between w-full ">
              <div className="flex flex-col md:flex-row items-center md:justify-start w-full">
                <img
                  src={offer.imageUrl}
                  alt={offer.title}
                  className="w-auto h-32 rounded-lg object-cover mb-4 md:mb-0 md:mr-4"
                />
                <div className="text-center md:text-left">
                  <h2 className="text-muted-foreground text-sm">New Updates</h2>
                  <h1 className="text-primary text-xl font-bold">{offer.title}</h1>
                  <p className="text-muted-foreground">
                    {offer.description}
                  </p>
                  <div className='flex'>
                    <button className="bg-primary-foreground text-secondary py-2 px-4 my-2 rounded-full flex items-center shadow-md transition-transform duration-300 ease-in-out hover:scale-105">
                      <span>Know more</span>
                      <ion-icon name="arrow-forward-outline"></ion-icon>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
