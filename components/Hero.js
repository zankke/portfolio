import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center p-4 dark:bg-gray-800">
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Picture Placeholder */}
        <motion.div
          variants={itemVariants}
          className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mx-auto mb-6 border-4 border-blue-500 shadow-lg"
        >
          <Image
            src="/images/profile.png"
            alt="Profile Picture of 이상훈"
            fill // Use fill prop instead of layout="fill"
            className="object-cover" // Use Tailwind class instead of objectFit="cover"
            priority={true}
          />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          이상훈
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mt-2 text-xl md:text-2xl text-blue-300 font-medium"
        >
          Full Stack AI Developer | AI Platform Director
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-300 leading-relaxed"
        >
          AI 기술로 비즈니스 자동화를 설계하고, 데이터 기반 서비스를 구현합니다.
          DATA와 AI기술을 잘 활용하고 싶은 회사들에 컨설팅을 합니다. Marketing과 Commerce에 적용되는 여러 AI 서비스들을 만들고 있습니다.
          AI기술과 비즈니스의 교차점에서 가치를 창출하는 데 열정적입니다.
        </motion.p>

        <motion.a
          variants={itemVariants}
          href="#projects"
          className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          View My Projects
        </motion.a>
      </motion.div>
    </section>
  );
}
