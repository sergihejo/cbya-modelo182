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

        // stage('Sand discord notification') {
            // steps {
                // script {
                    // def payload = '{"content": "Successfully deployed. Check it [here](https://jenkins-flyant.asociacionaspa.es/job/FlyAntWebsite/lastBuild/)"}'
                    // sh "curl -s -H \"Accept: application/json\" -H \"Content-Type:application/json\" -X POST --data '${payload}' https://discord.com/api/webhooks/1255244249809813605/BSA04-QS0EyqjLIBY-wGWLwJeyFp-oK9sTUwW1CHpxkYDhPs-RKMqlEoFRNndVYR3mzF"
                // }
            // }
        // }

    }

    // post {
    //     failure {
    //         // Configure notifications if required, e.g., email, Slack, etc.
    //             script {
    //                 def payload = '{"content": "Failed to deploy. Check it [here](https://jenkins-flyant.asociacionaspa.es/job/FlyAntWebsite/lastUnsuccessfulBuild/)"}'
    //                 sh "curl -s -H \"Accept: application/json\" -H \"Content-Type:application/json\" -X POST --data '${payload}' https://discord.com/api/webhooks/1255244244889767987/opIZqLGYEpeffj1C_qe8I7M3DQ6SPRFGjnEbNKdj8dLQE-8HG_1eg-5w7ZMIe3S9TREc"
    //             }
    //     }
    // }
}