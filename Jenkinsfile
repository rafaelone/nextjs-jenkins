pipeline {
    agent {
        docker {
            image 'node:20' // usa Node 20 oficial
            args '-u root:root' // opcional, para evitar problemas de permissão
        }
    }

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
    }

    post {
        always {
            echo 'Pipeline finalizada!'
        }
    }
}
