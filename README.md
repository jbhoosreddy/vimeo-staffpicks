# Vimeo Staff Picks Application

[Vimeo Staff Picks](https://vimeo-staffpicks.herokuapp.com/)

##### Applicant: Jaideep Bhoosreddy @jbhoosreddy ([github](https://github.com/jbhoosreddy) | [twitter](https://twitter.com/jbhoosreddy))

#### Set up

 - `npm install`
 - `npm run start`

#### Introduction

I made this application in React. Initially, I was planning to use other libraries like Redux (possibly Immutable, etc.) but I noticed that I didn't really need a global store
to track the state of the application for the features that it had so I decided to remove them. Component bound methods worked fine for me.

I did decide to set up this application using Webpack (with HMR). I probably could have gone with something simpler. But I had never tried it out before (Browserify works for most of my usecases) so I decided to take a stab at it here. I hope that's alright.
Also you will notice that there is Bootstrap CSS included in this project. I didn't actually use Bootstrap. But it does some nice initialization on basic DOM elements and helps standardize the feel across browsers. Again, hope that's alright. The more complicated CSS was written by myself.

So `BEM methodology`. To be honest, I was not familiar with this. I tried to incorporate this into my CSS but I don't think I leveraged the whole "BEM" methodology. Something so useful, can't believe I didn't hear about it. But for the sake of this project, I tried to incorporate it as best as I could, given time constraints that I had.

Also, my build set up previously had different configs for development and production, but I did not want it to break on someone else's system, so I removed it, for now.

One of the things I also wanted to focus on was Keyboard Shortcuts for accessibility:

 - `Space`: Play/Pause video.
 - `Shift+/`: Toggle theatre mode.
 - `Control+Shift+LeftArrow`: Play previous video
 - `Control+Shift+RightArrow`: Play next video
 - `Shift+RightArrow`: Get previous videos list.
 - `Shift+LeftArrow`: Get next videos list.

#### Was the question/problem clear? Did you feel like something was missing or not explained correctly?

For me the problem/question was clear enough. The way I approached the given problem was work with what I knew and keep coming back to the directions to make sure I did not veer off too much from the given instructions.

#### How much time did you spend on each part: understanding, designing, coding, testing?

I worked on this project in-between other responsibilities and I did not keep track of my initial workflow. I worked on this roughly on two days and off the total time spent on the problem, I would say that I spent time on this
 
 - 10% - understanding
 - 30% - coding
 - 40% - designing
 - 19% - testing (Tested on Chrome Nightly and Firefox Nightly)
 - 1%  - writing this README
  
I am relatively better at coding than designing, and so it took me more time on the designing aspect of the challenge. Generally, whenever I'm working on a team for a product, I'm used to working with a UX designer and we iterate over the solution. For this challenge, I took Vimeo as my own style guide to ensure that the application, at the very least worked well together, cohesively.
There are many things to be taken care of in the designing part of the challenge. responsiveness of the video, of the column, floating buttons, etc. Making sure everything worked as I expected them to was necessary.
 
#### What would you have done differently if you have more time or resources?
 
If I had more time, I would actually try out Vue and Polymer also to see which one of these most fit my functional requirements. I went ahead with React simply because I was highly familiar with it's API so I didn't have to spend a lot of time on the implementation.
Also, I did not write tests for my application. I did a lot of manual testing, but it'd have been nice if I could have given some time to write tests so that I could detect feature breaking changes on future modifications.
I would have also liked to spend even more time on testing the UX of this application. I did however get some friends to look over it for suggestions (I hope that is okay.)
  
#### Are there any bottlenecks with your solution? if so, what are they and what can you do to fix them/minimize their impact?

I would say the biggest bottleneck is actually making those API calls for the videos. Initially, I was working with the sample feed given to me. Which loaded very fast.
Then however, I created a dev account to access the authenticated API, which took more time to load. (and turns out, had a different schema from the sample feed).
I added information of the screen to inform users that their information is being loaded. I would have like to use localStorage to cache the data in the browser. But have a leasing mechanism so that old caches are replaced. This way, at least if the user wants to see the list of previous videos, it would not require an AJAX call. Maintaining some of this in-memory in the Component state would also work.
But the videos in the feed are changing and I did not want to provide them stale information. The best way would have probably been to actually store the next and previous list of videos behind the scenes so that it looks faster from the users point of view.
If the API could break, I'd like to be able to switch to a fallback endpoint.

In my opinion, here's the nicest way to do this. Improve the server to act as a proxy to the Vimeo API endpoint. Alternatively, for separation of concerns, I could create a separate layer to act as the proxy that manages caches. This would help scalability as we could add more servers to the pool if the requests keep increasing.
Moreover, improve the server architecture to create a persistent socket connection (socket.io, for this application) between the server and the client. The server could initially respond with a hash for the resource being requested. The client could compare that with the hash in its own in-memory of local storage cache. And if it is the same, serve local data, else request from the server. Because now there is multiple requests, having a persistent connection would reduce connection overhead. Another improvement would be to use the Service Workers API to move this logic to it's own worker and it could handle everything from caching to updating information held in the state. If I'm not wrong, there is also a way to render dom components in the service worker (but I'm not sure on that). And on the server side, it could use memcached for high performance caching.
Something like [Apache Traffic Server](http://trafficserver.apache.org/) looks like it would be very useful in this situation.

#### How would the system scale for more users/visitors?

It would probably not scale very well. For this project I set a simple dev-server with an /api endpoint which proxies to the Vimeo API. Two ways to solve this would be to either improve the server-side architecture to ensure/improve scalability. Or enable CORS request and call the Vimeo API directly from the application.

#### How would your solution cope if the API was slow or broke or returned incorrect data?

If the API broke down or did not return an expected response, the application would render an error message for the user. There are also checks to validate the model of the properties it is rendering in the DOM.
The application is bottlenecked on the API, so it were very slow, I'd implement some sort of caching mechanism to keep the application user-friendly.

#### Anything else you want to share about your solution or the problem?

So if I'm being honest, the time I spent on this project could be divided into 2 parts. 1) Coding the application, 2) Watching videos
I wonder if vimeo engineers face that dilemma.
As far as challenges go, I imagine everyone dreads them. But this one was cool, because after a certain point in making it, it just became so much more fun to add a feature and then try it out. Like making a dark-mode for the videos I'm watching. I simply put that in there because I wanted it.
In a way, I guess this is a pretty smart challenge as I got a sense of what my work could be, you know if I was working at Vimeo, and I liked it.
This is probably the first time a challenge has made me more excited about working somewhere.