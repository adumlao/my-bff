# ![Logo]('./client/public/media/header.gif')

## Project Description

**this.state** is a site that gives the public access to real-time bills and legislation that congress just passed, giving additional insight on how each party voted.

The site will have a directory of every senator and house member, and offer statistics on each of their voting records (including how many votes they've missed, their percentage of voting against party).

## User Stories

The user will be able to search for a specific bill in the bills archive.  They will also be able to search for a specific politician by state or by id.  When the user clicks on a button containing the politician id, that person's contact information and stats will be displayed.

## Wireframes

### /Home (will render recent bills passed):
![/Home](https://i.imgur.com/mPzyfzV.jpg "Home")



### /Bills (bills main page will render upcoming bills):
![/Bills](https://i.imgur.com/SYrjX85.jpg "Bills Main")



### /Bills/SearchResults (will display search results):
![/Bills/SearchResults](https://i.imgur.com/pwWHrT7.jpg "Bills Search Results")



### /Congress (congress main page will render recent press releases):
![/Congress](https://i.imgur.com/VAiEOC6.jpg "Congress Main")



### /Congress/Senate or /Congress/House (renders 2018 scorecard with a filter by state form):
![/Congress/Senate or /Congress/House](https://i.imgur.com/I2II6xF.jpg "Senate/House Scorecard")



### /Bills (shows expenses):
![/Congress/Senate/Expenses/:name or /Congress/House/Expenses/:name](https://i.imgur.com/brrVT9A.jpg "Expenses")



### /Congress/Senate/State or /Congress/House/State (shows politicans per state with a show more/less contact list button):
![/Bills](https://i.imgur.com/rxA4fTC.jpg "StateList")



## MVP/PostMVP

### MVP

- Display CurrentBills  component in the homepage
- NavMain bar with that routes to /Home, /BillsArchive, and /CongressHome
- /BillsArchive route will contain a SearchBillsForm component, user types keyword to search.
- BillResults component will be routed after user hits the search button
- /senate and /house routes will have a similar hierarchy:
  * a CongressStat component that renders the stats of the previous year, and an an OnClick function on the name of the politician that will lead to his ContactList component
  * a FilterByStateForm component, a PoliticiansList component that shows all the politicians of each state
- Header and Footer Components
- PressRelease component displays most recent press releases

### PostMVP

- a filter by party function
- a filter by next re-election function
- a search for a specific bill function (needs a bill ID)
- a specific roll-call vote function (needs bill ID)
- a dropdown box where the user selects a specific state
- an OnClick function on the name of the politician that will lead to his ContactList

## React Component Hierarchy

![Component Hierarchy](https://i.imgur.com/SeIGH3C.jpg "Hierarchy")



## Functional Components

| Component | Description |
| --- | :---: |  
| Header | This will render the header |
| Footer | This will render the header|
| NavMain| This will render the nav bar in the header with links to /home /billsarchive and /congresshome|
| CurrentBills | A list of current bills passed and the votes outcome will render at the homepage |
| SearchBillsForm | Renders a form for the user to type in a keyword |
| BillResults | Renders a list of bills that have the keyword searched |
| PressReleases | Renders a list of the most current press releases |
| CongressStat | Renders the stats of the previous year |
| ContactList | Renders contact info (phone, site, socials) |
| FilterByStateForm | Renders a dropdown box for the user to choose a state |
| PoliticiansList | Renders a list of politicians by state |

| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Working with API | H | 2hrs| 2hrs | 2hrs |
| Header/Footer component | H | 1hr | .5hrs | .5hrs |
| NavMain | H | 1hrs| .5hrs | .5hrs |
| CurrentBills | H | 1hrs| 1hr | 1hr |
| SearchBillsForm | H | 1hrs| 1hrs | 1hrs |
| BillResults | H | 1hrs| 1hrs | 1hrs |
| PressReleases | H | 1hrs| .5hrs | .5hrs |
| CongressStat | H | 2.5hrs| 2.5hrs | 2.5hrs |
| ContactList | H | 1hrs| 1hrs | 2hrs |
| FilterByStateForm | H | 2hrs| 2hrs | 2hrs |
| PoliticiansList | H | 2hrs| 3hrs | 5hrs |
| Styling | H | 6hrs| 10hrs | 12hrs |
| Total | H | 21.5hrs| 24.5hrs | 30hrs |


## Code Snippet

- The code below will render a red box if the politician is a republican, or a blue box if they are democrat.

```
<div className="partybox"
style={{ backgroundColor: x.party==="R" ? "#ee252c" : "#123cf4" }} />
```

- The code below renders a prop if that data is available, or returns nothing if the API does not provide it.  It is done for a phone number, twitter account, facebook account, website, and contact page.  The user can also click on the link and it will redirect them to that link.

```
<div className="contact">
  {x.roles[0].phone === null ? null :
    (<div>phone: <span>{x.roles[0].phone}</span></div>)}
  {x.twitter_account === null ? null :
    (<div>twitter: <span><a className="links" href={"https://twitter.com/"+x.twitter_account} target="_blank" rel="noopener noreferrer">{x.twitter_account}</a></span></div>)}
  {x.facebook_account === null ? null :
    (<div>facebook: <span><a className="links" href={"https://facebook.com/"+x.facebook_account} target="_blank" rel="noopener noreferrer">{x.facebook_account}</a></span></div>)}
  {x.url === null ? null :
    (<div>website: <span><a className="links" href={x.url} target="_blank" rel="noopener noreferrer">{x.url}</a></span></div>)}
  {x.roles[0].contact_form === null ? null :
    (<div>contact: <span><a className="links" href={x.roles[0].contact_form} target="_blank" rel="noopener noreferrer">{x.roles[0].contact_form}</a></span></div>)}
</div>
```

## Issues and Resolutions

**ERROR**: all the forms are linked together.  So if you are in the archives component and search for a keyword, the forms in the senate and house of reps component will also search for that keyword and error out.                               
**RESOLUTION**: creating different handle submits for each form.

**ERROR**: button click on representative id triggers an api call but does not recognize the value of the ID.                     
**RESOLUTION**: pass the value of the button on click as the parameter of the api call.

```   
      async submitSpecificSenator(ev){
      ev.preventDefault();
      const specificSenator = await fetchSpecificMember(ev.target.value)

      this.setState({
      specificSenator: specificSenator
      })
    }

  ```
