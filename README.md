# React.js skills assessment test

## Assignment

Your task is to create onepage application with list of clients and their
details. Clients data are stored in 'clients.json' which will be loaded
dynamicaly via XHR.

## Wireframe description:
* **Clients list:** Every item will display smaller avatar (in
	json there is only one avatar size, so feel free to resize it). Next to the
	avatar there will be clients name and job title. When user clicks on
	an item, it will display client's details on the right.
* **Search:** Above this list there will be search bar. It will search
	all informations, not only those showed in the clients list. Results will
	be displayed instead of list of clients and they will show instantly
	as user starts to type.
* **Client's details:** Pretty self-explanatory, on the left there
	will be full size avatar (128x128px), next to it big clients name,
	smaller job title and company name ("{job.title} - {job.company}") below
	this name. Next there will be all other clients informations like
	address, and contact informations.


## Stack (frameworks, build tools, ...)

* Plain javascript (no coffescript, typescript, …), but you can use es6
	(e.g. with babel)
* Use react.js
* Possible to use FLUX-ish stuff, like redux, but you don't have to
* You can use any other open source library like lodash, or underscore,
	as long as it is not anything similiar to frameworks mentioned above
* Build tool of your choice (grunt, gulp, npm scripts or none at all).
	Feel free to use any downloadable skeleton you like as long as you
	understand how it works.
* Modularity, use tool of your choice ( require.js, browserify, ...)
* CSS framework of your choice (bootstrap, pure, material design
	fws...)
* CSS and HTML preprocessors of your choice (jade, slim, haml, sass,
	stylus, ...)
* git (don't forget to pack .git and .gitignore in your package before
	you send your solution)



#### Demo: https://necinc.github.io/simple-react-app

![UI](http://i.imgur.com/2nlF7io.png)
