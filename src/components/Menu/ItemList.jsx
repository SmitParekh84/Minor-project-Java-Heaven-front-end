// ItemList.jsx
import React from "react"
import ItemCard from "./ItemCard"
import items from "./data" // Import the data
import FilterBar from "./FilterBar"

const ItemList = () => {
  return (
    <>
       <div className="container mx-auto max-w-7xl pt-20  sm:py-18 lg:pt-16">
             {/* Filter Bar */}
       
      <div className="relative isolate px-8 lg:px-8 py-16 bg-primary-foreground font-spartan">
      
        
      <FilterBar />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemList
