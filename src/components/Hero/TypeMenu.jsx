import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config"; // Ensure this path is correct and the config file exports API_URL

const TypeMenu = () => {
  const [categoryImages, setCategoryImages] = useState([]); // State to hold category images
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}/api/items`); // Fetch items from the endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();

        // Group items by category and find the oldest item in each category
        const categoryMap = data.reduce((acc, item) => {
          const category = item.category;
          // If category doesn't exist, initialize it
          if (!acc[category]) {
            acc[category] = { ...item };
          } else {
            // If this item is older, replace it
            if (new Date(item.createdAt) < new Date(acc[category].createdAt)) {
              acc[category] = { ...item };
            }
          }
          return acc;
        }, {});

        // Convert the categoryMap to an array of categories with their oldest images
        const categoriesWithImages = Object.keys(categoryMap).map(category => ({
          category,
          imageUrl: categoryMap[category].imageUrl,
        }));

        setCategoryImages(categoriesWithImages); // Update state with fetched categories and their oldest item images
      } catch (error) {
        console.error(error.message); // Handle errors
      }
    };

    fetchItems(); // Fetch items on component mount
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/menu/${category}`); // Redirect to the menu page with the selected category
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,


    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,

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
          slidesToScroll: 2,
        }
      }
    ]
  };

  return (
    <div className="mx-auto max-w-7xl pt-8 sm:py-18 lg:pt-20">
      <h2 className="text-left text-2xl font-bold text-foreground mb-8">Handcrafted Curations</h2>
      <Slider {...settings} className="flex justify-center">
        {categoryImages.map((item, index) => (
          <div key={index} className="text-center px-2" onClick={() => handleCategoryClick(item.category)}>
            <img
              className="lg:w-24 w-14 max-w-24 max-h-24 rounded-full mx-auto cursor-pointer"
              src={item.imageUrl} // Use the oldest item's image URL
              alt={item.category}
              loading="lazy" // Lazy loading for better performance
            />
            <p className="mt-2 text-sm text-foreground">{item.category}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TypeMenu;
