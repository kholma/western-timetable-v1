
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
  let display=[];
  var letters1=/^[0-9A-Za-z\u00AA-\uFFDC]+$/;
  
       if(subjectC.search(letters1)){
         alert("Please enter a valid input.");
 return true;
     }
     
    
 
  fetch('/api/courses/'+subjectC)
  .then(
      function(response){
        if(response.status!==200){
          div2=document.getElementById('courseDiv');
          perror=document.createElement('p');
          errortxt=document.createTextNode("Not a valid subject code");
          perror.appendChild(errortxt);
          div2.appendChild(perror);
          return;
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

  let display=[];
  var letters2=/^[0-9A-Za-z\u00AA-\uFFDC]+$/;     
   if(subc.search(letters2)){
         alert("Please enter a valid input.");
 return true;
     }
     if(coursec.search(letters2)){
      alert("Please enter a valid input.");
return true;
  }
  if(coursecomp.search(letters2)){
    alert("Please enter a valid input.");
return true;
}
     
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
            return;
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

                if(obj.ssr_component=="LEC"){
                  p3.setAttribute('class','lectureC');
                }
                if(obj.ssr_component=="LAB"){
                  p3.setAttribute('class','labC');
                }
                else{
                  p3.setAttribute('class','tutorialC');
                }
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
          return;
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
  clearDiv=document.getElementById('crschDiv');

  while(clearDiv.firstChild){
    clearDiv.removeChild(clearDiv.firstChild);
  }

var scnm=document.getElementById('sch').value;

let display=[];
var letters3=/^[0-9A-Za-z\u00AA-\uFFDC]+$/;     
if(scnm.search(letters3)){
    alert("Please enter a valid input.");
return true;
}

let url='/api/scheds/'+scnm;
if(scnm==""){
  scdiverror=document.getElementById('crschDiv');
  scperror=document.createElement('p');
  sctxterror=document.createTextNode("Please enter a schedule name.");
  scperror.appendChild(sctxterror);
  scdiverror.appendChild(scperror);
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
  
    }
    else{
      scdiv=document.getElementById('crschDiv');
      scp=document.createElement('p');
      sctxt=document.createTextNode("Successfully created schedule.");
      scp.appendChild(sctxt);
      scdiv.appendChild(scp);
      
    }
  })
.catch(function(error){
  console.log("Error:", error);
    });

}
}

function addSchedCourses(){
  clearDiv=document.getElementById('addcrsesDiv');
  while(clearDiv.firstChild){
    clearDiv.removeChild(clearDiv.firstChild);
  }
  
  var scnm1=document.getElementById('sch1').value;
  var schedsubj=document.getElementById('scsubCode').value;
  var schedcrses=document.getElementById('sccourseCode').value;

  
  let display=[];
  var letters4=/^[0-9A-Za-z\u00AA-\uFFDC]+$/;     
   if((scnm1.search(letters4))){
         alert("Please enter a valid input.");
 return true;
     }

 
  if((scnm1=="")||(schedcrses=="")||(schedsubj=="")){
    scdiverror=document.getElementById('addcrsesDiv');
    scperror=document.createElement('p');
    sctxterror=document.createTextNode("Please enter valid inputs.");
    scperror.appendChild(sctxterror);
    scdiverror.appendChild(scperror);
  }
else{

let url1='/api/scheds/'+scnm1+'/'+schedsubj+'/'+schedcrses;
fetch(url1, {method:'PUT'})
.then(
  function(response){
    if(response.status!==200){
      scdiverror=document.getElementById('addcrsesDiv');
      scperror=document.createElement('p');
      sctexterror=document.createTextNode("Schedule doesn't exist.");
      scperror.appendChild(sctexterror);
      scdiverror.appendChild(scperror);
    }
    else{
      scdiv=document.getElementById('addcrsesDiv');
      scp=document.createElement('p');
      sctxt=document.createTextNode("Successfully added courses to the schedule.");
      scp.appendChild(sctxt);
      scdiv.appendChild(scp);
    }




  })
  .catch(function(error){
    console.log("Error:", error);
      });

}
}

function getSchedCourses(){
  clearDiv=document.getElementById('getcrsesDiv');
  while(clearDiv.firstChild){
    clearDiv.removeChild(clearDiv.firstChild);
  }
  var scnm2=document.getElementById('sch2').value;
  if(scnm2==""){
    scdiverror=document.getElementById('getcrsesDiv');
    scperror=document.createElement('p');
    sctxterror=document.createTextNode("Please enter a schedule name.");
    scperror.appendChild(sctxterror);
    scdiverror.appendChild(scperror);
  }
  else{
    fetch('/api/scheds/'+scnm2)
.then(
  function(response){
    if(response.status!==200){
      scdiverror=document.getElementById('getcrsesDiv');
      scperror=document.createElement('p');
      sctexterror=document.createTextNode("Error: No schedules exist.");
      scperror.appendChild(sctexterror);
      scdiverror.appendChild(scperror);
    }
    else{
      response.json().then(function(data){
      
          if(data[0]==" "){
          scdiv=document.getElementById('getcrsesDiv');
          scp=document.createElement('p');
          sctxt=document.createTextNode("No courses are saved in this schedule.");
          scp.appendChild(sctxt);
          scdiv.appendChild(scp);

          }
          else{
            for(let i=0; i<data.length;i++){
              let obj=data[i];
              div3=document.getElementById('getcrsesDiv');
              p3=document.createElement('p');
              ttsubj=document.createTextNode(obj.subject);
              ttcourse=document.createTextNode(obj.course);
              ttcomp=document.createTextNode(obj.ssr_component+" ");
              ttday=document.createTextNode(obj.days+" ");
              stime=document.createTextNode(obj.start_time+"-");
              etime=document.createTextNode(obj.end_time);
              p3.appendChild(ttsubj);
              p3.appendChild(ttcourse);
              p3.appendChild(ttday);
              p3.appendChild(ttcomp);
              p3.appendChild(stime);
              p3.appendChild(etime);
              div3.appendChild(p3);
          }
            
          }
    
      
  });
    }
  })
  .catch(function(error){
    console.log("Error:", error);
      });




  }
}
function deleteSched(){
  clearDiv=document.getElementById('deleteSchedDiv');
   while(clearDiv.firstChild){
     clearDiv.removeChild(clearDiv.firstChild);
   }
 
   var scnm3=document.getElementById('sch3').value;
   let url4='/api/scheds/'+scnm3;
   if(scnm3==""){
     scdiverror=document.getElementById('deleteSchedDiv');
     scperror=document.createElement('p');
     sctxterror=document.createTextNode("Please enter a schedule name.");
     scperror.appendChild(sctxterror);
     scdiverror.appendChild(scperror);
   }
   else{
 fetch(url4, {method:'DELETE'})
 .then(
   function(response){
     if(response.status!==200){
       scdiverror=document.getElementById('deleteSchedDiv');
       scperror=document.createElement('p');
       sctxterror=document.createTextNode("Error: Schedule doesn't exist.");
       scperror.appendChild(sctxterror);
       scdiverror.appendChild(scperror);
     }
     else{
       scdiv=document.getElementById('deleteSchedDiv');
       scp=document.createElement('p');
       sctxt=document.createTextNode("Schedule has been deleted.");
       scp.appendChild(sctxt);
       scdiv.appendChild(scp);
 
 
 }
 
   })
   .catch(function(error){
     console.log("Error:", error);
       });
   }
 }


function deleteAllScheds(){
  clearDiv=document.getElementById('deleteAllSchedsDiv');
  while(clearDiv.firstChild){
    clearDiv.removeChild(clearDiv.firstChild);
  }

let url4='/api/scheds';
fetch(url4, {method:'DELETE'})
.then(
  function(response){
    if(response.status!==200){
      scdiverror=document.getElementById('deleteAllSchedsDiv');
      scperror=document.createElement('p');
      sctexterror=document.createTextNode("Error.");
      scperror.appendChild(sctexterror);
      scdiverror.appendChild(scperror);
    }
    else{
      scdiv=document.getElementById('deleteAllSchedsDiv');
      scp=document.createElement('p');
      sctxt=document.createTextNode("Successfully deleted all schedules.");
      scp.appendChild(sctxt);
      scdiv.appendChild(scp);
    }
  })
  .catch(function(error){
    console.log("Error:", error);
      });
}


function getNumCoursesinAllScheds(){
  clearDiv=document.getElementById('numCoursesEachSchedDiv');
  while(clearDiv.firstChild){
    clearDiv.removeChild(clearDiv.firstChild);
  }
fetch('/api/scheds')
.then(
  function(response){
    if(response.status!==200){
      scdiverror=document.getElementById('numCoursesEachSchedDiv');
      scperror=document.createElement('p');
      sctexterror=document.createTextNode("Error: No schedules exist.");
      scperror.appendChild(sctexterror);
      scdiverror.appendChild(scperror);
    }
    else{
      response.json().then(function(data){
        
        for(let i=0; i<data.length;i++){
          let obj=data[i];
          scdiv=document.getElementById('numCoursesEachSchedDiv');
          scp=document.createElement('p');
  
          scName=document.createTextNode(obj.name+" ");
          scNum=document.createTextNode(obj.num);
          scp.appendChild(scName);
          scp.appendChild(scNum);
      
          scdiv.appendChild(scp);
      }
    
      
  });
    }
  })
  .catch(function(error){
    console.log("Error:", error);
      });




}

    


