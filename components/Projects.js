import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { allProjects } from '../components/projectData';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [showOriginalImage, setShowOriginalImage] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };



  const filteredProjects = allProjects.filter(project =>
    filter === 'All' ? true : project.category === filter
  );

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="bg-gray-900 py-16 px-4 text-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          {['All', 'AI', 'Web', 'Automation'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300
                ${filter === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((p, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 flex flex-col border border-gray-700"
            >
              <div className="relative h-48 w-full mb-4 rounded-md overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                  style={{ opacity: 0.3 }}
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{p.title}</h3>
              <p className="text-gray-400 text-md flex-grow">{p.desc}</p>
              <p className="text-blue-400 text-sm mt-4">{p.tech}</p>
              <button
                onClick={() => openModal(p)}
                className="mt-6 self-start text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center"
              >
                🔗 자세히 보기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Detail Modal */}
        {isModalOpen && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl leading-none"
              >
                &times;
              </button>
              {selectedProject.image && (
                <>
                  <div
                    className="relative h-60 w-full mb-6 rounded-md overflow-hidden group cursor-pointer"
                    onClick={() => setShowOriginalImage(true)}
                  >
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover filter grayscale transition-opacity duration-300 group-hover:opacity-30"
                      style={{ opacity: 1 }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity duration-300 text-white text-lg font-bold pointer-events-none select-none">
                      원본 이미지 보기
                    </span>
                  </div>
                  {showOriginalImage && (
                    <div
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                      onClick={() => setShowOriginalImage(false)}
                    >
                      <div className="relative max-w-3xl w-full">
                        <button
                          className="absolute top-3 right-3 text-white text-3xl z-10"
                          onClick={e => {
                            e.stopPropagation();
                            setShowOriginalImage(false);
                          }}
                        >
                          &times;
                        </button>
                        <div className="rounded-lg overflow-hidden">
                          <Image
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            fill
                            className="object-contain bg-black"
                            style={{ opacity: 1, filter: 'none' }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <h3 className="text-3xl font-bold text-white mb-3">{selectedProject.title}</h3>
              <p className="text-blue-400 text-lg mb-4">{selectedProject.tech}</p>
              <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                {selectedProject.longDesc}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}