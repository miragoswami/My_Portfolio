const getContact = (req,res)=>{
    const contact = {
        email : "miragoswami686@gmail.com",
        phone : "+91 9455941410",
      }
    res.json(contact);
};

module.exports = { getContact };


// { getContact } is object destructuring syntax in JavaScript, 
// and in your Express code it is used when exporting/importing the controller function.