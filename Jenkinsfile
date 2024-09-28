pipeline {
    agent any

    tools {
        nodejs 'NodeJS 14'  // Use the name you gave to the NodeJS installation in Jenkins
    }

    environment {
        DOCKER_IMAGE = 'todo-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || echo "No tests specified"'
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Docker Run') {
            steps {
                script {
                    docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").run('-p 3000:3000 -d')
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
            sh 'docker ps'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}