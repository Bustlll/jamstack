exports.handler = async (event, context) => {
    const { name = "Anonymous" } = event.queryStringParameters;
    return {
      statusCode: 200,
      body: `

      <form id="my-form" autocomplete="off" > 
      <input type="text" name="name" id="name" placeholder="name">
      <input type="text" name="instagram" id="instagram" placeholder="instagram">
      <input type="text" name="youtube" id="youtube" placeholder="youtube">
      <input type="text" name="twitch" id="twitch" placeholder="twitch">
      <input type="text" name="reddit" id="reddit" placeholder="reddit">
      <input type="text" name="twitter" id="twitter" placeholder="twitter">
      <input type="text" name="region" id="region" placeholder="region">
      <input type="submit" />
      </form>

      </br>

      Hello, ${name}`
    };
  };