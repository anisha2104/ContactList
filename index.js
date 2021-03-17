const express=require('express');
const path=require('path');
const port=8000;


const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));




//middelware1
// app.use(function(req,res,next){
//     console.log("MW 1 Called");
//     next();
// });


var contactList=[
    {
        name:"Anisha", 
        phone:"9999999999"
    },
    {
        name:"Akhil",
        phone:"8888888888"
    },
    {
        name:"Mamta",
        phone:"7777777777"
    },
    {
        name:"Arvind",
        phone:"6666666666"
    }
]

app.get('/',function(req,res){
    //console.log(__dirname);
    //res.send("<h1>Cool,It is running!</h1>");

    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching data from db');
            return;
        }

    return res.render('home',{
        title:"Contacts List",
        contact_list:contacts
    });
});
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"Let us play woth ejs"
    });
});

app.post('/create_contact',function(req,res){
    //return res.redirect('/practice');
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    // return res.redirect('/');

    //contactList.push(req.body);

    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){console.log('Erre on creating a contact'); 
        return;}
        console.log('**********',newContact);
        return res.redirect('back');
    });
    
});


app.get('/delete-contact/',function(req,res){
    // let phone=req.query.phone;
    // let contactIndex=contactList.findIndex(contact=>contact.phone==phone);
    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    // }
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
        console.log('error in deleting from db');
        return;
    }
    return res.redirect('back');
});
});


app.listen(port,function(err){
    if(err){
        console.log('Error in running the server',err);
    }
    console.log("Yup! My Express Server is running on port: ",port);
});