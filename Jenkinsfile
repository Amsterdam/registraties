#!groovy

def tryStep(String message, Closure block, Closure tearDown = null) {
    try {
        block()
    }
    catch (Throwable t) {
        slackSend message: "${env.JOB_NAME}: ${message} failure ${env.BUILD_URL}", channel: '#ci-channel', color: 'danger'

        throw t
    }
    finally {
        if (tearDown) {
            tearDown()
        }
    }
}

String PROJECT = "registraties"

node {
    stage("Checkout") {
        checkout scm
    }

    stage("Lint") {
        tryStep "lint start", {
            sh "docker-compose -p ${PROJECT} up --exit-code-from test-lint test-lint"
        }
        always {
            tryStep "lint stop", {
                sh "docker-compose -p ${PROJECT} down -v || true"
            }
        }
    }

    stage("Test") {
        tryStep "test start", {
            sh "docker-compose -p ${PROJECT} up --exit-code-from test-unit-integration test-unit-integration"
        }
        always {
            tryStep "lint stop", {
                sh "docker-compose -p ${PROJECT} down -v || true"
            }
        }
    }
}

node {
    stage("Build acceptance image") {
        tryStep "build", {
            def image = docker.build("build.app.amsterdam.nl:5000/ois/registraties:${env.BUILD_NUMBER}",
                "--shm-size 1G " +
                "--build-arg BUILD_ENV=acc " +
                "--build-arg BUILD_NUMBER=${env.BUILD_NUMBER} " +
                ". ")
            image.push()
        }
    }
}


String BRANCH = "${env.BRANCH_NAME}"

if (BRANCH == "master") {

    node {
        stage('Push acceptance image') {
            tryStep "image tagging", {
                def image = docker.image("build.app.amsterdam.nl:5000/ois/registraties:${env.BUILD_NUMBER}")
                image.pull()
                image.push("acceptance")
            }
        }
    }

    node {
        String VERSION = sh(script: 'npx sentry-cli releases propose-version', , returnStdout: true).trim()

        stage("Sentry release") {
            tryStep "authenticate", {
                sh "curl -H 'Authorization: DSN {DSN}' https://sentry.data.amsterdam.nl/api/0/projects/"
            }

            tryStep "create release", {
                sh "npx sentry-cli releases new -p ${PROJECT} ${VERSION}"
                sh "npx sentry-cli releases set-commits --auto ${VERSION}"
            }
        }

        stage("Deploy to ACC") {
            tryStep "deployment", {
                build job: 'Subtask_Openstack_Playbook',
                parameters: [
                    [$class: 'StringParameterValue', name: 'INVENTORY', value: 'acceptance'],
                    [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy-registraties.yml'],
                ]
            }
        }
    }

    stage('Waiting for approval') {
        slackSend channel: '#ci-channel', color: 'warning', message: 'registraties is waiting for Production Release - please confirm'
        timeout(10) {
          input "Deploy to Production?"
        }
    }

    node {
        stage("Build and Push Production image") {
            tryStep "build", {
                def image = docker.build("build.app.amsterdam.nl:5000/ois/registraties:${env.BUILD_NUMBER}",
                    "--shm-size 1G " +
                    "--build-arg BUILD_NUMBER=${env.BUILD_NUMBER} " +
                    ".")
                image.push("production")
                image.push("latest")
            }
        }
    }

    node {
        stage("Deploy") {
            tryStep "deployment", {
                build job: 'Subtask_Openstack_Playbook',
                parameters: [
                    [$class: 'StringParameterValue', name: 'INVENTORY', value: 'production'],
                    [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy-registraties.yml'],
                ]
            }
        }
    }
}
