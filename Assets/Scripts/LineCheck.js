#pragma strict

var Node2 : Transform;

// var ignoreLayer : LayerMask;  //.NameToLayer("NavPoints");
var showDebug = true;


var hit : RaycastHit;

function OnDrawGizmosSelected () {
	var layerMask = 1 << 8;
	 layerMask = ~layerMask;




	if(Physics.Linecast (transform.position, Node2.transform.position, hit, layerMask)){ 
		Gizmos.color = Color.red;
		Gizmos.DrawLine(transform.position, Node2.transform.position);
		print(hit.collider.name);
	}else{
		Gizmos.color = Color.green;
		Gizmos.DrawLine(transform.position, Node2.transform.position);
	}

}