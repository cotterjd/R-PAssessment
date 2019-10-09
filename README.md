# R&P Assessment 

This app displays missions by Space X. It has a <a href="https://github.com/cotterjd/rp_ui">frontend build with React 16.8.6</a>. It's backend is powered by Postgres, GraphQL, and Prisma hosted on a Ubuntu Digital Ocean droplet. It's live at http://space-x.cotterslist.com. 

## Installation (Linux)

To run this app locally you will need docker, docker-compose, and the prisma cli <br />
`$ curl -fsSL https://get.docker.com -o get-docker.sh`<br />
`$ sudo sh get-docker.sh`<br />
`$ sudo curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose`<br />
`$ sudo npm install -g prisma`

## Start Server

`$ git clone git@github.com:cotterjd/RP_assessment.git`<br />
`$ cd RP_assessment`<br />
`$ (cd db && prisma deploy)`<br />
`$ npm run start-prisma`<br />
`$ (cd api && npm install && npm start)`<br />
<a href="https://github.com/cotterjd/rp_ui/blob/gh-pages/README.md">start the ui</a>


## Deploy 

To deploy this, you will need access to the server. Once your user has been created and your public key has been added to the server you can run `npm run deploy` followed by your server password. 
