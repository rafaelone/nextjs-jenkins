FROM jenkins/jenkins:lts

USER root
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y nodejs \
  && npm install -g npm
USER jenkins
