const sdk = require("node-appwrite");
require("dotenv").config();

// Init SDK
const client = new sdk.Client();

const databases = new sdk.Databases(client);
const storage = new sdk.Storage(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(process.env.PROJECT_ID) // Your project ID
  .setKey(process.env.API_KEY); // Your secret API key

create_database_setup();

async function create_database_setup() {
  console.log("Creating formvibe database...");
  const form_vibe_database = await databases.create(
    sdk.ID.unique(),
    "formvibe"
  );
  console.log("Created formvibe database successfully");

  const database_id = form_vibe_database.$id;

  // Now create collections
  console.log("Creating formvibe required collections and indexes...");
  const users_collection_id = await create_users_collection_setup(database_id);

  const forms_collection_id = await create_forms_collection_setup(database_id);
  const responses_collection_id = await create_responses_collection_setup(
    database_id
  );
  console.log("Created successfully");

  //   Create a storage bucket
  console.log("Creating bucket...");
  const bucket_id = await create_storage_setup();
  console.log("Created successfully...");

  console.log({
    DATABASE_ID: database_id,
    FORM_COLLECTION_ID: forms_collection_id,
    RESPONSE_COLLECTION_ID: responses_collection_id,
    USER_COLLECTION_ID: users_collection_id,
    BUCKET_ID: bucket_id,
  });
}

async function create_responses_collection_setup(database_id) {
  const responses_collection = await databases.createCollection(
    database_id,
    sdk.ID.unique(),
    "Responses",
    [
      sdk.Permission.create(sdk.Role.any()),
      sdk.Permission.read(sdk.Role.users()),
      sdk.Permission.create(sdk.Role.users()),
      sdk.Permission.update(sdk.Role.users()),
      sdk.Permission.delete(sdk.Role.users()),
    ]
  );

  //   create attributes
  const form_slug = await databases.createStringAttribute(
    database_id,
    responses_collection.$id,
    "form_slug",
    200,
    true
  );

  const form_elements = await databases.createStringAttribute(
    database_id,
    responses_collection.$id,
    "form_elements",
    50000,
    true
  );

  // create indexes
  const index_1 = await databases.createIndex(
    database_id,
    responses_collection.$id,
    "index_11",
    "key",
    ["form_slug"]
  );

  return responses_collection.$id;
}

async function create_forms_collection_setup(database_id) {
  const forms_collection = await databases.createCollection(
    database_id,
    sdk.ID.unique(),
    "Forms",
    [
      sdk.Permission.read(sdk.Role.users()),
      sdk.Permission.create(sdk.Role.users()),
      sdk.Permission.update(sdk.Role.users()),
      sdk.Permission.delete(sdk.Role.users()),
    ]
  );

  // create attributes
  const id_attribute = await databases.createStringAttribute(
    database_id,
    forms_collection.$id,
    "form_id",
    100,
    true
  );

  const name_attribute = await databases.createStringAttribute(
    database_id,
    forms_collection.$id,
    "form_name",
    200,
    false
  );

  const type_attribute = await databases.createEnumAttribute(
    database_id,
    forms_collection.$id,
    "form_type",
    ["Airtable", "Typeform"],
    true
  );

  const form_description = await databases.createStringAttribute(
    database_id,
    forms_collection.$id,
    "form_description",
    500,
    false
  );

  const form_icon = await databases.createStringAttribute(
    database_id,
    forms_collection.$id,
    "form_icon",
    200,
    false
  );

  const form_banner = await databases.createStringAttribute(
    database_id,
    forms_collection.$id,
    "form_banner",
    200,
    false
  );

  const form_columns = await databases.createStringAttribute(
    database_id,
    forms_collection.$id,
    "form_columns",
    50000,
    false
  );

  const created_on = await databases.createDatetimeAttribute(
    database_id,
    forms_collection.$id,
    "created_on",
    true
  );

  const created_by = await databases.createStringAttribute(
    database_id,
    forms_collection.$id,
    "created_by",
    200,
    true
  );

  //   Indexes
  const index_1 = await databases.createIndex(
    database_id,
    forms_collection.$id,
    "index_11",
    "key",
    ["created_by"]
  );

  const index_2 = await databases.createIndex(
    database_id,
    forms_collection.$id,
    "index_12",
    "key",
    ["form_id"]
  );

  const index_3 = await databases.createIndex(
    database_id,
    forms_collection.$id,
    "index_13",
    "key",
    ["created_by", "form_id"]
  );

  return forms_collection.$id;
}

async function create_users_collection_setup(database_id) {
  const user_collection = await databases.createCollection(
    database_id,
    sdk.ID.unique(),
    "users",
    [
      sdk.Permission.create(sdk.Role.any()),
      sdk.Permission.read(sdk.Role.users()),
      sdk.Permission.create(sdk.Role.users()),
      sdk.Permission.update(sdk.Role.users()),
      sdk.Permission.delete(sdk.Role.users()),
    ]
  );

  // Create attributes
  const id_attribute = await databases.createStringAttribute(
    database_id,
    user_collection.$id,
    "id",
    100,
    true
  );
  const email_attribute = await databases.createStringAttribute(
    database_id,
    user_collection.$id,
    "email",
    200,
    false
  );
  const profile_pic_attribute = await databases.createStringAttribute(
    database_id,
    user_collection.$id,
    "profile_pic",
    500,
    false
  );
  const name_attribute = await databases.createStringAttribute(
    database_id,
    user_collection.$id,
    "name",
    500,
    false
  );
  const created_at_attribute = await databases.createDatetimeAttribute(
    database_id,
    user_collection.$id,
    "created_at",
    true
  );

  //   Create indexes
  const user_index_1 = await databases.createIndex(
    database_id,
    user_collection.$id,
    "index_id",
    "key",
    ["id"]
  );

  const user_index_2 = await databases.createIndex(
    database_id,
    user_collection.$id,
    "index_email",
    "key",
    ["email"]
  );

  return user_collection.$id;
}

async function create_storage_setup() {
  const bucket = await storage.createBucket(
    sdk.ID.unique(),
    "formvibe",
    [
      sdk.Permission.read(sdk.Role.any()),
      sdk.Permission.read(sdk.Role.users()),
      sdk.Permission.create(sdk.Role.users()),
      sdk.Permission.update(sdk.Role.users()),
    ],
    false,
    true,
    3000000000,
    ["jpg", "png", "jpeg", "svg", "pdf", ".docx", ".doc", ".txt"],
    "none",
    true,
    true
  );

  return bucket.$id;
}
