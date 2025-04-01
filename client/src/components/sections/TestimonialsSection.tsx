import { useState, useEffect, useRef } from "react";
import { testimonials } from "@/data/testimonialsData";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { QuoteIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1023px)");

  const getVisibleItems = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === testimonials.length - getVisibleItems() ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? testimonials.length - getVisibleItems() : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (carouselRef.current) {
      const visibleItems = getVisibleItems();
      const itemWidth = 100 / visibleItems;
      carouselRef.current.style.transform = `translateX(-${currentSlide * itemWidth}%)`;
    }
  }, [currentSlide, isMobile, isTablet]);

  return (
    <section id="testimonials" className="py-16 md:py-24 px-6 bg-accent bg-opacity-5 dark:bg-gray-800">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">Client Testimonials</h2>
          <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / getVisibleItems())}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className={`min-w-full md:min-w-[50%] lg:min-w-[33.333%] px-4`}
                >
                  <Card className="bg-white dark:bg-gray-900 h-full">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <QuoteIcon className="h-6 w-6 text-[#FF3366]" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                        {testimonial.quote}
                      </p>
                      <div className="flex items-center">
                        <div className="mr-4">
                          <Avatar>
                            <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                            <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <h4 className="font-poppins font-semibold">{testimonial.author}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: testimonials.length - getVisibleItems() + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full focus:outline-none ${
                  currentSlide === index 
                    ? "bg-[#FF3366]" 
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Carousel Controls */}
          <Button
            variant="outline" 
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-md z-10 p-2 h-10 w-10"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-md z-10 p-2 h-10 w-10"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
