pipeline {
    agent any

    // tools {
    //     nodejs 'NodeJS' // Replace 'NodeJS_18' with the name you gave your NodeJS installation
    // }
    environment {
        // PATH = "${tool 'NodeJS'}/bin:${env.PATH}" // Ensure the Node.js binary is in the PATH
        GIT_COMMIT_SHORT = "${sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', credentialsId: 'github-app', url: 'https://github.com/sergihejo/cbya-prettier'
            }
        }

        stage('Execute npm commands') {
            steps {
                sh 'cd frontend'
                sh 'pnpm install'
                sh 'pnpm build'
                sh 'cd ../backend'
                sh 'pnpm install'
                sh 'pnpm build'
                sh 'cd ..'
            }
        }

        stage('Move files') {
            steps {
                sh 'rm -rf /var/www/build'
                sh 'cp -r frontend/build /var/www/'
                sh 'rm -rf /home/ubuntu/cbya-prettier/dist'
                sh 'cp -r backend/dist /home/ubuntu/cbya-prettier/'
            }
        }
    }
}