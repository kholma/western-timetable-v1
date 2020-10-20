const express=require('express');
const app=express();
const router=express.Router();
const storage=require("node-persist");
 
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

function getTimetable1(subjectCo,courseCo,courseComp){
var timeEntry1=[];
for(let i=0;i<courses.length;i++){
    if(courses[i].subject==subjectCo&&courses[i].catalog_nbr==courseCo&&courses[i].course_info[0].ssr_component==courseComp){
        timeEntry1.push({
            days: courses[i].course_info[0].days,
            start_time: courses[i].course_info[0].start_time,
            end_time: courses[i].course_info[0].end_time,
            ssr_component: courses[i].course_info[0].ssr_component});
    }
}
return timeEntry1;
}

function getTimetable2(subjectCo,courseCo){
    var timeEntry2=[];
for(let i=0;i<courses.length;i++){
    if(courses[i].subject==subjectCo&&courses[i].catalog_nbr==courseCo){
        timeEntry2.push({
            days: courses[i].course_info[0].days,
            start_time: courses[i].course_info[0].start_time,
            end_time: courses[i].course_info[0].end_time,
            ssr_component: courses[i].course_info[0].ssr_component});
    }
}
return timeEntry2;
}





app.use('/',express.static('static'));


router.get('/',(req,res)=>{
    let courses=getSubjectAndClass();
    res.send(courses);

});

router.get('/:course_subject',(req,res)=>{
    const sub=req.params.course_subject;
    var matchingCourses=getCourses(sub);
    if((matchingCourses.length)!=0){
        res.send(matchingCourses);
    } 
    else{
        res.status(404).send('This subject is not found.');
    }
    
});

router.get('/:course_subject/:course_code/:course_component',(req,res)=>{
const subCode1=req.params.course_subject;
const courseCode1=req.params.course_code;
const courseComponent=req.params.course_component;
var timetableEntry1=getTimetable1(subCode1,courseCode1,courseComponent);
if((timetableEntry1.length)!=0){
    res.send(timetableEntry1);
}
else{
    res.status(404).send('Error-one of the entered fields does not exist');
}

});

router.get('/:course_subject/:course_code',(req,res)=>{
    const subCode2=req.params.course_subject;
    const courseCode2=req.params.course_code;
    var timetableEntry2=getTimetable2(subCode2,courseCode2);
    if((timetableEntry2.length)!=0){
        res.send(timetableEntry2);
    }
    else{
        res.status(404).send('Error-one of the entered fields does not exist');
    }
    
    });



app.use('/api/courses',router);



const port=process.env.PORT || 3000;
app.listen(port, ()=>console.log("Listening on port ${port}..."));