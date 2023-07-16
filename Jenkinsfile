pipeline {
    agent any
    environment {
        AWS_ACCOUNT_ID="590299612345"
        AWS_DEFAULT_REGION="us-east-1"
        IMAGE_REPO_NAME="jenkinsbuild"
        IMAGE_TAG="latest"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
        CONTAINER_NAME="test-lb4"
        PORT="3000"
    }
   
    stages {
        
         stage('Logging into AWS ECR') {
            steps {
                script {
                sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
                }
                 
            }
        }
        
        stage('Cloning Git') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '**']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '', url: 'https://github.com/Euphoria99/LoopBack_CRUD.git']]])     
            }
        }
  
    // Building Docker images
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build "${REPOSITORY_URI}:${IMAGE_TAG}"
        }
      }
    }
   
    // Uploading Docker images into AWS ECR
    stage('Pushing to ECR') {
     steps{  
         script {
                sh "docker push ${REPOSITORY_URI}:${IMAGE_TAG}"
         }
        }
      }

      // Remove old container
        stage('Stop old containers') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    script {
                        sh "docker stop ${CONTAINER_NAME} && docker rm ${CONTAINER_NAME}"
                    }
                }
            }
        }

      //Run the Image 
       stage('Run Container') {
         steps{  
         script {
                sh "docker run --name ${CONTAINER_NAME} -d -p --restart always ${PORT}:${PORT} ${REPOSITORY_URI}:${IMAGE_TAG}"
         }
        }
      }

    }
}