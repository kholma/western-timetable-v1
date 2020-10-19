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
app.use('/',express.static('static'));


router.get('/',(req,res)=>{
    let courses=getSubjectAndClass();
    res.send(courses);

});

app.use('/api/courses',router);

const port=process.env.PORT || 3000;
app.listen(port, ()=>console.log("Listening on port ${port}..."));