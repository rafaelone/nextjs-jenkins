FROM jenkins/jenkins:lts

USER root

# Instala Node.js e npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y nodejs \
  && npm install -g npm

# Volta para o usuário jenkins
USER jenkins
