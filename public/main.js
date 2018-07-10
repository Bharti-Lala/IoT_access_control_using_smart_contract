$(document).ready(function(){

    $('#btn-signup').click(function (event){
        event.preventDefault(); 
        $.ajax({
            type: 'POST',
            url:"http://127.0.0.1:5000/addAgent",
            headers: {
                "content-type":"application/x-www-form-urlencoded"
            },  
            data: {
                "agentname": $('#name').val(),
                "password":  $('#password').val(),
            },
            success: function (data){
                console.log("data: ", data);
            }
        })
        console.log(" pass:  " + $('#password').val() + " User: "+ $('#name').val()  )
    });


    $('#btn-login').click(function (event){
        event.preventDefault(); 
        $.ajax({
            type: 'POST',
            url:"http://127.0.0.1:5000/loginagent",
            headers: {
                "content-type":"application/x-www-form-urlencoded"
            },
            data: {
                "agtaddr": $('#login-useraddr').val(),
                "pass":  $('#login-password').val()
            },
            success: function (data){
                console.log("data: ", data);
                alert(JSON.stringify(data));
                // if(data == true)
                    window.location.href = "dash.html";
            }
        })
    });

        $('#requestaccess').click(function (event){
            event.preventDefault(); 
            $.ajax({
                type: 'POST',
                url:"http://127.0.0.1:5000/reqtoken ",
                headers: {
                    "content-type":"application/x-www-form-urlencoded"
                },
                data: {
                    "agentaddr": $('#ag_ad').val(),
                    "agentname": $('#ag_n').val(),
                    "agentorg":  $('#ag_org').val(),
                    "gasunit":  $('#gas').val(),
                    "duration":  $('#ag_dur').val(),
                    "index": $('#ar_ind').val(),
                },
                success: function (data){
                    console.log("data: ", data);
                    // alert(JSON.stringify(data));
                    // window.location.href = "dash.html";
                }
            })
        });
    $('#getagent').click(function(event){
        event.preventDefault();
        
        let data;

        $.ajax({
            type: 'POST',
            url:"http://127.0.0.1:5000/agent",
            header: {
                "content-type":"application/x-www-form-urlencoded"
            },
            data: {
                    "addr" : $("#ag_ad").val()
            },
            success: function (data){
                    console.log(data);
                    $("#displayMobile").show();
                    $('#name').html(data[0]); 
                    $('#addr').html(data[1]); 
                    $('#org').html(data[2]); 
                    $('#dur').html(data[3]); 
                    $('#val').html(data[4]); 
                    $('#ind').html(data[5]); 
            },
            error: function (err){
                console.log(err);
            }
        })
    })


})
