

$('#login_Btn').click(function(e){
    e.preventDefault();
    //console.log("hello")
    let login_Username = $("#login_Username").val();
    let login_Password = $('login_Password').val();

    // uses this to create key value send the storage

    let particulars = {
        "name": login_Username;
        "password":login_Password;        
    }




})