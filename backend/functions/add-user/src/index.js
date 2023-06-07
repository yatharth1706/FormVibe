const sdk = require("node-appwrite");

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();

  // You can remove services you don't use
  const database = new sdk.Databases(client);

  if (
    !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
    !req.variables["APPWRITE_FUNCTION_API_KEY"]
  ) {
    console.warn(
      "Environment variables are not set. Function cannot use Appwrite SDK."
    );
  } else {
    client
      .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
      .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
      .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
      .setSelfSigned(true);
  }

  const event_data = JSON.parse(req.variables.APPWRITE_FUNCTION_EVENT_DATA);

  const response = await database.createDocument(
    req.variables["APPWRITE_FUNCTION_DATABASE_ID"],
    req.variables["APPWRITE_FUNCTION_USER_COLLECTION_ID"],
    sdk.ID.unique(),
    {
      id: event_data["$id"],
      name: event_data["name"],
      email: event_data["email"],
      profile_pic: "",
      created_at: event_data["$createdAt"],
    }
  );

  res.json({
    message: "User account stored in users collection",
    record: response,
  });
};