
async function quickstart() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: './APIKey.json'
    });

    // Performs label detection on the image file
    const [result] = await client.labelDetection('./pepsi.jpg');
    const labels = result.labelAnnotations;

    let ar = new Array();
    ar = labels;
    let r = "recycle";
    let c = "compost";

    let maps = new Map([["metal", r], ["plastic", r], ["glass",r], ["aluminum", r], ["tin", r], ["food", c], ["paper", c], ["cardboard", r], ["fruit", c], ["coffee filter", c], ["vegetable", c], ["plant", c], ["tea bag", c]]);    

    for(let i=0; i < ar.length; i++){
        let st = ar[i].description;

        for(let [k, v] of maps)
        {
            if(st.toLowerCase().includes(k)){
                return v;
            }
        }
    }

}


  let output = quickstart();
  output.then(function(result){
      console.log(result);
  })

  exports.garbage = quickstart;