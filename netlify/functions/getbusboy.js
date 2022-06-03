// netlify/functions/restaurantReservationEndpoint
module.exports.handler = async (event, context) => {
    const fields = await parseMultipartForm(event)
  
    fields.favourite_food // "sushi"  
    fields.company_logo   // { filename: "some_logo.svg", type: "image/svg+xml", content: Buffer([...]) }  
  }