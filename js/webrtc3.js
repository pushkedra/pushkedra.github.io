var PeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
var IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
var SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
navigator.getUserMedia = navigator.getUserMedia || navigator.mediaDevices.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

var pc; // PeerConnection


// Step 1. getUserMedia
navigator.getUserMedia(
  { audio: true, video: true },
  gotStream,
  function(error) { console.log(error) }
);

function gotStream(stream) {
  document.getElementById("callButton").style.display = 'inline-block';
  document.getElementById("localVideo").src = URL.createObjectURL(stream);

  pc = new PeerConnection(null);
  pc.addStream(stream);

  console.log(pc);

  pc.onicecandidate = gotIceCandidate;
  pc.onaddstream = gotRemoteStream;
}


// Step 2. createOffer
function createOffer() {
  pc.createOffer(
    gotLocalDescription,
    function(error) { console.log(error) },
    { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } }
  );
}


// Step 3. createAnswer
function createAnswer() {
  pc.createAnswer(
    gotLocalDescription,
    function(error) { console.log(error) },
    { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } }
  );
}


function gotLocalDescription(description){
  pc.setLocalDescription(description);
  sendMessage(description);
}

function gotIceCandidate(event){
  if (event.candidate) {
    sendMessage({
      type: 'candidate',
      label: event.candidate.sdpMLineIndex,
      id: event.candidate.sdpMid,
      candidate: event.candidate.candidate
    });
  }
}

function gotRemoteStream(event){
  document.getElementById("remoteVideo").src = URL.createObjectURL(event.stream);
}


////////////////////////////////////////////////
// Socket.io

var SIGNALING_SERVER = 'https://socketio-over-nodejs2.herokuapp.com:443/';
var channelName = location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');

var sender = Math.round(Math.random() * 999999999) + 999999999;
io.connect(SIGNALING_SERVER).emit('new-channel', {
  channel: channelName,
  sender: sender
});

// var socket = io.connect('', {port: 1234});
var socket = io.connect(SIGNALING_SERVER + channelName);

function sendMessage(message){

  console.log(message);

  socket.emit('message', message);
}

socket.on('message', function (message){
  if (message.type === 'offer') {
    pc.setRemoteDescription(new SessionDescription(message));
    createAnswer();
  }
  else if (message.type === 'answer') {
    pc.setRemoteDescription(new SessionDescription(message));
  }
  else if (message.type === 'candidate') {
    var candidate = new IceCandidate({sdpMLineIndex: message.label, candidate: message.candidate});
    pc.addIceCandidate(candidate);
  }
});
