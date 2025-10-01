FROM jenkins/jenkins:lts

# Troca para root para instalar pacotes
USER root

# Atualiza repositórios e instala ferramentas básicas
RUN apt-get update && apt-get install -y \
  curl \
  unzip \
  git \
  openjdk-17-jdk-headless \
  && rm -rf /var/lib/apt/lists/*

# Instala Node.js 20 e npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y nodejs \
  && npm install -g npm

# Instala SonarScanner globalmente via npm
RUN npm install -g sonar-scanner

# Volta para o usuário jenkins
USER jenkins

# Expor portas padrão do Jenkins (8080 e 50000)
EXPOSE 8080 50000
