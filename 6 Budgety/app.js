var budgetController=(function(){
    var x=23;
    var add=function(a){
        return x+a;
    }
    
    return {
       publicAdd:function(b){
           return add(b);
       } 
    }
    
})();

var UIController=(function(){
   //UI related code 
})();

var controller=(function(budgetCtrl, UICtrl){
    
    var sum=budgetCtrl.publicAdd(20);
    
    
    return{
        anotherPublicAdd:function(){
            console.log(sum);
        }
    }
    
})(budgetController,UIController);

console.log(budgetController.publicAdd(15));
controller.anotherPublicAdd(20);