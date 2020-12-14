var albumBucketName = "placeexplorer";
var bucketRegion = "us-east-1";
var IdentityPoolId = "us-east-1:2a86ba5a-280d-4c46-ae39-38a98441eea0";
var fileName
AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

var s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: albumBucketName }
});


function addPhoto() {
  var albumName = "adsfdasf"
  var files = document.getElementById("exampleFormControlFile1").files;
  // console.log(files[0].name)
  if (!files.length) {
    return alert("Please choose a file to upload first.");
  }
  var file = files[0];
  fileName = file.name;
  console.log(file.size/1024)
  var re = /(?:\.([^.]+))?$/;
  var suffix = re.exec(fileName)[1]

  if(!myMarker){
    return alert("Please Pick a Location on the Map.")
  }


  if (suffix != "jpg" && suffix != "png"){
    return alert("Unsupported File Extension (Only JPG or PNG).")
  }

  if (checksession()){
    var albumPhotosKey = encodeURIComponent(albumName) + "/";

    var photoKey = fileName;

    // Use S3 ManagedUpload class as it supports multipart uploads
    var upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: albumBucketName,
        Key: photoKey,
        Body: file,
        ACL: "public-read"
      }
    });

    var promise = upload.promise();

    promise.then(
      function(data) {
        alert("Successfully uploaded photo.");
        setTimeout(() => {sendmessage()}, 500);
      },
      function(err) {
        return alert("There was an error uploading your photo: ", err.message);
      }
    );
  }
  else{
    return alert("Session Expired Please Login Again.")
  }
}


document.getElementById('upload').addEventListener('click', addPhoto);

