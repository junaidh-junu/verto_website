import { useState, useEffect, useRef } from "react";
import { portfolioItems, portfolioCategories, type PortfolioCategory } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("all");
  const [filteredItems, setFilteredItems] = useState(portfolioItems);
  const masonryRef = useRef<HTMLDivElement>(null);

  const filterItems = (category: PortfolioCategory) => {
    setActiveCategory(category);
    if (category === "all") {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === category));
    }
  };

  useEffect(() => {
    // Handle masonry layout
    const handleResize = () => {
      if (masonryRef.current) {
        masonryRef.current.style.display = "grid";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [filteredItems]);

  return (
    <section id="portfolio" className="py-16 md:py-24 px-6 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">Our Portfolio</h2>
          <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            Explore our diverse range of work, each project crafted with precision and passion.
          </p>
        </div>

        {/* Portfolio filter buttons */}
        <div className="flex flex-wrap justify-center mb-8 gap-3">
          {portfolioCategories.map((category) => (
            <Button
              key={category.id}
              onClick={() => filterItems(category.id as PortfolioCategory)}
              variant={activeCategory === category.id ? "default" : "secondary"}
              className={`px-6 py-2 rounded-full ${
                activeCategory === category.id 
                  ? "bg-[#FF3366] text-white" 
                  : "bg-gray-200 dark:bg-gray-800 hover:bg-[#FF3366] hover:text-white transition-colors"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Masonry grid for portfolio items */}
        <div 
          ref={masonryRef} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{
            gridAutoRows: "10px",
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800 transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-lg"
              style={{
                gridRowEnd: `span ${item.rowSpan}`,
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="font-poppins font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.categories}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
