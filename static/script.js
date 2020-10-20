
function displayCourses(){
  fetch('/api/courses')
  .then(
      function(response){ 
         
          response.json().then(function(data){
        
            for(let i=0; i<data.length;i++){
              let obj=data[i];
              div=document.getElementById('courseAndSubjDiv');
              p=document.createElement('p');
      
              subject=document.createTextNode(obj.subject+" ");
              course=document.createTextNode(obj.className);
              p.appendChild(subject);
              p.appendChild(course);
          
              div.appendChild(p);
          }
        
          
      });
    }
  )

.catch(function(error){
console.log("Error:", error);
  });

}


function searchForCourses(){
  var subjectC=document.getElementById('subj').value;
 
  fetch('/api/courses/'+subjectC)
  .then(
      function(response){
        if(response.status!==200){
          div2=document.getElementById('courseDiv');
          perror=document.createElement('p');
          errortxt=document.createTextNode("Not a valid subject code");
          perror.appendChild(errortxt);
          div2.appendChild(perror);
        }
        
          response.json().then(function(data){
            if(data.length>20){
              div2=document.getElementById('courseDiv');
              perror2=document.createElement('p');
              errortxt2=document.createTextNode("Please enter a valid subject code");
              perror2.appendChild(errortxt2);
              div2.appendChild(perror2);  
            }
            else{
            for(let i=0; i<data.length;i++){
              let obj=data[i];
              div2=document.getElementById('courseDiv');
              p2=document.createElement('p');
              course2=document.createTextNode(obj);
              p2.appendChild(course2);
              div2.appendChild(p2);
          }
        }
          
      });
    }
  )

.catch(function(error){
console.log("Error:", error);
  });
}
