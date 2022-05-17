var redirectTimeoutId = window.setTimeout(redirectToHomepage, 120000)

function redirectToHomepage() {
    window.location.href = process.env.SUCCESS_URL; // or whatever your homepage would be
  }



