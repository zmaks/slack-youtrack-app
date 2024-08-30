# User Slack Status YouTrack App

YouTrack App that adds a Slack widget to user cards. The widget displays the user’s name and title, 
their current status, and includes a button that you can click to open a direct message in your Slack workspace.

[Open in JetBrains Marketplace](https://plugins.jetbrains.com/plugin/25175-slack-user-status)

---

### Build
1. `npm i`
2. `npm build`

### Upload to YouTrack
> **Note**  
>This command is useful for the continuous app changes delivery to YouTrack during the development.
1. Create a [YouTrack token](https://www.jetbrains.com/help/youtrack/cloud/manage-permanent-token.html#obtain-permanent-token)
2. Save the token and the YouTrack host to env: `export YOUTRACK_API_TOKEN=<your_token> && export YOUTRACK_HOST=<host>`
3. Run `npm run upload`

### Create App Package
Run `npm run pack`

Now you can find a ZIP file in the root of the project. It's an App that you can [upload to YouTrack](https://www.jetbrains.com/help/youtrack/devportal-apps/apps-quick-start-guide.html#add-app-to-youtrack).

After the app is installed, open the App Admin UI and specify the App Settings. Note, the Slack Token is a required settings to start the app.
