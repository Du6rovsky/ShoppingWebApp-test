# ShoppingWebApp-test
Single Page Internet Shopping Web App (Angularjs,nodejs,gulp,browserify,jade,less,bootstrap,HTML5/CSS3)

Recommended web-browser for app test : Google Chrome

Setup fo launch app :
- Install node.js(with npm)
- By terminal in app directory set : "npm install"
- Run ./node_modules/.bin/gulp.cmd - app starting(dev mode) for http://localhost:3003
- OR  by terminal in app directory set : "node server" - app starting(production mode) for http://localhost:3003

App have three pages : "/"(login), "/signup" and "/search".

"/search" page is available only for auth users.

Logout is remove all cart and orders local storage data for current user.

Default user is admin(email : admin@mail.com , pass: admin)
