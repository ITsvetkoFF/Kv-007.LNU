angular.module('admissionSystemApp')

  .controller('TabSubjectCtrl', ['$scope', '$modal', 'Subjects', function ($scope, $modal, Subjects) {
    $scope.entireSpecoffer.subjects = [];
    $scope.viewSubjects = [];
    $scope.allSubjects = [];

    $scope.open = function (size) {

      $modal.open({
        templateUrl: '../views/modal/TabSubject.html',
        controller: 'ModalSubjectCtrl',
        size: size,
        scope: $scope.$new(true)
      }).result.then(function (item) {
          var arrayForId = [],
            i;

          if (item.allSubjects.addName) {
            arrayForId = [item.allSubjects.subject].concat(item.allSubjects.addName);
          }
          else {
            arrayForId = [item.allSubjects.subject];
          }

          for (i = 0; i < arrayForId.length; i++) {  //forEach
            $scope.entireSpecoffer.subjects.push({
              enrolmentSubjectId: arrayForId[i].id,
              // addName: $scope.allSubjects.addName.id,
              mark: item.mark,
              isMajor: item.isMajor || false,
              alternative: item.alternative || false,
              note: '',
              weightSubject: item.weightSubject
            });

            console.log('id' + $scope.entireSpecoffer.subjects[i].enrolmentSubjectId);

            showSubjectById(arrayForId[i].id, item.mark, item.isMajor, item.alternative, item.weightSubject);

          }

        });

    };

    function showSubjectById(id, mark, isMajor, alternative, weight) {
      Subjects.getSubjectsById(id).then(function (result) {
        console.log(result);

        $scope.viewSubjects.push({
          subject: result.name,
          addName: result.additionName,
          mark: mark,
          isMajor: isMajor,
          alternative: alternative,
          note: '',
          weightSubject: weight
        });

      });
    }

    $scope.removeRow = function (idx) {
      $scope.entireSpecoffer.subjects.splice(idx, 1);
      $scope.viewSubjects.splice(idx, 1);

    };

  }])


  .controller('ModalSubjectCtrl', function ($scope, $modalInstance, Subjects) {
    Subjects.getChiefSubjects().then(function (data) {
      $scope.subjectName = data;
    });

    $scope.additionalSubjects = [];
    $scope.allSubjects = [];
    $scope.subject = '';
    $scope.$watch('allSubjects.subject', function (subject) {

      if (subject && subject.hasChildren) {
        Subjects.getSubjectsForParent(subject.id).then(function (data) {
          $scope.additionalSubjects = data;
        });
      }
    });

    $scope.ok = function () {

      $scope.$close($scope);

    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
