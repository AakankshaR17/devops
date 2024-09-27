pipeline {
    agent any

    tools {
        nodejs 'NodeJS 14'  // Use the name you gave to the NodeJS installation
    }

    environment {
        DOCKER_IMAGE = 'todo-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Environment Info') {
            steps {
                sh 'pwd'
                sh 'ls -la'
                sh 'which node'
                sh 'node --version'
                sh 'which npm'
                sh 'npm --version'
                sh 'which docker'
                sh 'docker --version'
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
                sh 'ls -la'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the application...'
                
                sh 'npm ci || npm install'
                sh 'ls -la node_modules'
                
                script {
                    try {
                        docker.withServer('unix:///var/run/docker.sock') {
                            def customImage = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                            echo "Docker image built: ${customImage.id}"
                        }
                    } catch (Exception e) {
                        echo "Docker build failed: ${e.message}"
                        currentBuild.result = 'FAILURE'
                        error("Docker build failed")
                    }
                }
            }
        }

        // Other stages remain the same...
    }

    post {
        always {
            echo 'Pipeline finished'
            sh 'docker images || true'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}