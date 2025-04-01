import { useState, useEffect, useRef } from "react";
import { portfolioItems, portfolioCategories, type PortfolioCategory } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X, ArrowRight, ExternalLink, Share2 } from "lucide-react";

interface PortfolioItemModalProps {
  item: typeof portfolioItems[0] | null;
  isOpen: boolean;
  onClose: () => void;
}

function PortfolioItemModal({ item, isOpen, onClose }: PortfolioItemModalProps) {
  if (!item) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden bg-white dark:bg-gray-900">
        <DialogClose className="absolute right-4 top-4 z-10 rounded-full p-2 bg-black/10 hover:bg-black/20 text-white">
          <X className="h-4 w-4" />
        </DialogClose>
        
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-[300px] md:h-full">
            <img 
              src={item.image} 
              alt={item.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-poppins font-bold">{item.title}</DialogTitle>
              <DialogDescription>
                <div className="flex flex-wrap gap-2 my-2">
                  {item.categories.split(', ').map((cat, index) => (
                    <Badge key={index} variant="secondary" className="bg-[#FF3366]/10 text-[#FF3366] hover:bg-[#FF3366]/20 transition-colors">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4 space-y-4 text-gray-700 dark:text-gray-300">
              <p>This project for {item.title.split(' ')[0]} demonstrates our ability to create compelling visual assets that align with the brand's market positioning and target audience preferences.</p>
              
              <p>The design process involved extensive research into industry trends and competitor analysis to ensure a unique and standout result.</p>
              
              <h4 className="text-lg font-semibold mt-6 mb-2">Project Details</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-[#FF3366] mr-2"><ArrowRight className="h-5 w-5" /></span>
                  <span>Client: {item.title.split(' ')[0]} {item.title.split(' ')[1]}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF3366] mr-2"><ArrowRight className="h-5 w-5" /></span>
                  <span>Duration: 3 weeks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF3366] mr-2"><ArrowRight className="h-5 w-5" /></span>
                  <span>Services: {item.categories}</span>
                </li>
              </ul>
              
              <div className="flex justify-between items-center pt-6 mt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button className="bg-[#FF3366] hover:bg-opacity-90 text-white flex items-center gap-2">
                  View Full Case Study
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("all");
  const [filteredItems, setFilteredItems] = useState(portfolioItems);
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const masonryRef = useRef<HTMLDivElement>(null);

  const filterItems = (category: PortfolioCategory) => {
    setActiveCategory(category);
    if (category === "all") {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === category));
    }
  };

  const openItemModal = (item: typeof portfolioItems[0]) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeItemModal = () => {
    setIsModalOpen(false);
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50 }
    },
  };

  return (
    <section id="portfolio" className="py-16 md:py-24 px-6 bg-white dark:bg-gray-900 transition-colors duration-300">
      <motion.div 
        className="container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.span className="inline-block text-[#FF3366] font-medium mb-2 px-3 py-1 bg-[#FF3366]/10 rounded-full text-sm">
            Our Work
          </motion.span>
          <motion.h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">
            Our Creative Portfolio
          </motion.h2>
          <motion.p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            Explore our diverse range of work, each project crafted with precision and passion.
          </motion.p>
        </motion.div>

        {/* Portfolio filter buttons */}
        <motion.div 
          className="flex flex-wrap justify-center mb-8 gap-3"
          variants={itemVariants}
        >
          {portfolioCategories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Button
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
            </motion.div>
          ))}
        </motion.div>

        {/* Masonry grid for portfolio items */}
        <motion.div 
          ref={masonryRef} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{
            gridAutoRows: "10px",
          }}
          variants={containerVariants}
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                className="overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800 cursor-pointer group"
                style={{
                  gridRowEnd: `span ${item.rowSpan}`,
                }}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                onClick={() => openItemModal(item)}
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-2 border-2 border-white rounded-lg backdrop-blur-sm">
                      View Project
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-poppins font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.categories}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Project Details Modal */}
        <PortfolioItemModal 
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={closeItemModal}
        />
      </motion.div>
    </section>
  );
}
