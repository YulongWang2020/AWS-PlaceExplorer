var username;
var password;
var personalname;
var poolData;
		
function registerButton() {

	personalnamename =  document.getElementById("personalnameRegister").value;	
	username = document.getElementById("emailInputRegister").value;

	if (document.getElementById("passwordInputRegister").value != document.getElementById("confirmationpassword").value) {
		alert("Passwords Do Not Match!")
		throw "Passwords Do Not Match!"
	} else {
		password =  document.getElementById("passwordInputRegister").value;	
	}

	poolData = {
			UserPoolId : 'us-east-1_mx8Jv9yFB', // Your user pool id here
			ClientId : '4q1ecjligv40bck1mgeha1noh5' // Your client id here
		};		
	var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

	var attributeList = [];

	var dataEmail = {
		Name : 'email', 
		Value : username, //get from form field
	};

	var dataPersonalName = {
		Name : 'name', 
		Value : personalname, //get from form field
	};

	var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
	var attributePersonalName = new AmazonCognitoIdentity.CognitoUserAttribute(dataPersonalName);


	attributeList.push(attributeEmail);
	attributeList.push(attributePersonalName);

	userPool.signUp(username, password, attributeList, null, function(err, result){
		if (err) {
			alert(err.message || JSON.stringify(err));
			return;
		}
		cognitoUser = result.user;
		console.log('user name is ' + cognitoUser.getUsername());
		//change elements of page
		var div = document.createElement("div");
        div.setAttribute('class', "form-group")
        div.setAttribute('id', "otpverify")
        document.getElementById("registerform").appendChild(div);

        var input = document.createElement("input");
        input.setAttribute('type', "text")
        input.setAttribute('class', "form-control")
        input.setAttribute('id', "otptextinput")
        input.setAttribute('placeholder',"Check email for OTP code")

        document.getElementById("otpverify").appendChild(input);

        var confirmbutton = document.createElement("button")
        confirmbutton.setAttribute('type', "button")
        confirmbutton.setAttribute('id', "confirm")
        confirmbutton.setAttribute('class', "btn btn-primary")
        confirmbutton.setAttribute('style', "margin-bottom:10px")
        confirmbutton.innerHTML = 'Comfirm OTP'
        document.getElementById("registerform").appendChild(confirmbutton);
        document.getElementById('confirm').addEventListener('click', verify);
	
	});
}


function verify(){
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
	var ConfirmationCode = document.getElementById("otptextinput").value
	console.log(ConfirmationCode)
	var params = {
	  ClientId: '4q1ecjligv40bck1mgeha1noh5',
	  ConfirmationCode: ConfirmationCode, 
	  Username: username, 
	};
	cognitoidentityserviceprovider.confirmSignUp(params, function(err, data) {
	  if (err){
	   console.log(err, err.stack);
	   alert(err) // an error occurred
	}
	  else{
	  console.log(data);           // successful response
	  $('#signupmodal').modal('hide');
      setTimeout(() => {$('.modal-backdrop').remove()}, 500)
  	}
	});
}

document.getElementById('register').addEventListener('click', registerButton);