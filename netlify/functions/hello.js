exports.handler = async (event, context) => {
    const { name = "Anonymous" } = event.queryStringParameters;
    const { instagram = "Anonymous" } = event.queryStringParameters;
    const { youtube = "Anonymous" } = event.queryStringParameters;
    const { twitch = "Anonymous" } = event.queryStringParameters;
    const { reddit = "Anonymous" } = event.queryStringParameters;
    const { twitter = "Anonymous" } = event.queryStringParameters;
    const { region = "Anonymous" } = event.queryStringParameters;
    const { quanitty = "Anonymous" } = event.queryStringParameters;


    return {
      statusCode: 200,
      body: `
      Hello, ${name},
      yt, ${youtube},
      tw, ${twitch},
      ig, ${instagram},
      red, ${reddit},
      tw, ${twitter},
      reg, ${region}
      quant, ${quanitty}
      `

    };
  };