# Front End Optimization

Use async script tags
Keep shared styles in a global css file instead of duplicating them into many css files
Remove uneccesary imports
Ensure UI/UX designer is sending you optimized assets, and svgs instead of images

Ensure there are no redundant http requests
Cache non sensitive data from api calls into local storage for quick reference
Work with api team to structure data to keep the number of http requests to a minimum
Use Lighthouse in chrome dev tools audit tab to audit performance, accessibility, SEO, and more

Use a front end framework which produces a minified build
Break application into feature modules and use lazy loading to load the assets for a feature only when the user visits that part of the application
If using Angular, set the router's preloading strategy to "preload" the lazily loaded routes for loading parts that are not yet requested but known to be necessary.
If using Angular, place Resolve guards on feature routes to pre-load assets prior to visiting those parts of the application

Basically load only what is needed when its needed

If using angular, you can switch the ChangeDetectionStrategy from default to OnPush for performace improvement. This will change the DOM from being repainted upon every user event or HTTP request to only updating if @Input references change, or an observable that's linked to an async pipe emits a new value. If using the OnPush change detection, you should enforce immutability of your data structures with the Immutable.js library, but this library doesn't support interfaces.
So switching to the change detection strategy is easy but using it is difficult. Personally, I would leave the ChangeDetectionStrategy as default and instead of having a giant monolithic front end, I'd recommend to split it into several micro front ends with no more than a couple of dozen components each. Angular 12 and newer makes it possible to scaffold such an architecture.

## Front End Security

Prevent cross-site scripting (XSS) attacks with form input validation, sanitizing user input
When doing DOM manipulation set textContent instead of innerHTML, to protect it from XSS
Dont use inline script tags in the html file. Use exteral js files.
In HTTP requests, set Content-Type to application/json, instead of text/html

Keep error generic, so "Incorrect Login Information" instead of "Your password is incorrect"
Disable autofill on sensitive form inputs

Set your front end's content security policy to only accept content from your backend
For every session of the user, the backend should send the client a random token upon successfull login. This token should be included as part of headers in every http request.
Store keys, auth tokens in environment files
Don't store sensitive data in browser storage

Don't allow the web app to be rendered in an iframe. Set "X-frame=Options": "DENY" to avoid clickjacking
Use Captcha at login, registration, and contact pages to help against DDoS attacks
When linking to external sites, set rel="noopener" or rel="noreferrer" attribute to prevent the destination website from accessing session tokens and database IDs
Split the public, authenticated, and admin parts of your application into seperate subdomains. So an attack on one isn't automatically comprising the other.

Audit imported packages and keep them upgraded. Run npm audit

XSS is a type of attack in which an attacker inputs a malicious script into the web application, which gets stored in the backend. When other users access the web application, since the browser does not know that it is malicious as it was served by the backend, this malicious script is executed.

# Cross browser compatability

Use a framework, as it will compile to a version of JS that most browsers will understand, and adds polyfills under the hood

Otherwise, for vanilla JS projects, you'll have to use ES5, have to watch what CSS your writing to see if its compatable in the target browser, and use polyfills. Use analytics for what browsers your users are mostly using.

# Accessibility

Ensure the html tags used are semantic rather than generic divs and spans. Use the right element for the right job.
Use labels for inputs, alt-text for images, aria roles, labels, properties, and states on html elements.
Use Firefox's Accessibility panel to see the dom tree viewable to screen readers.
Ensure the fonts, specs, and images supplied by the designer has good contrast
