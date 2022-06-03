// netlify/functions/restaurantReservationEndpoint


import Busboy from 'busboy'

function parseMultipartForm(event) {
  return new Promise((resolve) => {
    // we'll store all form fields inside of this
    const fields = {};

    // let's instantiate our busboy instance!
    const busboy = Busboy({headers: Object.keys(headers).reduce((newHeaders, key) => {
        newHeaders[key.toLowerCase()] = headers[key];
        return newHeaders;
    }, {})})


    // before parsing anything, we need to set up some handlers.
    // whenever busboy comes across a file ...
    busboy.on(
      "file",
      (fieldname, filestream, filename, transferEncoding, mimeType) => {
        // ... we take a look at the file's data ...
        filestream.on("data", (data) => {
          // ... and write the file's name, type and content into `fields`.
          fields[fieldname] = {
            filename,
            type: mimeType,
            content: data,
          };
        });
      }
    );

    // whenever busboy comes across a normal field ...
    busboy.on("field", (fieldName, value) => {
      // ... we write its value into `fields`.
      fields[fieldName] = value;
    });

    // once busboy is finished, we resolve the promise with the resulted fields.
    busboy.on("finish", () => {
      resolve(fields)
    });

    // now that all handlers are set up, we can finally start processing our request!
    busboy.write(event.body);
  });
}


module.exports.handler = async (event, context) => {
    const fields = await parseMultipartForm(event)
  
    fields.favourite_food // "sushi"  
    fields.preorder_for   // { filename: "some_logo.svg", type: "image/svg+xml", content: Buffer([...]) }  
  }