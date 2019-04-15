![/Logo](https://i.imgur.com/cSEj0l3.png "logo")

## Project Description

**my-bff** is a social site for pets.  Customize your pet's profile, share photos and blog posts with other users and be able to like and comment on their photos as well!

## User Stories

A user will be able to register/login to their account so they can see posts from fellow users.

A user will be able to enter information, edit their bio information so they can have a customizable profile that is unique.

A user will be able to add/ edit posts so they can share their thoughts/photos with other users on the main page feed.

A user will be able to like/unlike and comment/edit that comment on other user's posts.

A user will be able to see other user's profile pages so it will show only that user's posts.

## Wireframes

- Main page
![/Home](https://i.imgur.com/GEaBqEF.jpg "main feed")



- User profile
![/Bills](https://i.imgur.com/EhJvf4h.jpg "user profile")

## MVP/PostMVP

### MVP

- Backend / routes
- Login / Register
- Add / edit user profile with profile photo, banner, name, location and bio.
- Add / edit / delete user posts
- Show all posts from the community in main feed
- Show only specific users's posts when we click on their profile
- Random user spotlight component

### PostMVP

- Comment on a post
- Edit/delete your own comments
- Like/unlike a post


## Workflow Timeline

| Day | Task |
| --- | :---: |  
| Monday | backend, routes, login, register, auth |
| Tuesday | edit user profile, dropbox, show all posts |
| Wednesday| add/edit/delete posts, styling |
| Thursday | styling, responsiveness |
| Friday | MVP button-up |

## Code Snippet

- The function below is the profile spotlight randomizer.  It goes through the array of users and picks a random user to be showcased on the spotlight component

```
async showRandom(){
  const num = this.state.allUsers.length
  const randomNum = Math.random(num) * num
  const index = Math.floor(randomNum)
  const id = this.state.allUsers[index].id
  const user = await getUser(id)
  this.setState({
    user: user.user
  })
}
```

- The code below is an example of conditional rendering.  It checks if the logged in user is the owner of the post- if they own the post, an edit and delete button will appear.

```
{props.user === x.user_id ?
<div className="edits">
<Link className="edit-buttons" to={`/post/${x.id}/edit`}>Edit</Link>
<div className="edit-buttons" onClick={() => props.deleteThisPost(x.id)}>Delete</div>
</div>
: null
}
```

## Issues and Resolutions

**ERROR**: Backend server cannot find user id from post id.                                               
**RESOLUTION**: make sure a relation is set between post and user.

- on the migration:
```   
class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :body
      t.string :description
      t.string :posted_by
      t.references :user, foreign_key: true #ensure this foreign key is set up

      t.timestamps
    end
  end
end

  ```

  - this is what the schema would look like:
  ```
  create_table "posts", force: :cascade do |t|
    t.string "body"
    t.string "description"
    t.string "posted_by"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_posts_on_user_id"
  end # this sets the relation
  ```
