const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  const client = new sdk.Client();

  // You can remove services you don&apos;t use
  const database = new sdk.Databases(client);
  const users = new sdk.Users(client);

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

  if (event_data?.["userId"]) {
    const user_account = await users.get(event_data["userId"]);

    console.log(user_account);

    const user_rec = await database.listDocuments(
      req.variables["APPWRITE_FUNCTION_DATABASE_ID"],
      req.variables["APPWRITE_FUNCTION_USER_COLLECTION_ID"],
      [sdk.Query.equal("email", user_account["email"])]
    );

    if (user_rec?.documents?.length > 0) {
      return res.json({
        message: "User account already present in custom collection",
      });
    }

    const response = await database.createDocument(
      req.variables["APPWRITE_FUNCTION_DATABASE_ID"],
      req.variables["APPWRITE_FUNCTION_USER_COLLECTION_ID"],
      sdk.ID.unique(),
      {
        id: event_data["userId"],
        name: user_account["name"],
        email: user_account["email"],
        profile_pic: "",
        created_at: event_data["$createdAt"],
      }
    );

    res.json({
      message: "User account stored in users collection",
      record: response,
    });
  } else {
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
  }
};
