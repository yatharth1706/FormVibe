![OgImage](https://github.com/yatharth1706/FormVibe/assets/32243289/de9f26d1-5caa-43d9-ae25-b8d217f73d13)

## Form Vibe - Create Forms With Ease
Interactive form desginer tool. Alternative of typeform and airtable, with interactive user interface to design forms and share them with users.
Provides built in drag and drop feature in the form builder which users can use to build forms in easy way and customize accordingly.

## Demo Video
https://youtu.be/FRMfz-3pbi0

## Features
- Create Forms using Interactive Form Builder
- Edit Form
- Share form with the unique form slug
- Share on social media platforms
- Preview form
- Choose templates to create form
- Collect responses from the user
- Manage your account
- Use AI to create forms automatically

## Roadmap
- Members Page for collaboration
- Integrations page
- Customizing form sharable link
- Attaching custom domain for sharing forms

## Tech Stack Used
- NextJS
- Appwrite
- Shadcn UI Components
- Lucide icons
- React DND for drag and drop
- Formik for forms
- Tailwind CSS

## Steps to run it locally
1. Clone the repository
```
git clone https://github.com/yatharth1706/FormVibe.git
cd FormVibe
```

2. Install all dependencies
```
npm install
```

3. Copy .env.example file to .env.local and replace all the values with your credentials
4. Three collections are also required in appwrite (Forms, users, Responses) and one bucket in storage. These steps are not automated yet. Will analyse it little more how i can automate these
5. Run the dev server
```
npm run dev
```







