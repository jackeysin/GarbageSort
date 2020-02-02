
async function quickstart(arr) {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: './APIKey.json'
    });

    // Performs label detection on the image file
    const [result] = await client.labelDetection(arr);
    const [lresult] = await client.logoDetection(arr);
    const labels = result.labelAnnotations;
    const logos = lresult.logoAnnotations;
    
    let ar = new Array();
    ar = labels;

    let logoarr = new Array();
    logoarr = logos;
   
    let r = "recycle";
    let c = "compost";  
    let l = "landfill"
   
    let maps = new Map([["metal", r], ["plastic", r], ["glass",r], ["aluminum", r], ["tin", r], ["food", c], ["paper", c], ["cardboard", r], ["fruit", c], ["coffee filter", c], ["vegetable", c], ["plant", c], ["tea bag", c], ["drinkware", r], ["cloth", r], ["linen", r]]);

    if(logoarr.length > 0){
        return r;
    }
    
   for(let i=0; i < ar.length; i++){
       let st = ar[i].description;

        for(let [k, v] of maps)
        {
            if(st.toLowerCase().includes(k)){
                return v;
            }
        }
    }
    return l;

}

  let output = quickstart('./tshirt.jpg');
  output.then(function(result){
      console.log(result);
  })

  exports.garbage = quickstart;