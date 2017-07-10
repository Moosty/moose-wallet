node('moose-wallet-01'){
  lock(resource: "moose-wallet-01", inversePrecedence: true) {
    stage ('Cleanup Orphaned Processes') {
      try {
      sh '''
        # Clean up old processes
        cd ~/moose-test-wallet
        bash moose.sh stop_node
        pkill -f selenium -9 || true
        pkill -f Xvfb -9 || true
        rm -rf /tmp/.X0-lock || true
        pkill -f webpack -9 || true
      '''
      } catch (err) {
        currentBuild.result = 'FAILURE'
        milestone 1
        error('Stopping build, installation failed')
      }
    }

    stage ('Prepare Workspace') {
      try {
        deleteDir()
        checkout scm
      } catch (err) {
        currentBuild.result = 'FAILURE'
        milestone 1
        error('Stopping build, Checkout failed')
      }
    }

    stage ('Start Moosecoin Core') {
      try {
        sh '''#!/bin/bash
          cd ~/moose-test-wallet
          bash moose.sh rebuild -0
          '''
      } catch (err) {
        currentBuild.result = 'FAILURE'
        milestone 1
        error('Stopping build, MooseCoin Core failed to start')
      }
    }

    stage ('Build Wallet') {
      try {
        sh '''#!/bin/bash
        # Install Electron
        npm install
        # Build wallet
        cd $WORKSPACE
        npm install

        # Add coveralls config file
        cp ~/.coveralls.yml-wallet .coveralls.yml

        # Run Build
        npm run build
        '''
      } catch (err) {
        currentBuild.result = 'FAILURE'
        milestone 1
        error('Stopping build, Wallet build failed')
      }
    }

    stage ('Run Tests') {
      try {
        sh '''
        export ON_JENKINS=true
        # Run test
        cd $WORKSPACE
        npm run test
        '''
      } catch (err) {
        currentBuild.result = 'FAILURE'
        error('Stopping build, Test suite failed')
      }
    }

    stage ('Start Dev Server and Run Tests') {
      try {
        sh '''
        # Prepare MooseCoin core for testing
        bash ~/tx.sh

        # Run Dev build and Build
        cd $WORKSPACE
        export NODE_ENV=
        npm run dev &> .moose-wallet.log &
        sleep 30

        # End to End test configuration
        export DISPLAY=:99
        Xvfb :99 -ac -screen 0 1280x1024x24 &
        ./node_modules/protractor/bin/webdriver-manager update
        ./node_modules/protractor/bin/webdriver-manager start &

        # Run End to End Tests
        npm run e2e-test

        cd ~/moose-test-wallet
        bash moose.sh stop_node
        pkill -f selenium -9 || true
        pkill -f Xvfb -9 || true
        rm -rf /tmp/.X0-lock || true
        pkill -f webpack -9 || true

        '''
      } catch (err) {
        currentBuild.result = 'FAILURE'
        milestone 1
        error('Stopping build, End to End Test suite failed')
      }
    }

    stage ('Set milestone') {
      milestone 1
    }
  }
}
