#pragma strict


var damping = 6.0;
var Spawn : Transform;
var NavLayer : LayerMask; 
var SearchRadius : int;
var Speed = 2.5;

function Start () {
    getDestination(transform.position);
}

function LerpPosition (start, end : Vector3, Speed : float) {
    var t = 0.0;
    var rate = 1.0/Vector3.Distance(start, end) * Speed;
    while (t < 1.0) {
        t += Time.deltaTime * rate;
        transform.position = Vector3.Lerp(start, end, Mathf.SmoothStep(0.0, 1.0, t));

        var rotation = Quaternion.LookRotation(end - transform.position);
        transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * damping);

        yield;
    }
    getDestination(transform.position);
    
}

function getDestination(curDest) : IEnumerator {

    var nextDest;
    var hit : RaycastHit;
    var layerMask = 1 << 8;
    layerMask = ~layerMask;

    var allNodes : Collider [];
    var activeNodes : Collider [];  
    allNodes = Physics.OverlapSphere(curDest, SearchRadius, NavLayer);

    var tempArray : Array = new Array();

    for ( var thisCollider : Collider in allNodes ) {
        var lineOfSight = Physics.Linecast(transform.position, thisCollider.transform.position, hit, layerMask); // maybe sure we have line of sight to node
        // var targetLocation = Vector3.Dot(thisCollider.transform.position, transform.position);
        // var inFront = targetLocation > 0 ? false : true;

        var directionToTarget = transform.position - thisCollider.transform.position;
        var targetAngle = Vector3.Angle(transform.forward, directionToTarget);
        var inFront = Mathf.Abs(targetAngle) < 30 ? false : true;

        
        if(Vector3.Distance(transform.position, thisCollider.transform.position) > 2 && !lineOfSight && inFront) { 
            tempArray.Push(thisCollider);      
        }
    }
    print("Node list is :"+tempArray.length);
    
    if(tempArray.length == 0) {
        print("no nodes");
    }else{
        activeNodes = tempArray.ToBuiltin(Collider);   

        var RandNode = Random.Range(0, activeNodes.length);

        nextDest = activeNodes[RandNode].transform.position;
        yield LerpPosition (curDest, nextDest, Speed);
    }
}













