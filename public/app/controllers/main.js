'use strict';



// Drum Controller
app.controller('DrumMachineCtrl', function($scope, $rootScope) {
  //variable to prevent multiple playloops
    $scope.lock = false;
    $rootScope.helloText = "Will you say hello to me?";
    $scope.didItSayHello = false;
    // Start playback
  $scope.playLoop = function () {
      if (!$scope.lock) {
        $scope.machine.play();
        $scope.fade_msg_play = true;
        console.log('Playing');
        $scope.lock = true;
      }

  };

  // Halt playback
  $scope.stopLoop = function () {
      $scope.lock = false;
      $scope.machine.stop();
      
  };

  // Reset the machine to its original state
  $scope.resetLoop = function() {
    $scope.machine.reset();
  };

  // Update the tempo
  $scope.updateTempo = function() {
      $scope.machine.setTempo($scope.tempo);
      
  };

  $scope.EditBPM = function() {
      var bpmEdit = document.getElementById('bpmEdit');
      var bpm = document.getElementById('bpm');
      bpm.style.display = 'none';
      bpmEdit.style.display = 'inline-block';
  }
  $scope.CloseEdit = function() {
      bpm.style.display = 'inline-block';
      bpmEdit.style.display = 'none';
  }

  $scope.sayHello = function() {
    
    $scope.didItSayHello = !$scope.didItSayHello;
    if($scope.didItSayHello) {
      $rootScope.helloText = 'Hello Clarice';
    } else {
      $rootScope.helloText = 'Quid pro quo';
    }
    console.log($rootScope.helloText);
  };

  $rootScope.$watch('helloText', function(newValue){
    window.dispatchEvent(new CustomEvent('helloTextChanged', { detail: newValue }))
  });

});


