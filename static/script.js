
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

function getTimetable(){
  var subc=document.getElementById('subjectCode').value;
  var coursec=document.getElementById('courseCode').value;
  var coursecomp=document.getElementById('courseComponent').value;
  if(coursecomp==null){
    fetch('/api/courses/'+subc+'/'+coursec)
    .then(
        function(response){
          if(response.status!==200){
            div3=document.getElementById('timetableDiv');
            perror2=document.createElement('p');
            errortxt2=document.createTextNode("Enter valid codes.");
            perror2.appendChild(errortxt2);
            div3.appendChild(perror2);
          }
          
            response.json().then(function(data){
              
              for(let i=0; i<data.length;i++){
                let obj=data[i];
                div3=document.getElementById('timetableDiv');
                p3=document.createElement('p');
                ttcomp=document.createTextNode(obj.ssr_component+" ");
                ttday=document.createTextNode(obj.days+" ");
                stime=document.createTextNode(obj.start_time+"-");
                etime=document.createTextNode(obj.end_time);
                p3.appendChild(ttday);
                p3.appendChild(ttcomp);
                p3.appendChild(stime);
                p3.appendChild(etime);
                div3.appendChild(p3);
            }
          
            
        });
      }
    )
  
  .catch(function(error){
  console.log("Error:", error);
    });





  }
  else{
  
  fetch('/api/courses/'+subc+'/'+coursec+'/'+coursecomp)
  .then(
      function(response){
        if(response.status!==200){
          div3=document.getElementById('timetableDiv');
          perror2=document.createElement('p');
          errortxt2=document.createTextNode("Enter valid codes.");
          perror2.appendChild(errortxt2);
          div3.appendChild(perror2);
        }
        
          response.json().then(function(data){
            
            for(let i=0; i<data.length;i++){
              let obj=data[i];
              div3=document.getElementById('timetableDiv');
              p3=document.createElement('p');
              ttcomp=document.createTextNode(obj.ssr_component+" ");
              ttday=document.createTextNode(obj.days+" ");
              stime=document.createTextNode(obj.start_time+"-");
              etime=document.createTextNode(obj.end_time);
              p3.appendChild(ttday);
              p3.appendChild(ttcomp);
              p3.appendChild(stime);
              p3.appendChild(etime);
              div3.appendChild(p3);
          }
        
          
      });
    }
  )

.catch(function(error){
console.log("Error:", error);
  });
}

 
}

function createSched(){
var scnm=document.getElementById('sch').value;
var url='/api/scheds/'+scnm;
if(scnm==""){
  scdiv=document.getElementById('crschDiv');
  scp=document.createElement('p');
  sctxt=document.createTextNode("Please enter a schedule name");
  scp.appendChild(sctxt);
  scdiv.appendChild(scp);
}
else{
fetch(url, {method:'POST', body:{"name":scnm}})
.then(
  function(response){
    if(response.status!==200){
      scdiverror=document.getElementById('crschDiv');
      scperror=document.createElement('p');
      sctexterror=document.createTextNode("Schedule already exists.");
      scperror.appendChild(sctexterror);
      scdiverror.appendChild(scperror);
      return;
    }
    else{
      scdiv=document.getElementById('crschDiv');
      scp=document.createElement('p');
      sctxt=document.createTextNode("Successfully created schedule");
      scp.appendChild(sctxt);
      scdiv.appendChild(scp);
      
    }
  }
)
.catch(function(error){
  console.log("Error:", error);
    });

}
}