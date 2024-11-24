export const ROLES = ['User', 'Client', 'Admin'];
export const DOCTYPE = ['DNI'];
export const PROFESSIONS = ['Backend', 'Frontend', 'Fullstack', 'Tester QA', 'Devops', 'User Interface', 'User Experience', 'Data Analytics', 'Data Science'];
export const LANGUAJES = ['JavaScript', 'Python', 'Go', 'Ruby', 'Java', 'CSharp', 'PHP', 'Rust', 'Kotlin', "No Code"]
export const LINKSAPPS = [
  // Repositorios de código y control de versiones
  'GitHub',      // Plataforma de repositorios de código
  'GitLab',      // Alternativa a GitHub para repositorios y CI/CD
  'Bitbucket',   // Plataforma de repositorios de código de Atlassian

  // Manejadores de paquetes
  'Npm',         // Manejador de paquetes para JavaScript
  'Yarn',        // Alternativa a Npm para gestión de paquetes en JavaScript
  'Pip',         // Manejador de paquetes para Python
  'Composer',    // Manejador de paquetes para PHP
  'Maven',       // Manejador de paquetes para Java
  'NuGet',       // Manejador de paquetes para C#
  'Cargo',       // Manejador de paquetes para Rust
  'Gradle',      // Herramienta de automatización de proyectos y manejo de dependencias para Java

  // Herramientas de diseño y colaboración
  'Figma',       // Herramienta de diseño colaborativo
  'Dribbble',    // Portfolio de diseño y comunidad creativa
  'Behance',     // Plataforma para mostrar trabajos creativos

  // Comunidades y recursos de desarrollo
  'StackOverflow', // Comunidad de preguntas y respuestas técnicas
  'Reddit',        // Subreddits relacionados con desarrollo o IT
  'Dev.to',        // Publicación de artículos técnicos y comunidad de desarrolladores
  'Medium',        // Blog personal y plataforma de artículos

  // Entornos de desarrollo y demostraciones
  'CodePen',       // Entorno de desarrollo frontend para compartir código
  'Frontend Mentor', // Retos de diseño frontend para mejorar habilidades

  // Herramientas de gestión de proyectos
  'Trello',        // Gestión de proyectos visual
  'Jira',          // Gestión de proyectos y seguimiento de errores
  'Asana',         // Herramienta de gestión de tareas y proyectos

  // Comunicación en equipo
  'Slack',         // Plataforma de comunicación en equipo
  'Discord',       // Comunidades IT y comunicación en tiempo real

  // Despliegue y servicios en la nube
  'Heroku',        // Despliegue de aplicaciones web
  'Netlify',       // Despliegue de sitios estáticos
  'Vercel',        // Despliegue y alojamiento de aplicaciones frontend
  'AWS',           // Servicios en la nube de Amazon
  'Azure',         // Servicios en la nube de Microsoft
  'GCP',           // Google Cloud Platform
  'DigitalOcean',  // Infraestructura en la nube

  // Docker y contenedores
  'DockerHub',     // Repositorio de contenedores Docker

  // Otras plataformas de colaboración y aprendizaje
  'Kaggle',        // Competencias y datasets de ciencia de datos
  'StackExchange', // Variaciones de StackOverflow para diferentes temas técnicos
  'Twitter',       // Presencia en redes sociales para conectarse con la comunidad IT

  'Other',
];
export const FRAMEWORKS = {
  JavaScript: ['React', 'Vue', 'Node.js', 'Angular', 'Express', 'Next.js'],
  Python: ['Django', 'Flask', 'FastAPI', 'Pyramid'],
  Go: ['Gin', 'Echo'],
  Ruby: ['Rails', 'Sinatra'],
  Java: ['Java.Spring', 'JavaFX', 'Hibernate'],
  CSharp: ['ASP.NET', 'Unity'],
  PHP: ['Laravel', 'Symfony', 'CodeIgniter'],
  Rust: ['Rocket', 'Actix'],
  Kotlin: ['Ktor', 'Spring'],
  'No Code': ['Webflow', 'Bubble']
};

export const PROJECT_STATUS = ['new', 'pending', 'in-progress', 'to review', 'completed', 'archived']
export const PROJECT_PRORITY = ['low', 'medium', 'high', 'urgent']