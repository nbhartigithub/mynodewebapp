const express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(express.json());

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const courses = [
  {courseId: 1, courseName : 'Finance'},
  {courseId: 2, courseName : 'Economics'},
  {courseId: 3, courseName : 'Quantum Physics'}
];

let courseCount = 3;

app.get('/api/courses',(req,res) => {
  res.send('<html><body>Warm Welcome to mywebapp. <br/> Check out our courses <a href="/api/courses/getAll">here</a> !!</body></html>');
});


app.get('/api/courses/getAll',(req,res) => {
  let html = '<html><head> <script> function deleteCourse(cid) { document.courseDeleteForm.courseToBeDeleted.value = cid; document.courseDeleteForm.submit();} </script>  </head><body>  <div>Select your courses:<br/><form name="courseDeleteForm" method="POST" action="/api/removeCourse" ><ul>'
  html += '<input type ="hidden" name="courseToBeDeleted"/>'
  for(let i = 0; i < courses.length; i++) {
      html += '<li>' + courses[i].courseName + '&nbsp;<input type="button" name="DeleteCourse" value="Delete" onClick="deleteCourse(\'' + courses[i].courseId + '\')" /></li>';
  }
  html += '</ul> </form> </div>'
  html +=  '<form name="courseAdd" method="POST" action="/api/addCourse"'
  html += '<table>'
  html += '<tr><td>CourseName</td><td><input type="text" name="courseName" /></td></tr>'
  html += '<tr><td colspan="2"><input type ="Submit" value="Add New Course"/></td></tr>'
  html += '</table></form></body></html>';
  res.send(html);
});

app.post('/api/courses', (req,res) => {
  const newcourse = {
    //courseId: courses.length + 1,
    courseId: courseCount + 1,
    courseName: req.body.courseName
  };
  courses.push(newcourse);
   res.send(newcourse);
});

app.post('/api/addCourse', urlencodedParser, (req,res) => {
  const newcourse = {
    courseId: courses.length + 1,
    courseName: req.body.courseName
  };
  courses.push(newcourse);
  res.redirect("/api/courses/getAll")
});


app.post('/api/removeCourse', urlencodedParser, (req,res) => {
   let courseToBeDeleted = parseInt(req.body.courseToBeDeleted);
   console.log('courseToBeDeleted:' + courseToBeDeleted);
   deleteCourse(courseToBeDeleted);
   res.redirect("/api/courses/getAll")
});

function deleteCourse(idToBeDeleted) {
  console.log('Inside deleteCourse..arg=' + idToBeDeleted);
  for( var i = 0; i < courses.length; i++){ 
    console.log('iterating id:' + courses[i].courseId);
    if ( courses[i].courseId === idToBeDeleted) { 
      console.log('Found course to be deleted:' + courses[i].courseName);
      courses.splice(i, 1); }
    }
}



//PORT setting
const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port : ${port}`));