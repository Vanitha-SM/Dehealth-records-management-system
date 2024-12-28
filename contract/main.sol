// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

 contract HospitalRegistry {

 struct Hospital {
 uint id;
 string name ;
 string location ;
 string phone ;
 string email ;
 bool exists ;
 }

 struct Patient {
 uint id;
 string name ;
 uint age ;
 string gender ;
 string diagnosis ;
 }
 mapping ( uint => Hospital ) public hospitals ;
 mapping ( uint => mapping ( uint => Patient ) ) public hospitalPatients ;
 mapping ( uint => uint ) public patientCount ;
 uint public hospitalCount ;

 constructor () {
 hospitalCount = 0;
 }

function addHospital ( string memory _name , string memory _location , string
memory _phone , string memory _email ) public {
 hospitalCount ++;
 hospitals [ hospitalCount ] = Hospital ( hospitalCount , _name , _location ,
_phone , _email , true );
 
 }

 function removeHospital ( uint _hospitalId ) public {
 require ( hospitals [ _hospitalId ]. exists , " Hospital does not exist ");
 delete hospitals [ _hospitalId ];
 }

function addPatient ( uint _hospitalId , string memory _name , uint _age ,
string memory _gender , string memory _diagnosis ) public {
require ( hospitals [ _hospitalId ]. exists , " Hospital ID is invalid ") ;
patientCount [ _hospitalId ]++;
uint newPatientId = patientCount [ _hospitalId ];
 hospitalPatients [ _hospitalId ][ newPatientId ] = Patient ( newPatientId ,
_name , _age , _gender , _diagnosis ) ;
 }

 function addPatientRecord ( uint _hospitalId , uint _patientId , string
memory _diagnosis ) public {
 require ( hospitals [ _hospitalId ]. exists , " Hospital ID is invalid ") ;
 require ( _patientId > 0 && _patientId <= patientCount [ _hospitalId ], "Patient ID is invalid ");
 hospitalPatients [ _hospitalId ][ _patientId ]. diagnosis = _diagnosis ;
 }

 function getPatientRecord ( uint _hospitalId , uint _patientId ) public view
returns (uint , string memory , uint , string memory , string memory ) {
 require ( hospitals [ _hospitalId ]. exists , " Hospital ID is invalid ") ;
 require ( _patientId > 0 && _patientId <= patientCount [ _hospitalId ], "Patient ID is invalid ");
 Patient memory patient = hospitalPatients [ _hospitalId ][ _patientId ];
 return ( patient .id , patient .name , patient .age , patient . gender ,
patient . diagnosis ) ;
 }

 function removePatientRecord ( uint _hospitalId , uint _patientId ) public {
 require ( hospitals [ _hospitalId ]. exists , " Hospital ID is invalid ") ;
 require ( _patientId > 0 && _patientId <= patientCount [ _hospitalId ], "Patient ID is invalid ");
 delete hospitalPatients [ _hospitalId ][ _patientId ];
 }
 }