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
        def scmVars = checkout(scm)
        env.GIT_COMMIT = scmVars.GIT_COMMIT
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
                "--build-arg GIT_COMMIT=${env.GIT_COMMIT} " +
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
