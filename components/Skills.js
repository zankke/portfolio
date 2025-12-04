import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  PythonOriginalIcon, DjangoOriginalIcon, ReactOriginalIcon, DockerOriginalIcon, MysqlOriginalIcon,
  PostgresqlOriginalIcon, PytorchOriginalIcon, AmazonwebservicesOriginalIcon, GooglecloudOriginalIcon,
  NginxOriginalIcon, Html5OriginalIcon, Css3OriginalIcon, JavascriptOriginalIcon, FigmaOriginalIcon,
  KubernetesOriginalIcon, NodejsOriginalIcon, PhpOriginalIcon, VuejsOriginalIcon, OracleOriginalIcon,
  MongodbOriginalIcon,  // Using this for other DBs if needed
  GithubbadgeOriginalIcon, // Generic for various, e.g., KoBERT, GPT-4, Claude API, OpenAI API
  GitOriginalIcon, // For general development tools
  JenkinsOriginalIcon, // For Automation & Report tools
} from '@devicon/react';

// Helper to get icon component by name (case-insensitive and flexible)
const getIconComponent = (iconName) => {
  switch (iconName.toLowerCase()) {
    case 'python': return PythonOriginalIcon;
    case 'django': return DjangoOriginalIcon;
    case 'react': return ReactOriginalIcon;
    case 'vue.js': return VuejsOriginalIcon;
    case 'html5': return Html5OriginalIcon;
    case 'node.js': return NodejsOriginalIcon;
    case 'php': return PhpOriginalIcon;
    case 'mysql': return MysqlOriginalIcon;
    case 'mariadb': return MysqlOriginalIcon; // Using MySQL icon as placeholder
    case 'sqlite': return MysqlOriginalIcon; // Using MySQL icon as placeholder
    case 'nginx': return NginxOriginalIcon;
    case 'centos': return GithubbadgeOriginalIcon; // Placeholder for CentOS
    case 'docker': return DockerOriginalIcon;
    case 'loadbalancer': return NginxOriginalIcon; // Using Nginx as placeholder for LoadBalancer
    case 'kobert': return GithubbadgeOriginalIcon; // Placeholder for KoBERT
    case 'gpt-4': return GithubbadgeOriginalIcon; // Placeholder for GPT-4
    case 'claude api': return GithubbadgeOriginalIcon; // Placeholder for Claude API
    case 'tensorflow': return PytorchOriginalIcon; // Using Pytorch as placeholder
    case 'aws': return AmazonwebservicesOriginalIcon;
    case 'google cloud': return GooglecloudOriginalIcon;
    case 'google sheets api': return JenkinsOriginalIcon; // Placeholder for Google Sheets API
    case 'n8n': return JenkinsOriginalIcon;
    case 'openapi': return GitOriginalIcon; // Placeholder for OpenAPI
    case 'fastapi': return PythonOriginalIcon; // FastAPI is Python based
    case 'javascript': return JavascriptOriginalIcon;
    case 'css': return Css3OriginalIcon;
    case 'kubernetes': return KubernetesOriginalIcon;
    case 'figma': return FigmaOriginalIcon;
    case 'streamlit': return PythonOriginalIcon; // Streamlit is Python based
    case 'ollama': return GithubbadgeOriginalIcon;
    case 'hugging face': return GithubbadgeOriginalIcon;
    case 'replicate api': return GithubbadgeOriginalIcon;
    case 'ncp': return GooglecloudOriginalIcon; // Using GCP as a placeholder for NCP
    case 'vercel': return NodejsOriginalIcon; // Vercel is JS ecosystem
    case 'airflow': return JenkinsOriginalIcon;
    case 'celery': return JenkinsOriginalIcon;
    case 'api integration': return GitOriginalIcon;
    case 'iis': return GitOriginalIcon; // Generic placeholder
    case '.net framework': return GitOriginalIcon; // Generic placeholder
    case 'dmp': return GitOriginalIcon; // Generic placeholder
    default: return null;
  }
};

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const categorizedSkills = {
    Frontend: [
      { name: "Vue.js", icon: "vue.js" },
      { name: "React", icon: "react" },
      { name: "HTML5", icon: "html5" }
    ],
    Backend: [
      { name: "Node.js", icon: "node.js" },
      { name: "Python (FastAPI)", icon: "fastapi" },
      { name: "PHP 7.4", icon: "php" },
      { name: "MySQL", icon: "mysql" },
      { name: "MariaDB", icon: "mariadb" },
      { name: "SQLite", icon: "sqlite" }
    ],
    "AI/ML Tools": [
      { name: "KoBERT", icon: "kobert" },
      { name: "GPT-4", icon: "gpt-4" },
      { name: "Claude API", icon: "claude api" },
      { name: "TensorFlow", icon: "tensorflow" }
    ],
    "Infra/DevOps": [
      { name: "Nginx", icon: "nginx" },
      { name: "CentOS", icon: "centos" },
      { name: "Docker", icon: "docker" },
      { name: "LoadBalancer", icon: "loadbalancer" },
      { name: "AWS", icon: "aws" },
      { name: "Google Cloud", icon: "google cloud" }
    ],
    "Automation & Report": [
      { name: "Google Sheets API", icon: "google sheets api" },
      { name: "n8n", icon: "n8n" },
      { name: "OpenAPI", icon: "openapi" }
    ],
  };

  return (
    <section id="skills" className="bg-gray-900 py-16 px-4 text-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </motion.h2>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {Object.entries(categorizedSkills).map(([category, skills]) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="relative bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-gray-700"
            >
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => {
                  const IconComponent = getIconComponent(skill.icon);
                  return (
                    <span
                      key={skill.name}
                      className="bg-gray-700 text-gray-200 px-4 py-2 rounded-full text-md font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center"
                    >
                      {IconComponent && <IconComponent size={20} className="mr-2" />}
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

