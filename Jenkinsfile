pipeline {

  // Donde se va a ejecutar el Pipeline
  agent {
    label 'Slave_Induccion'
  }

  // Opciones especificas de Pipeline dentro del Pipeline
  options {
    buildDiscarder(logRotator(numToKeepStr: '3'))
 		disableConcurrentBuilds()
  }

  // Seccion que define las herramientas "preinstaladas" en Jenkins
  tools {
    jdk 'JDK8_Centos' // Version preinstalada en la Configuracion del Master
  }
  
  /* 
   VERSIONES DISPONIBLES
	- JDK8_Mac
	- JDK6_Centos
	- JDK7_Centos
	- JDK8_Centos
	- JDK10_Centos
	- JDK11_Centos
	- JDK13_Centos
	- JDK14_Centos
  */

  // Aqui comienzan los "etapas" del Pipeline
  stages{
    stage('Checkout') {
      steps{
        echo "------------>Checkout<------------"
        checkout([
          $class: 'GitSCM', 
          branches: [[name: '*/master']], 
          doGenerateSubmoduleConfigurations: false, 
          extensions: [], 
          gitTool: 'Default', 
          submoduleCfg: [], 
          userRemoteConfigs: [[
            credentialsId: 'GitHub_harvin.rengifo', 
            url:'https://github.com/harvin-ceiba/front-licitaciones'
          ]]
        ])
      }
    }
    
    stage('NPM Install') {
      steps {
        withEnv(['NPM_CONFIG_LOGLEVEL=warn']) {
          sh 'npm install'
        }
      }
    }

    stage('Unit Test') {
      steps {
        echo '------------>Testing<------------'
        sh 'ng test --browsers ChromeHeadless --progress=false --watch false --code-coverage'
      }
    }

    stage('Lint') {
      steps {
        sh 'ng lint'
      }
    }

    stage('Static Code Analysis') {
      steps{
        echo '------------>Analisis de codigo estatico<------------'
        withSonarQubeEnv('Sonar') {
			    sh "${tool name: 'SonarScanner', type:'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner"
        }
      }
    }

    stage('Build') {
      steps {
        echo "------------>Build<------------"
        sh 'ng build --prod --progress=false'
      }
    }  
  }

  post {
    always {
      echo 'This will always run'
    }
    success {
      echo 'This will run only if successful'
    }
    failure {
      echo 'This will run only if failed'
      mail (to: 'harvin.rengifo@ceiba.com.co',subject: "Failed Pipeline:${currentBuild.fullDisplayName}", body: "Something is wrong with ${env.BUILD_URL}")
    }
    unstable {
      echo 'This will run only if the run was marked as unstable'
    }
    changed {
      echo 'This will run only if the state of the Pipeline has changed'
      echo 'For example, if the Pipeline was previously failing but is now successful'
    }
  }
}
