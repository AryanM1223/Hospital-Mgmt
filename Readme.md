# JEEVAN backend:

## Steps to run:

1. Open **CMD/Powershell** in Root Directory.
2. Make sure to get the config.env file from the drive link provided in the group description on the WhatsApp group and paste it in config folder.
3. Run command **`npm install`**
4. Run command **`npm run dev`**
5. The backend service will be live at http://localhost:6000

## Steps for setting up Git on your system:

1. Install Git bash on your system.
2. open cmd on your system and type the following:
    1. `git config --global user.name "Your Name"`
    2. `git config --global user.email "youremail@example.com"`
    ***Make Sure that the email you use is the same one you have on your GitHub account***

## Steps to commit your code on any repo:
1. Save all your changes using `Ctrl + S`.
2. Open terminal and type `git checkout -b "branchName"`(NO WHITE SPACES).
3. Type `git add .` if you want to push all your changes 
                        OR
    Type `git add 'name'`(replace name with the file or folder you changed like patientController etc.)
4. Type `git commit -m "Yur commit message about what changes you did"`.
5. Type `git push` and press enter and it will give you an error.
6. In the error you will see something like *git remote add origin https://github.com/username/repository.git*
7. Copy Paste and press Enter.
8. Then go to the repository on GitHub and create a PR.


NOTE: Please configure prettier on your VScode for JS project.