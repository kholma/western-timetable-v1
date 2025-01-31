const express=require('express');
const app=express();
const BodyParser=require("body-parser");
const router=express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId=require('mongodb').ObjectID;
const CONNECTION_URL="mongodb+srv://kholma:Julianakh1!@schedules.2mubj.mongodb.net/Schedules?retryWrites=true&w=majority";
const DATABASE_NAME="Schedules";
const client = new MongoClient(CONNECTION_URL, { useNewUrlParser: true,useUnifiedTopology:true });
var database;
var collection;
var i=0;

const {check, validationResult}=require('express-validator');


app.use('/api',router);
app.use('/',express.static('static'));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));


MongoClient.connect(CONNECTION_URL,{useNewUrlParse:true,useUnifiedTopology:true},(error,client)=>{
    if(error){
        throw error;
    }
    database=client.db(DATABASE_NAME);
    collection=database.collection("scheds");
    console.log("Connected to " +DATABASE_NAME);
});



 router.use(express.json());

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


router.get('/courses',(req,res)=>{
    let courses=getSubjectAndClass();
    res.send(courses);

});

router.get('/courses/:course_subject',(req,res)=>{
    const sub=req.params.course_subject;
    var matchingCourses=getCourses(sub);
    if((matchingCourses.length)!=0){
        res.send(matchingCourses);
    } 
    else{
        res.status(404).send('This subject is not found.');
    }
    
});

router.get('/courses/:course_subject/:course_code/:course_component',(req,res)=>{
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

router.get('/courses/:course_subject/:course_code',(req,res)=>{
    const subCode2=req.params.course_subject;
    const courseCode2=req.params.course_code;
    var timetableEntry2=getTimetable2(subCode2,courseCode2);
    if((timetableEntry2.length)!=0){
        res.send(timetableEntry2);
    }
    else{
        res.status(404).send('Error:one of the entered fields does not exist');
    }
    
    });

    function getTT(schcrses){
        var timeEntry3=[];
        for(let j=0;j<schcrses.length;j++){
        for(let i=0;i<courses.length;i++){
            if(courses[i].subject==schcrses[j].subjectCode&&courses[i].catalog_nbr==schcrses[j].courseCode){
                
                timeEntry3.push({
                    subject:courses[i].subject,
                    course: courses[i].catalog_nbr,
                    days: courses[i].course_info[0].days,
                    start_time: courses[i].course_info[0].start_time,
                    end_time: courses[i].course_info[0].end_time,
                    ssr_component: courses[i].course_info[0].ssr_component});
            }
        }
    }
        return timeEntry3;
        
    }
    
    router.get('/scheds/:schedule_name',(req,res)=>{
    const schedName=req.params.schedule_name;
    var ans;
    if(i==0){
        res.status(404).send("Error: No schedules exist");
    }
    else{
    collection.find({"name":schedName}).forEach(function(x){
    
    
        ans=getTT(x.courses);
            
            res.status(200).send(ans);
        
    
    });
    }
    
    });

router.put('/scheds/:schedule_name/:sched_subj/:sched_courses',[
    check('sName').matches(/^([0-9A-Za-z\u00AA-\uFFDC]*)$/).trim().isLength({min:1,max:20}).escape(),
    check('schedSubjects').matches(/^([0-9A-Za-z\u00AA-\uFFDC]*)$/).trim().isLength({min:1,max:20}).escape(),
    check('schedCourses').matches(/^([0-9A-Za-z\u00AA-\uFFDC]*)$/).trim().isLength({min:1,max:20}).escape()
], (req,res)=>{
var sName=req.params.schedule_name;
var schedSubjects=req.params.sched_subj;
var schedCourses=req.params.sched_courses;

var arrayToPut=[];
var subCodeArr=schedSubjects.split(',');
var courseCodeArr=schedCourses.split(',');

for(let i=0;i<subCodeArr.length;i++){
arrayToPut.push({subjectCode:subCodeArr[i],courseCode:courseCodeArr[i]});
}
collection.findOne({"name": sName}).then(result=>{
    if (result){
        collection.update(
            {"name": sName},
            {$set: {"courses":arrayToPut}});
        res.status(200).send("Successfully added courses");
    }
    else{
        res.status(404).send("Error: A schedule name entered does not exist");
    }

});
});

router.get('/scheds',(req,res)=>{
    var result=[];
    var first;
    var second;
    if(i==0){
res.status(404).send("Error: No schedules exist");
    }
    else{
    collection.find().forEach(function(x){
       first=x.name;
        second=x.courses.length;
        result.push({name:first,num:second});
         if(result.length==i){
             res.status(200).send(result);
         }
    });
}
    });
    


    

router.delete('/scheds/:schedule_name',(req,res)=>{
const scheduleName=req.params.schedule_name;
collection.findOne({"name": scheduleName}).then(result=>{
    if (result){
        collection.remove({"name":scheduleName});
        i--;
        res.status(200).send("Deleted successfully");
    }
    else{
        res.status(404).send("The schedule doesn't exist");
    }

});
});

router.delete('/scheds',(req,res)=>{
collection.remove();
i=0;
res.status(200).send("Deleted all schedules successfully");
});

router.post('/scheds/:schedule_name',[
    check('name').trim().matches(/^([0-9A-Za-z\u00AA-\uFFDC]*)$/).trim().isLength({min:1,max:20}).escape()
],(req,res)=>{
    
    var name=req.params.schedule_name;
    collection.findOne({"name": name}).then(result=>{
        if (result){
            res.status(404).send("Error: Schedule with this name already exists");
        }
        else{
            collection.insertOne({"name": name,"courses":[" "]})
            i++;
            res.status(200).send("Success");
            
        }
    });
  });

const port=process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Listening on port ${port}...");
    
    
});