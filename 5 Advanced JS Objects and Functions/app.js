/*var Person=function(name, birthYear, job){
    this.name=name;
    this.birthYear=birthYear;
    this.job=job;
}

Person.prototype.calcAge=function(){
    console.log(2019-this.birthYear);
};

var john=new Person('John',1980,'Manager');
var max=new Person('Max',1985,'Instructor');

console.log(john);
console.log(max);

john.calcAge();
max.calcAge();*/

//Object.create
/*var personProto={
    calcAge:function(){
        console.log(2019-this.birthYear);
    }
};

var jonas=Object.create(personProto);
jonas.name='Jonas';
jonas.birthYear=1985;
jonas.job='Instructor';

var john=Object.create(personProto,
{
    name:{value: 'John'},
    birthYear:{value: 1980},
    job:{value:'Manager'}
});

jonas.calcAge();
john.calcAge();*/

//primtives vs datatypes

//changing objects
var obj1={
    name:'Jonas',
    age:30
};


var obj2=obj1;
obj1.name='John';

console.log(obj1);
console.log(obj2);

//changing variablles
var a,b;
a=10,b=20;

function changeVal(num_1,num_2){
    num_2=num_1;
}

changeVal(a,b);
console.log(a+' '+b);







