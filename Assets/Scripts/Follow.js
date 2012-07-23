#pragma strict

/*
This camera smoothes out rotation around the y-axis and height.
Horizontal Distance to the target is always fixed.

There are many different ways to smooth the rotation but doing it this way gives you a lot of control over how the camera behaves.

For every of those smoothed values we calculate the wanted value and the current value.
Then we smooth it using the Lerp function.
Then we apply the smoothed values to the transform's position.
*/

// The target we are following
var target : Transform;
var follow = true;
// The distance in the x-z plane to the target
var distance = 0;

// How much we 
var heightDamping = 2.0;
var rotationDamping = 3.0;

// Place the script in the Camera-Control group in the component menu
//@script AddComponentMenu("Camera-Control/Smooth Follow")

function Start() {
	trackTarget();
}

function trackTarget()
{
    while(true)
    {
    	engage();
        yield WaitForSeconds(.5);
    }
}

function engage() {
	if(Vector3.Distance(target.position, transform.position)<10){
		follow = true;
		distance = 9;
	}
}

function disengage() {
	distance = 124;
	follow = false;
}

function LateUpdate () {
	// print(follow);
	if (!follow)
		return;
	
	// Calculate the current rotation angles
	var wantedRotationAngle = target.eulerAngles.y;
		
	var currentRotationAngle = transform.eulerAngles.y;
	
	// Damp the rotation around the y-axis
	currentRotationAngle = Mathf.LerpAngle (currentRotationAngle, wantedRotationAngle, rotationDamping * Time.deltaTime);

	// Convert the angle into a rotation
	var currentRotation = Quaternion.Euler (0, currentRotationAngle, 0);
	
	// Set the position of the camera on the x-z plane to:
	// distance meters behind the target
	transform.position = target.position;
	transform.position -= currentRotation * Vector3.forward * distance;
	
	// Always look at the target
	transform.LookAt (target);
}