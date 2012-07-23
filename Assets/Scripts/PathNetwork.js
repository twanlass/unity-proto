#pragma strict

var Nodes : Collider[];
var NavLayer : LayerMask;  //.NameToLayer("NavPoints");
var SearchRadius : int =  20;
var stuff : Vector3 = Vector3(0,0,0);
var showDebug = true;

function Awake() {
	// Nodes = Physics.OverlapSphere(transform.position, SearchRadius, NavLayer);
}

function OnDrawGizmosSelected () {
	if(showDebug) {
		Gizmos.color = Color.green;
	    Gizmos.DrawWireSphere (transform.position, SearchRadius);
	}

	var layerMask = 1 << 8;
	layerMask = ~layerMask;

    Nodes = Physics.OverlapSphere(transform.position, SearchRadius, NavLayer);

	for (var i=0; i<Nodes.length; i++) {
		if(Vector3.Distance(transform.position, Nodes[i].transform.position) > 2){ // don't test against self
			var hit : RaycastHit;
			if(Physics.Linecast (transform.position, Nodes[i].transform.position, hit, layerMask)){ // line check - true means we hit something
				Gizmos.color = Color.red;
				Gizmos.DrawLine(transform.position, Nodes[i].transform.position);
			}else{
				Gizmos.color = Color.green;
				Gizmos.DrawLine(transform.position, Nodes[i].transform.position);
			}
		}	
			
	}
}