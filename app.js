var Clarifai = require('./clarifai_node.js');

var stdio = require('stdio');

Clarifai.initAPI("AxMwLCzK9lAlmPJsQjxobZ3MZbw1NJKxtrien4l8","Ot4UN3pkCG3VPWwoSQ4pbfRPXWvUVWV9sgVpu8xL");

unction commonResultHandler( err, res ) {
	if( err != null ) {
		if( typeof err["status_code"] === "string" && err["status_code"] === "TIMEOUT") {
			console.log("TAG request timed out");
		}
		else if( typeof err["status_code"] === "string" && err["status_code"] === "ALL_ERROR") {
			console.log("TAG request received ALL_ERROR. Contact Clarifai support if it continues.");				
		}
		else if( typeof err["status_code"] === "string" && err["status_code"] === "TOKEN_FAILURE") {
			console.log("TAG request received TOKEN_FAILURE. Contact Clarifai support if it continues.");				
		}
		else if( typeof err["status_code"] === "string" && err["status_code"] === "ERROR_THROTTLED") {
			console.log("Clarifai host is throttling this application.");				
		}
		else {
			console.log("TAG request encountered an unexpected error: ");
			console.log(err);				
		}
	}
	else {
		if( opts["print-results"] ) {
			// if some images were successfully tagged and some encountered errors,
			// the status_code PARTIAL_ERROR is returned. In this case, we inspect the
			// status_code entry in each element of res["results"] to evaluate the individual
			// successes and errors. if res["status_code"] === "OK" then all images were 
			// successfully tagged.
			if( typeof res["status_code"] === "string" && 
				( res["status_code"] === "OK" || res["status_code"] === "PARTIAL_ERROR" )) {

				// the request completed successfully
				for( i = 0; i < res.results.length; i++ ) {
					if( res["results"][i]["status_code"] === "OK" ) {
						console.log( 'docid='+res.results[i].docid +
							' local_id='+res.results[i].local_id +
							' tags='+res["results"][i].result["tag"]["classes"] )
					}
					else {
						console.log( 'docid='+res.results[i].docid +
							' local_id='+res.results[i].local_id + 
							' status_code='+res.results[i].status_code +
							' error = '+res.results[i]["result"]["error"] )
					}
				}

			}
		}			
	}
}

function exampleTagSingleURL() {
	var testImageURL = 'http://assets.worldwildlife.org/photos/946/images/story_full_width/forests-why-matter_63516847.jpg?1345534028';
	var ourId = "forest_1"; // this is any string that identifies the image to your system

	// Clarifai.setRequestTimeout( 100 ); // in ms - expect: force a timeout response
	// Clarifai.setRequestTimeout( 100 ); // in ms - expect: ensure no timeout 

	Clarifai.tagURL( testImageURL , ourId, commonResultHandler );
}


