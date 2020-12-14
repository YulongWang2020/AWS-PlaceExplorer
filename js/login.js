
function signInButton() {
    
	var authenticationData = {
        Username : document.getElementById("inputUsername").value,
        Password : document.getElementById("inputPassword").value,
    };
	
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    
    var poolData = {
        UserPoolId : 'us-east-1_mx8Jv9yFB', // Your user pool id here
        ClientId : '4q1ecjligv40bck1mgeha1noh5' // Your client id here
    };
	
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
	
    var userData = {
        Username : document.getElementById("inputUsername").value,
        Pool : userPool,
    };
	
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
	cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            alert("Login Succeed")
			var accessToken = result.getAccessToken().getJwtToken();
			console.log(accessToken);	
            $('#signinmodal').modal('hide');
            setTimeout(() => {$('.modal-backdrop').remove()}, 500)
        },

        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },
    });
  }

  document.getElementById('login').addEventListener('click', signInButton);