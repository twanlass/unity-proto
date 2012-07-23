#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter (other : Collider) {
	if(other.name == "BadGuy"){
		var cops = GameObject.FindWithTag ("Cop");
		cops.SendMessage("disengage");
	}
}