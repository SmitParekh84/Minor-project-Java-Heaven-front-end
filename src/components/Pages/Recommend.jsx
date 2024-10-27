import { useEffect, useState } from "react"; // Import useEffect and useState
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import { API_URL } from '../../config'; // Import your API URL



export default function Widget() {
  const [items, setItems] = useState([]); // State to store fetched items
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/items`);
        const bestsellers = response.data.filter(item => item.isBestseller); // Filter for bestsellers
        setItems(bestsellers); // Set state with the bestsellers
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems(); // Call the fetch function
  }, []); // Empty dependency array to run on mount


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,



        },
      },
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleAddItem = (item) => {
    console.log("Navigating to item:", item);
    navigate(`/item/${item._id}`);
  };

  return (
    <div className="mx-auto max-w-7xl pt-0 sm:py-14 lg:py-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">Barista Recommends</h2>
        <a href="/menu" className="text-secondary z-10 hover:underline">View Menu</a>
      </div>
      <Slider {...settings} className="flex">
        {items.map((item) => (
          <div key={item._id} className="px-2">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col p-5 relative min-w-[180px] md:min-w-[220px]">
              <img
                src={item.imageUrl}
                alt={item.name} // Change title to name for consistency
                className="w-full h-40 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-105"
              />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-[var(--foreground)] font-semibold text-lg">{item.name}</h3> {/* Updated to item.name */}
                <p className="text-[var(--muted-foreground)] text-sm mt-1">
                  {item.description.length > 80
                    ? `${item.description.slice(0, 80)}...`
                    : item.description}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[var(--foreground)] font-bold text-lg">₹ {item.price}</span> {/* Added ₹ symbol */}
                <button
                  className="bg-secondary text-primary-foreground px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:bg-secondary-dark transition-colors duration-200"
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
