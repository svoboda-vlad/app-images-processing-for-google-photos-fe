# Images processing for Google Photos - Front End Angular (app-images-processing-for-google-photos-fe)

Warning: client only. Use REST API from backend [app-images-processing-for-google-photos-be](https://github.com/svoboda-vlad/app-images-processing-for-google-photos-be) project.
You need to start backend server before starting frontend application.

## Live demo (hosted on GitHub pages)

[https://svoboda-vlad.github.io/app-images-processing-for-google-photos-fe](https://svoboda-vlad.github.io/app-images-processing-for-google-photos-fe)

## Running the project

On local machine:

```
ng serve

ng serve --configuration=staging
```

In Vagrant box:

```
ng serve --host 0.0.0.0
```

Local development: [http://localhost:4200](http://localhost:4200)

## Development environment
## Node.js + Angular CLI installation

```
sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g @angular/cli
```

## Creating a new Angular project

```
ng new images-processing-for-google-photos --routing --style scss --prefix ipfgp
cd images-processing-for-google-photos
```

## GitHub Pages deployment

```
ng build --output-path docs --base-href "https://svoboda-vlad.github.io/app-images-processing-for-google-photos-fe/"
cp docs/index.html docs/404.html
git add .
git commit -m "GitHub pages deployment"
git push origin master
```
