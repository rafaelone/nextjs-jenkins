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
          environment {
            SONAR_TOKEN= credentials('sqa_5aeedd9da81fcf4a147085f5b553324f52d933fd')
          }
          steps {
            sh """
                sonar-scanner \
                  -Dsonar.projectKey=nextjs-jenkins \
                  -Dsonar.sources=. \
                  -Dsonar.host.url=http://sonarqube:9000 \
                  -Dsonar.login=$SONAR_TOKEN
            """
          }
        }
    }

    post {
        always {
            echo 'Pipeline finalizada!'
        }
    }
}
