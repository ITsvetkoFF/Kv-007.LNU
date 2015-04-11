'use strict';


angular.module('admissionSystemApp')
  .controller('ListPersonCtrl', function($scope, personDecodeServise) {

    $scope.dataDecoded = [];
    personDecodeServise.personDecoded().then(function (data) {
      $scope.dataDecoded = data;
    });

    $scope.filters = [
      {
        title: 'Стать',
        content: [  { id: 1, name: 'Стать чоловіча', property: 'genderTypeId'} ,
                    { id: 2, name: 'Стать жіноча', property: 'genderTypeId'} ,
                    { id: 3, name: 'Стать не визначена', property: 'genderTypeId'}  ],
        open: true
      },
      {
        title: 'Тип персони',
        content: [  { id: 1, name: 'абітурієнт', property: 'personTypeId'} ,
                    { id: 2, name: 'студент', property: 'personTypeId'} ,
                    { id: 3, name: 'науковець', property: 'personTypeId'} ,
                    { id: 4, name: 'працівник', property: 'personTypeId'} ,
                    { id: 5, name: 'випускник', property: 'personTypeId'} ,
                    { id: 10, name: 'сторонній', property: 'personTypeId'}  ],
        open: true
      },
      {
        title: 'Потреба в гуртожитку',
        content: [  { id: 1, name: 'Потребує гуртожитку', property: 'isHostel'} ,
                    { id: 2, name: 'Не потребує гуртожитку', property: 'isHostel'}  ],
        open: true
      },
      {
        title: 'Військовозобов\'яз.',
        content: [  { id: 1, name: 'Військовозобов\'яз.', property: 'isMilitary'} ,
                    { id: 2, name: 'не є військовозобов\'яз.', property: 'isMilitary'}  ],
        open: true
      },
      {
        title: 'Резидент',
        content: [  { id: 1, name: 'іноземець', property: 'resident'} ,
                    { id: 2, name: 'не є іноземцем', property: 'resident'}  ],
        open: true
      }
    ];

    $scope.headers = [
      { name: 'id', display: 'id', visible: false }, 
      { name: 'name', display: 'ПІБ', visible: true }, 
      { name: 'firstName', display: 'Ім’я', visible: false }, 
      { name: 'fatherName', display: 'По-батькові', visible: false }, 
      { name: 'surname', display: 'Прізвище', visible: false }, 
      { name: 'personTypeId', display: 'Тип персони', visible: true },
      { name: 'genderTypeId', display: 'Стать', visible: true }, 
      { name: 'marriedTypeId', display: 'Сімейний стан', visible: true }, 
      { name: 'citizenCountryId',  display: 'Громад-во',  visible: true }, 
      { name: 'docSeries',  display: 'Серія ОС',  visible: true }, 
      { name: 'docNum',  display: 'Номер ОС',  visible: true }, 
      { name: 'resident',  display: 'Резидент',  visible: true }, 
      { name: 'birthPlace',  display: 'Місце народж.',  visible: true }, 
      { name: 'begDate', display: 'Дата народж.', visible: true }, 
      { name: 'isMilitary', display: 'ВЗ', visible: true }, 
      { name: 'isHostel', display: 'Гуртожиток', visible: true }, 
      { name: 'identifier', display: 'Мат. відп', visible: false }
    ];


  });