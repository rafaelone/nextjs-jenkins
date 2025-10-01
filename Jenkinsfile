pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/rafaelone/nextjs-jenkins.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // Isso vai configurar automaticamente as variáveis de ambiente do SonarQube
                withSonarQubeEnv('SonarQube') {
                    sh 'sonar-scanner -Dsonar.projectKey=nextjs-jenkins -Dsonar.sources=.'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizada!'
        }
    }
}
