# User Slack Status YouTrack App

YouTrack App that extends the user card area with data fetched from Slack.

### Build
1. Run `npm i`
2. Run `npm build`

### Upload to YouTrack
> **Note**  
>This command is useful for the continuous app changes delivery to YouTrack during the development.
1. Create a [YouTrack token](https://www.jetbrains.com/help/youtrack/cloud/manage-permanent-token.html#obtain-permanent-token)
2. Save the token and the YouTrack host to env: `export YOUTRACK_TOKEN=<your_token> && export YOUTRACK_HOST=<host>`
3. Run `npm run upload`

### Create App Package
Run `npm run pack`

Now you can find a ZIP file in the root of the project. It's an App that you can [upload to YouTrack](https://www.jetbrains.com/help/youtrack/devportal-apps/apps-quick-start-guide.html#add-app-to-youtrack).

After the app is installed, open the App Admin UI and specify the App Settings. Note, the Slack Token is a required settings to start the app.