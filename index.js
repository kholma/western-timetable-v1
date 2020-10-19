const express=require('express');
const app=express();
const router=express.Router();

const fs=require('fs');
let courseData=fs.readFileSync('Lab3-timetable-data.json');
let courses=JSON.parse(courseData);

function getSubjectAndClass(){
    var subjectAndClass=courses.map(function(e){
        return{
            subject: e.subject,
            className: e.className

        };
    });
    return subjectAndClass;
}

function getCourses(subjectSearch){
    var courseMatch=[];
for(let i=0;i<courses.length;i++){
    if(courses[i].subject==subjectSearch){
        courseMatch.push(courses[i].catalog_nbr);
    }
}
    return courseMatch;

}

app.use('/',express.static('static'));


router.get('/',(req,res)=>{
    let courses=getSubjectAndClass();
    res.send(courses);

});

router.get('/:course_subject',(req,res)=>{
    const subj=req.params.course_subject;
    var matchingCourses=getCourses(subj);
    if((matchingCourses.length)!=0){
        res.send(matchingCourses);
    } 
    else{
        res.status(404).send('This subject is not found.');
    }
    
});

app.use('/api/courses',router);

const port=process.env.PORT || 3000;
app.listen(port, ()=>console.log("Listening on port ${port}..."));