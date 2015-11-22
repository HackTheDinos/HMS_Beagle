var authData;



     window.addEventListener('WebComponentsReady', function(e) {
         console.log(window.location);
         ref.onAuth(function(authDataparm) {
             console.log('xxx', authDataparm);
             if (authDataparm) {
                 authData = authDataparm;
                 console.log('authData', authData);
                 if (authData.provider === 'facebook') {
                     document.getElementById('account-x').innerHTML =
                         '<img width="30" src="' + authData.facebook.profileImageURL + '"><br>' +
                         '<input type="button" value="Logout" onclick="logout()" /><br>' +
                         authData.facebook.displayName;
                     setConfig(authData.uid, authData.facebook.displayName);
                 } else {
                     alert('else case');
                     setConfig(authData.uid);
                     document.getElementById('account-x').innerHTML =
                         '<input type="button" value="Logout" onclick="logout()" /> - ' + authData.uid;
                 }


             } else {
                 //console.log("Client unauthenticated.");
                 //alert("Client unauthenticated.");
                 resetlogin();
                 //document.getElementById('account-x').innerHTML = '<input type="button" value="Login" onclick="login()" />&nbsp;' + '<input type="button" value="Login (google)" onclick="loginGoogle()" />';

             }
         });

         ref.child('config').on('value', function(snapshotconfig) {
             //console.log(authData,snapshotconfig.val());
             var div = document.getElementById('games-pending');
             div.innerHTML = '';
             var str = '<br>';
             if (snapshotconfig && snapshotconfig.val() !== null && typeof snapshotconfig.val() !== 'undefined') {
                 var snapshotconfig = snapshotconfig.val();
                 for (var item in snapshotconfig) {
                     //str += (JSON.stringify(snapshotconfig[item])+'<hr>'); 

                     if (authData && authData.uid !== null && authData.uid !== item) {
                         str += (
                             '<a href="#" onclick="DinoGame.app.startGame(\'' + item + '\',\'' + authData.uid + '\');">Game-' + snapshotconfig[item].name + '</a>' +
                             //'uid: ' + item +
                             //' name: ' + snapshotconfig[item].name +
                             '<br>');
                     }

                 }
                 div.innerHTML = str;
             }
         });
     });

function logout(){
ref.unauth();
}


function login(){
ref.authWithOAuthPopup('facebook', function(error, authDataparm) {
  if (error) {
    alert("Login Failed! (authWithOAuthPopup-facebook)", error);
  } else {
    //console.log("Authenticated successfully with payload:", authData);
    authData = authDataparm;
  }
});
}


function setConfig(uid,displayName){
var object = {
    "created": Firebase.ServerValue.TIMESTAMP
}
if (displayName) {
  object['name'] = displayName;
}

  ref.child('logins').child(authData.uid).push(object);
  ref.child('config').child(authData.uid).update(object);
}
