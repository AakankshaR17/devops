pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        
        stage('Code Quality Analysis') {
            steps {
                echo 'Running code quality analysis...'
                // You would typically run a tool like SonarQube here
                // For now, we'll use a placeholder command
                sh 'echo "Running code quality analysis"'
            }
        }
        
        stage('Deploy to Staging') {
            steps {
                echo 'Deploying to staging environment...'
                // You would typically deploy to a staging server here
                // For now, we'll use a placeholder command
                sh 'echo "Deploying to staging"'
            }
        }
        
        stage('Release') {
            steps {
                echo 'Releasing the application...'
                // You would typically tag the release and deploy to production here
                // For now, we'll use placeholder commands
                sh 'echo "Tagging release"'
                sh 'echo "Deploying to production"'
            }
        }
        
        stage('Monitoring') {
            steps {
                echo 'Setting up monitoring...'
                // You would typically set up or update monitoring here
                // For now, we'll use a placeholder command
                sh 'echo "Setting up monitoring"'
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}