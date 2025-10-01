pipeline {
    agent any  // usa qualquer executor disponível

    environment {
        // se precisar de variáveis de ambiente
        NODE_VERSION = '20' 
    }

    stages {
        stage('Checkout') {
            steps {
                // faz checkout do seu repositório
                git branch: 'main', url: 'https://github.com/rafaelone/nextjs-jenkins.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // se estiver usando Node.js
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                // roda o lint
                sh 'npm run lint'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizada!'
        }
    }
}
