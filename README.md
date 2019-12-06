# R&P Assessment 
(THIS APP IS NO LONGER LIVE)<br>
This app was developed on an Ubuntu machine with Atom and Firefox and tested on Chrome. It displays missions by Space X. It has a <a href="https://github.com/cotterjd/rp_ui/tree/master">frontend</a> built with React 16.8.6. It's backend is powered by Postgres, GraphQL, and Prisma hosted on a Ubuntu Digital Ocean droplet. It's UI is served through Github Pages(https://cotterjd.github.io/rp_ui) and it's backend is through Nginx(https://api.space-x.cotterslist.com). It's live at https://space-x.cotterslist.com, whose domain is managed by Namecheap. 

## Installing Prerequisites (Ubuntu)

To run this app locally you will need 
<ol>
  <li>git (sudo apt-get install -y git)</li> 
  <li>npm (sudo apt install -y npm)</li>
  <li><a href="https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04#step-1-—-installing-docker">docker</a></li>
  <li>docker-compose</li>
  <li>prisma cli (sudo npm install -g prisma)</li>
 </ol>

### docker-compose install instructions
`$ sudo curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose`<br />
#### make executable
`$ sudo chmod +x /usr/local/bin/docker-compose`<br />
#### change ownership and add user to group
`$ sudo chown ${USER} /usr/local/bin/docker-compose`<br />
`$ sudo usermod -aG docker ${USER}` or `sudo gpasswd -a ${USER} docker`

## Run Locally

`$ git clone -b master git@github.com:cotterjd/RP_assessment.git`<br />
`$ cd RP_assessment`<br />
`$ npm install`<br />
`$ sudo npm run start-dev`<br />
<a href="https://github.com/cotterjd/rp_ui/blob/master/README.md#user-content-run-locally">start the ui</a>


## Deploy 

To deploy this, you will need access to the server. Once your user has been created and your public key has been added to the server you can run `npm run deploy` followed by your server password. 

## Test

must have prisma running first (`npm run start-prisma`)<br />
`npm run test`
