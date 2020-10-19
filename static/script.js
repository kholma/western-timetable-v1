
function displayCourses(){
  fetch('/api/courses')
  .then(
      function(response){ 
         
          response.json().then(function(data){
              display(data);
          
      });
    }
  )

.catch(function(error){
console.log("Error:", error);
  });

}

function display(json){
    for(var i=0; i<json.length;i++){
        var obj=json[i];
        div=document.getElementById('courseDiv');
        p=document.createElement('p');

        subject=document.createTextNode(obj.subject+" ");
        course=document.createTextNode(obj.className);
        p.appendChild(subject);
        p.appendChild(course);
    
        div.appendChild(p);
    }
}
