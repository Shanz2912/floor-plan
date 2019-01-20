/* author @Bhavani Shankar */
angular.module('building', []).controller('FloorplanCtrl',
	function($scope) {
    var delCount = 0;
    var addCount = 0;
    var delCantCount = 0;
    var addCantCount = 0;
    $scope.showForm = false;
    $scope.chairSpaceIds = [];
    $scope.ebs1 = null;
    $scope.cat = null;
    $scope.ebs2 = null;
    $scope.ebs3 = null;
    $scope.il1b1 = null;
    $scope.il1b2 = null;
    $scope.il1b3 = null;
    $scope.il2b1 = null;
    $scope.il2b2 = null;
    $scope.il2b3 = null;
    $scope.il2b4 = null;
    $scope.il3b1 = null;
    $scope.il3b2 = null;
    $scope.il3b3 = null;
    $scope.il3b4 = null;
    $scope.e1direction = null;
    $scope.e2direction = null;
    $scope.validateChair = null;
    $scope.eliminateDuplicate = null;
    $scope.last = null;
    $scope.delCanLast = null;
    $scope.lastAddObj = null;
    $scope.prevStr = null;
    $scope.string = null;
    $scope.lastDelObj = null;
    $scope.exceeded = false;
    $scope.chairArrangmentList = [];
    $scope.formShow = function() {
        $scope.showForm = true;
    };
    $scope.placeCanteen = function() {
        $scope.eliminateCanDuplicate = false;
        $scope.validateCanChair = false;
        $scope.last = {
            "cSpaceid":$scope.cSpaceid,
            "cantChar":$scope.cName    
        }
        angular.forEach($scope.chairSpaceIds,function(value,key){
            if(value.cSpaceid == $scope.cSpaceid) {
                $scope.validateCanChair = true;
                $scope.eliminateCanDuplicate = true;
            }
        });
        if(!$scope.eliminateCanDuplicate && $scope.last.cSpaceid){
            $scope.prevStr = "addCant";
            $scope.chairSpaceIds.push($scope.last);
            $scope.showForm = false;
            if($scope.chairSpaceIds.length >= 6){
                $scope.exceeded = true;
                alert("you placed chair in last available space in the canteen");
            }
        }
    };
    $scope.deleteCantChairs = function(cantId) {
        $scope.prevStr = "delCant";
        angular.forEach($scope.chairSpaceIds,function(value,key){
            if(value.cSpaceid == cantId && confirm("Are you sure to delete chair?")) {
                var statusMsg = "Floor plan updated successfully";
                $scope.delCanLast = value;
                var index = $scope.chairSpaceIds.indexOf(value);
                $scope.chairSpaceIds.splice(index, 1);
                $scope.confirmationAction(statusMsg);    
            }
        });
    };
    $scope.prevCan = function(prevStr){
        if(prevStr == 'addCant'){
            addCantCount = addCantCount + 1;
            if(addCantCount ==1){
                angular.forEach($scope.chairSpaceIds,function(value,key){
                    if(value.cSpaceid == $scope.last.cSpaceid ) {
                        var index = $scope.chairSpaceIds.indexOf(value);
                        $scope.chairSpaceIds.splice(index, 1);   
                    }
                });
            }
        } 
        if(prevStr == 'delCant'){
            delCantCount = delCantCount + 1;
            if(delCantCount ==1){
                $scope.chairSpaceIds.push($scope.delCanLast);
            } 
        } 
    };
    $scope.addChairs = function(spaceId) {
        $scope.eliminateDuplicate = false;
        angular.forEach($scope.chairArrangmentList,function(value,key){
            if(value.placedId == spaceId) {
                $scope.validateChair = true;
                $scope.eliminateDuplicate = true;
            }
        });
        if(!$scope.eliminateDuplicate){
            $scope.lastAddObj = {
                "chairName": $scope.name,
                "placedId": $scope.spaceId
            };
            $scope.chairArrangmentList.push($scope.lastAddObj);
            $scope.string = "addChair";
            angular.forEach($scope.chairArrangmentList,function(value,key){
                switch(value.placedId){
                    case 'EBS1':
                        $scope.ebs1 = value;
                        break;
                    case 'EBS2':
                        $scope.ebs2 = value;
                        break;
                    case 'EBS3':
                        $scope.ebs3 = value;
                        break;
                    case 'EBR3':
                        $scope.ebr3 = value;
                        break;
                    case 'IL1B1':
                        $scope.il1b1 = value;
                        break;
                    case 'IL1B2':
                        $scope.il1b2 = value;
                        break;
                    case 'IL1B3':
                        $scope.il1b3 = value;
                        break;
                    case 'IL2B1':
                        $scope.il2b1 = value;
                        break;
                    case 'IL2B2':
                        $scope.il2b2 = value;
                        break;
                    case 'IL2B3':
                        $scope.il2b3 = value;
                        break;
                    case 'IL2B4':
                        $scope.il2b4 = value; 
                        break;
                    case 'IL3B1':
                        $scope.il3b1 = value;
                        break;
                    case 'IL3B2':
                        $scope.il3b2 = value;
                        break;
                    case 'IL3B3':
                        $scope.il3b3 = value;
                        break;
                    case 'IL3B4':
                        $scope.il3b4 = value;
                        break;
                    default:
                        break;
                }
            });
            $scope.validateChair = false;
        }
    };
    $scope.deleteChairs = function(obj){
        $scope.string = "dele";
        var tempDelList = [];
        tempDelList = $scope.chairArrangmentList;
        $scope.chairArrangmentList = tempDelList.slice().reverse();
        angular.forEach($scope.chairArrangmentList,function(value,key){
            if(value.placedId == obj.placedId && confirm("Are you sure to delete chair?")) {
                var statusMsg = "Floor plan updated successfully";
                switch(value.placedId){
                    case 'EBS1':
                        if($scope.ebs1 == value){
                            var index = $scope.chairArrangmentList.indexOf(value);
                            $scope.chairArrangmentList.splice(index, 1);
                            $scope.ebs1 = null;
                            $scope.lastDelObj = value;
                        }
                        break;
                    case 'EBS2':
                        if($scope.ebs2 == value){
                            var index = $scope.chairArrangmentList.indexOf(value);
                            $scope.chairArrangmentList.splice(index, 1);
                            $scope.ebs2 = null;
                            $scope.lastDelObj = value;
                        }
                        break;
                    case 'EBS3':
                        if($scope.ebs3 == value){
                            var index = $scope.chairArrangmentList.indexOf(value);
                            $scope.chairArrangmentList.splice(index, 1);
                            $scope.ebs3 = null;
                            $scope.lastDelObj = value;
                        }
                        break;
                    case 'EBR3':
                        if($scope.ebr3 == value){
                            var index = $scope.chairArrangmentList.indexOf(value);
                            $scope.chairArrangmentList.splice(index, 1);
                            $scope.ebr3 = null;
                            $scope.lastDelObj = value;
                        }
                        break;
                    case 'IL1B1':
                        if($scope.il1b1 == value){
                            var index = $scope.chairArrangmentList.indexOf(value);
                            $scope.chairArrangmentList.splice(index, 1);
                            $scope.il1b1 = null;
                            $scope.lastDelObj = value;
                            }
                        break;
                    case 'IL1B2':
                        if($scope.il1b2 == value){
                            var index = $scope.chairArrangmentList.indexOf(value);
                            $scope.chairArrangmentList.splice(index, 1);
                            $scope.il1b2 = null;
                            $scope.lastDelObj = value;
                        }
                        break;
                    case 'IL1B3':
                        if($scope.il1b3 == value){
                            var index = $scope.chairArrangmentList.indexOf(value);
                            $scope.chairArrangmentList.splice(index, 1);
                            $scope.il1b3 = null;
                            $scope.lastDelObj = value;
                        }
                        break;
                    case 'IL2B1':
                        if($scope.il2b1 == value){
                            var index = $scope.chairArrangmentList.indexOf(value);
                            $scope.chairArrangmentList.splice(index, 1);
                            $scope.il2b1 = null;
                            $scope.lastDelObj = value;
                        }
                        break;
                    case 'IL2B2':
                        if($scope.il2b2 == value){
                            var index = $scope.chairArrangmentList.indexOf(value);
                            $scope.chairArrangmentList.splice(index, 1);
                            $scope.il2b2 = null;
                            $scope.lastDelObj = value;
                        }
                        break;
                    case 'IL2B3':
                        if($scope.il2b3 == value){
                            var index = $scope.chairArrangmentList.indexOf(value);
                            $scope.chairArrangmentList.splice(index, 1);
                            $scope.il2b3 = null;
                            $scope.lastDelObj = value;
                        }
                        break;
                    case 'IL2B4':
                        if($scope.il2b4 == value){
                            var index = $scope.chairArrangmentList.indexOf(value);
                            $scope.chairArrangmentList.splice(index, 1);
                            $scope.il2b4 = null;
                            $scope.lastDelObj = value;
                            } 
                        break;
                    case 'IL3B1':
                        if($scope.il3b1 == value){
                            var index = $scope.chairArrangmentList.indexOf(value);
                            $scope.chairArrangmentList.splice(index, 1);
                            $scope.il3b1 = null;
                            $scope.lastDelObj = value;
                         }
                        break;
                    case 'IL3B2':
                        if($scope.il3b2 == value){
                            var index = $scope.chairArrangmentList.indexOf(value);
                            $scope.chairArrangmentList.splice(index, 1);
                            $scope.il3b2 = null;
                            $scope.lastDelObj = value;
                        }
                        break;
                    case 'IL3B3':
                        if($scope.il3b3 == value){
                            var index = $scope.chairArrangmentList.indexOf(value);
                            $scope.chairArrangmentList.splice(index, 1);
                            $scope.il3b3 = null;
                            $scope.lastDelObj = value;
                        }
                        break;
                    case 'IL3B4':
                        if($scope.il3b4 == value){
                            var index = $scope.chairArrangmentList.indexOf(value);
                            $scope.chairArrangmentList.splice(index, 1);
                            $scope.il3b4 = null;
                            $scope.lastDelObj = value;
                        }
                        break;
                    default:
                        break;
                }
                $scope.confirmationAction(statusMsg);    
            }
        });
    };
    $scope.previousPlan = function(str){
        if(str == 'addChair'){
           addCount = addCount + 1;
           if(addCount == 1){
                $scope.chairArrangmentList.pop($scope.lastAddObj);
                switch($scope.lastAddObj.placedId){
                    case 'EBS1':
                        if($scope.ebs1 == $scope.lastAddObj){
                            $scope.ebs1 = null;
                        }
                        break;
                    case 'EBS2':
                        if($scope.ebs2 == $scope.lastAddObj){
                            $scope.ebs2 = null;
                        }
                        break;
                    case 'EBS3':
                        if($scope.ebs3 == $scope.lastAddObj){
                            $scope.ebs3 = null;
                        }
                        break;
                    case 'EBR3':
                        if($scope.ebr3 == $scope.lastAddObj){
                            $scope.ebr3 = null;
                        }
                        break;
                    case 'IL1B1':
                        if($scope.il1b1 == $scope.lastAddObj){
                            $scope.il1b1 = null;
                        }
                        break;
                    case 'IL1B2':
                        if($scope.il1b2 == $scope.lastAddObj){
                            $scope.il1b2 = null;
                        }
                        break;
                    case 'IL1B3':
                        if($scope.il1b3 == $scope.lastAddObj){
                            $scope.il1b3 = null;
                        }
                        break;
                    case 'IL2B1':
                        if($scope.il2b1 == $scope.lastAddObj){
                            $scope.il2b1 = null;
                        }
                        break;
                    case 'IL2B2':
                        if($scope.il2b2 == $scope.lastAddObj){
                            $scope.il2b2 = null;
                        }
                        break;
                    case 'IL2B3':
                        if($scope.il2b3 == $scope.lastAddObj){
                                $scope.il2b3 = null;
                            }
                        break;
                    case 'IL2B4':
                        if($scope.il2b4 == $scope.lastAddObj){
                            $scope.il2b4 = null;
                        } 
                        break;
                    case 'IL3B1':
                        if($scope.il3b1 == $scope.lastAddObj){
                            $scope.il3b1 = null;
                        }
                        break;
                    case 'IL3B2':
                        if($scope.il3b2 == $scope.lastAddObj){
                            $scope.il3b2 = null;
                        }
                        break;
                    case 'IL3B3':
                        if($scope.il3b3 == $scope.lastAddObj){
                            $scope.il3b3 = null;
                        }
                        break;
                    case 'IL3B4':
                        if($scope.il3b4 == $scope.lastAddObj){
                            $scope.il3b4 = null;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        if(str == 'dele'){
           delCount = delCount + 1;
           if(delCount == 1){ 
                $scope.chairArrangmentList.push($scope.lastDelObj);
                switch($scope.lastDelObj.placedId){
                    case 'EBS1':
                        $scope.ebs1 = $scope.lastDelObj;
                        break;
                    case 'EBS2':
                        $scope.ebs2 = $scope.lastDelObj;
                        break;
                    case 'EBS3':
                        $scope.ebs3 = $scope.lastDelObj;
                        break;
                    case 'EBR3':
                        $scope.ebr3 = $scope.lastDelObj;
                        break;
                    case 'IL1B1':
                        $scope.il1b1 = $scope.lastDelObj;
                        break;
                    case 'IL1B2':
                        $scope.il1b2 = $scope.lastDelObj;
                        break;
                    case 'IL1B3':
                        $scope.il1b3 = $scope.lastDelObj;
                        break;
                    case 'IL2B1':
                        $scope.il2b1 = $scope.lastDelObj;
                        break;
                    case 'IL2B2':
                        $scope.il2b2 = $scope.lastDelObj;
                        break;
                    case 'IL2B3':
                        $scope.il2b3 = $scope.lastDelObj;
                        break;
                    case 'IL2B4':
                        $scope.il2b4 = $scope.lastDelObj; 
                        break;
                    case 'IL3B1':
                        $scope.il3b1 = $scope.lastDelObj;
                        break;
                    case 'IL3B2':
                        $scope.il3b2 = $scope.lastDelObj;
                        break;
                    case 'IL3B3':
                        $scope.il3b3 = $scope.lastDelObj;
                        break;
                    case 'IL3B4':
                        $scope.il3b4 = $scope.lastDelObj;
                        break;
                    default:
                        break;
                }
            }
        }
    };
    $scope.confirmationAction = function(msg){
        alert(msg);
    };
    $scope.showE1direction = function(){
       $scope.e1direction = true;
    };
    $scope.showE2direction = function(){
       $scope.e2direction = true;
    };
});

