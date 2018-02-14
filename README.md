This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

I suggest having Node version 8.8.1 installed and NPM version 5.6.0. If you  are new to Node, you can get started [here](https://nodejs.org/en/download/).

After cloning the repo, run `npm install` to install dependencies. Use `npm start` to start the project.

You'll need to get an Google maps API key in order to run this project. Please consult Google's docs [here](https://developers.google.com/maps/documentation/javascript/get-api-key).

Create a json file in `src` directory called `credentials.json`. It should look like this:
```
{
  "googleMapsKey": "YOUR MAGIC KEY"
}
```

This index file of this project is of course `index.js`. It pulls in all necessary components and renders them to the DOM. Namely, the App. The App holds the entire state of the application, and passes necessary data to children components (list, map, pagination).

All network call info lives inside the `src/app/trips_model.js`. We use `axios` to make the client-side network calls, which return Promises which are lovely pattern to use in JavaScript.

Most React components are self documenting. You can always look for propTypes to see what kind of arguments the component is expecting. We pass default props so as not to throw a breaking exception for props that are not required.

Inside registerServiceWorker we would add caching to create a Progressive Web App.

In terms of styles, you can import css files.  I use the BEM (body, element, modifier) convention where useful.

I assumed that all trips are same day. We would want to indicate the date if they were not.

In terms of improving this project, I would look into the following items:

1) caching responses from network calls in localStorage. No need to hit the api for data we already have.
2) serverside render and routing. This would get content on the page more quickly. And routing would make navigating the site more fluid for users and search bots :).
3) In terms of UI, I would improve the appearance of the infoboxes that appear on clicking a marker. I went back and forth about this.
4) A great feature to add would be a clock with hands you can control with left and right arrow keys or dragging with the mouse. It would only show the stops made for a particular trip that occured before the time
5) make it usable on mobile devices. Ran out of time for that, but it would be fun to make it work for mobile users.
6) add a filter by route feature. I saw you can filter by route easily with the api.
7) better indication of starting and ending terminals.
8) normalize the api response data upon receiving them. I am runnign the same moment transformations in a couple of places, but that can all happen in a single place.



