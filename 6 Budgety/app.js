var budgetController=(function(){

    //Modelling Income object
    var Income = function(id, description, value){
        this.id=id;
        this.description=description,
        this.value=value
    };
    
    //Modelling Expense object
    var Expense = function(id,description, value){
        this.id=id,
        this.description=description,
        this.value=value,
        this.percentage=-1
    };
    
    Expense.prototype.calcPercentage=function(totalIncome){
        if(totalIncome>0){
            this.percentage=Math.round((this.value / totalIncome) * 100);
        }
        else{
            this.percentage=-1;
        }
    };
    
    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }
    
    //Calculating total values based on type
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    }
    
    //Data structure to store all income and expenditure
    var data = {
        allItems:{
            exp:[],
            inc:[]    
        },
        totals:{
            exp:0,
            inc:0
        },
        budget:0,
        percentage:-1
    };
    
    return{
        addItem: function(type, des, val){
                        var newItem, ID;
            
            //[1 2 3 4 5], next ID = 6
            //[1 2 4 6 8], next ID = 9
            // ID = last ID + 1
            
            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            // Push it into our data structure
            data.allItems[type].push(newItem);
            
            // Return the new element
            return newItem;
        },
        
        //here we remove the respective record from data structure
        deleteItem: function(type, id){
            
            var ids, index;
            
            // id = 6
            //data.allItems[type][id];
            // ids = [1 2 4  8]
            //index = 3
            
            //Map returns the current item as an array
            ids = data.allItems[type].map(function(current) {
                
                //we get current object id
                return current.id;
            });
            
            //the below will get the index in array where the id exists
            index = ids.indexOf(id);
            
            if(index!==-1){
                //this will remove 1 item on the index we provided
                data.allItems[type].splice(index,1);
            }
        },
        
        calculateBudget: function(){
            // Calculate total income and expense
            calculateTotal('inc');
            calculateTotal('exp');
            
            // Calculate budget income-expense
            data.budget=data.totals.inc-data.totals.exp;
            console.log(data.budget);
            
            // Calculate % of income we spent
            data.percentage=Math.round((data.totals.exp/data.totals.inc)*100);
            console.log(data.percentage);
        },
        
        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
        
        //This will calcullate percentages for each of expense
        calculatePercentages: function() {
            data.allItems.exp.forEach(function(cur) {
               cur.calcPercentage(data.totals.inc);
            });
        },
        
        //this would return percentage
        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(cur) {
                return cur.getPercentage();
            });
            return allPerc;
        },
        
        testing:function(){
            console.log(data);
        }
        
    };
    
})();

var UIController=(function(){
    
    var DOMStrings={
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        inputBtn:'.add__btn',
        incomeContainer:'.income__list',
        expensesContainer:'.expenses__list',
        budgetLabel:'.budget__value',
        incomeLabel:'.budget__income--value',
        expensesLabel:'.budget__expenses--value',
        percentageLabel:'.budget__income--percentage',
        container:'.container'
    }
    
    return{
        getInput:function(){
            return{
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },
        
        addListItem:function(obj, type){
            
            
            var html, newHtml, element;
            //Create HTML string with placeholder text
            if(type==='inc')
                {
                    element=DOMStrings.incomeContainer;
                    html='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                }
            else 
              if(type='exp')
                {
                    element=DOMStrings.expensesContainer;
                    html='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                }
           
            //Replace placeholder text with actual data
              newHtml=html.replace('%id%',obj.id);
              newHtml=newHtml.replace('%description%',obj.description);
              newHtml=newHtml.replace('%value%',obj.value);
            
            //Insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeEnd',newHtml);
            
        },
        
        //This will remove the passed id value
        deleteListItem:function(selectorID){
          
            var el=document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },
        
        clearFields:function(){
            var fields, fieldsArr;
            
            //This returns a list which needs to be converted to Array
            fields = document.querySelectorAll(DOMStrings.inputType+', '+DOMStrings.inputDescription+', '+DOMStrings.inputValue);
            
            //Alternate to convert list to array Array.prototype.slice.call(fields);
            fieldsArr = Array.from(fields);
            
            //iterating over each input and clearing fieds
            fieldsArr.forEach(function(current, index, array){
                current.value="";
                
            });
            
            //This will set the focus to first element in array
            fieldsArr[0].focus();
        },
        
        displayBudget:function(obj){
            console.log(obj.totalInc+' '+obj.totalExp);
            document.querySelector(DOMStrings.budgetLabel).textContent=obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent=obj.totalInc;
            document.querySelector(DOMStrings.expensesLabel).textContent=obj.totalExp;
            document.querySelector(DOMStrings.percentageLabel).textContent=obj.percentage;                      
        },
        
        getDOMStrings:function(){
            return DOMStrings;
        }
    };    
})();

//Global App controller
var controller=(function(budgetCtrl, UICtrl){

  var DOMStrings=UICtrl.getDOMStrings();
  var setupEventListener=function(){
      document.querySelector(DOMStrings.inputBtn).addEventListener('click',ctrlAddItem);
      
      document.addEventListener('keypress', function(event){
         if(event.keyCode===13 || event.which===13){
             ctrlAddItem();
         } 
      });
      
      document.querySelector(DOMStrings.container).addEventListener('click',ctrlDeleteItem);
  };    
    
  var updateBudget=function(){
      
      //1.Calculate the budget
      budgetCtrl.calculateBudget();
      
      //2.Return the budget
      var budget= budgetCtrl.getBudget();
      
      console.log(budget);
      //3.Display budget on UI
      UICtrl.displayBudget(budget);

  };
    
  var ctrlAddItem=function(){
            
      //1.Get input
      var input=UICtrl.getInput();
      
      if(input.description!='' && !isNaN(input.value) && input.value>0){
          
            //2.Add item to budget controller
            var newItem=budgetCtrl.addItem(input.type, input.description, input.value);
      
            //3.Add the item to UI
            UICtrl.addListItem(newItem, input.type);
      
            //4.Clear input fields
            UICtrl.clearFields();
      
            //5.updating budget
            updateBudget();
            
          //6.updating percentages
          updatePercentages();
      }
      
  };
  
  var ctrlDeleteItem=function(event){
      var itemID;
      
      itemID= event.target.parentNode.parentNode.parentNode.parentNode.id;
      console.log(itemID);
      
      if(itemID){
          
          splitID = itemID.split('-');
          type= splitID[0];
          ID=parseInt(splitID[1]);
          
          //1. Delete item from data structure
          budgetCtrl.deleteItem(type,ID);
          
          //2. Delete item from UI
          UICtrl.deleteListItem(itemID);
          
          //3. Update and show the new budget
          updateBudget();
          
          //4.update percentages
          updatePercentages();
      }
  };
    
  var updatePercentages=function(){
        
      // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
        
        // 2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();
        
        // 3. Update the UI with the new percentages
        console.log(percentages);calculating perce
      
  };

  return{
      init: function(){
          setupEventListener();
      }
  }

})(budgetController,UIController);

controller.init();