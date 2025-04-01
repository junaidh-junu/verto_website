import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 50, delay: 0.5 }
    },
  };

  const badgeVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, delay: 1 }
    },
  };

  return (
    <section id="home" className="pt-28 md:pt-32 px-6 pb-20 md:pb-32 overflow-hidden bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/30">
      <div className="container mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="md:w-1/2 mb-10 md:mb-0" variants={itemVariants}>
            <motion.h1 
              className="text-5xl md:text-7xl font-poppins font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FF3366] to-[#FF8080]"
              variants={itemVariants}
            >
              Crafting <span className="text-[#FF3366]">Pixels</span> into
              Digital Masterpieces
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300"
              variants={itemVariants}
            >
              We are a creative design agency specializing in corporate
              branding, print design, and digital experiences that capture your
              brand's essence.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  className="bg-[#FF3366] hover:bg-opacity-90 text-white px-8 py-3 h-auto relative overflow-hidden group"
                >
                  <a href="#portfolio">
                    <span className="relative z-10">View Our Work</span>
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  </a>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-primary dark:border-white hover:border-[#FF3366] hover:text-[#FF3366] dark:hover:border-[#FF3366] px-8 py-3 h-auto"
                >
                  <a href="#contact">Get in Touch</a>
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Stats Badges */}
            <motion.div 
              className="flex flex-wrap gap-4 mt-8"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md flex items-center space-x-2"
                whileHover={{ y: -5 }}
              >
                <span className="text-[#FF3366] font-bold text-lg">100+</span>
                <span className="text-gray-700 dark:text-gray-300 text-sm">Happy Clients</span>
              </motion.div>
              <motion.div 
                className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md flex items-center space-x-2"
                whileHover={{ y: -5 }}
              >
                <span className="text-[#FF3366] font-bold text-lg">250+</span>
                <span className="text-gray-700 dark:text-gray-300 text-sm">Projects Completed</span>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative"
            variants={imageVariants}
            animate="visible"
            initial="hidden"
            whileInView={{
              y: [-5, 5, -5],
              transition: {
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
              }
            }}
          >
            <motion.div 
              className="absolute -top-5 -right-5 w-40 h-40 bg-[#FF3366]/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
                transition: { duration: 8, repeat: Infinity }
              }}
            />
            <motion.img
              src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Design studio workspace"
              className="rounded-2xl shadow-2xl object-cover w-full h-auto z-10 relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-[#FF3366] text-white p-5 rounded-lg shadow-xl hidden md:block backdrop-blur-sm bg-opacity-95"
              variants={badgeVariants}
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <p className="font-bold text-xl">10+ Years</p>
              <p className="text-white/90">Creative Excellence</p>
            </motion.div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3],
                transition: { duration: 7, repeat: Infinity, delay: 1 }
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
