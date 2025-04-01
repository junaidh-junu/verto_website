import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section id="home" className="pt-28 md:pt-32 px-6 pb-16 md:pb-24">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold leading-tight mb-6">
              Crafting <span className="text-[#FF3366]">Pixels</span> into
              Digital Masterpieces
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300">
              We are a creative design agency specializing in corporate
              branding, print design, and digital experiences that capture your
              brand's essence.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                asChild
                className="bg-[#FF3366] hover:bg-opacity-90 text-white px-8 py-3 h-auto"
              >
                <a href="#portfolio">View Our Work</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-primary dark:border-white hover:border-[#FF3366] hover:text-[#FF3366] dark:hover:border-[#FF3366] px-8 py-3 h-auto"
              >
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <img
              src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Design studio workspace"
              className="rounded-lg shadow-xl object-cover w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-[#FF3366] text-white p-4 rounded-lg shadow-lg hidden md:block">
              <p className="font-bold">10+ Years</p>
              <p>Creative Excellence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
