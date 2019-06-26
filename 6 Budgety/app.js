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

console.log(budgetController.publicAdd(10));