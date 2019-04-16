# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create([
  {
   email: "nina",
   password: "nina",
   name: "Nina Catsinson",
   bio: "I live in Brooklyn, I have two daddies who love me very much, I love treats and napping on my sequin throne",
   location: "Brooklyn, NY",
   profile_pic: "https://i.imgur.com/LYu6JGU.jpg",
   banner: "https://i.imgur.com/WQHdqRO.jpg"
 },
 {
  email: "truvy",
  password: "truvy",
  name: "Truvy the Bulldog",
  bio: "I love picnics and my brother Jack.  Southern Lady at heart.",
  location: "Seattle, WA",
  profile_pic: "https://i.imgur.com/hP6yZEu.jpg",
  banner: "https://i.imgur.com/lnh3OET.jpg"
 },
 {
 email: "halcyon",
 password: "halcyon",
 name: "Halcyon Wright-Madril",
 bio: "Ra ra ra ah ah, romance ah ah ah , ga ga oo la.",
 location: "Ny, NY",
 profile_pic: "https://i.imgur.com/W2ic2Lj.jpg",
 banner: "https://i.imgur.com/DPiCguU.jpg"
 },
 {
 email: "maya",
 password: "maya",
 name: "Maya the Queen",
 bio: "Running around, nothing to do but frown, Rainy days and mondays always get me down.",
 location: "Lees Summit, MO",
 profile_pic: "https://i.imgur.com/q82UUjW.jpg",
 banner: "https://i.imgur.com/Ifd5QV1.jpg"
 },
 {
 email: "moose",
 password: "moose",
 name: "Moose the forever puppy",
 bio: "I love being active, i love being around people, and I LOVE LIFE!",
 location: "Brooklyn, NY",
 profile_pic: "https://i.imgur.com/zN940Sy.jpg",
 banner: "https://i.imgur.com/38i0QrM.jpg"
 }
  ])

  Post.create([
    {
    body: "https://i.imgur.com/WInAhFq.jpg",
    description: "I'm your present!",
    posted_by: "Nina Catsinson",
    user_id: "1"
    },
    {
    body: "https://i.imgur.com/8zHSwry.jpg",
    description: "Feeling cute, dunno, might delete later",
    posted_by: "Halcyon Wright-Madril",
    user_id: "3"
    },
    {
    body: "https://i.imgur.com/Cbwx1CL.jpg",
    description: "New Sweater! Loving it!",
    posted_by: "Maya the Queen",
    user_id: "4"
    },
    {
    body: "https://i.imgur.com/ip4TDqX.jpg",
    description: "Spot the cuteness!",
    posted_by: "Moose the forever puppy",
    user_id: "5"
    },
    {
    body: "https://i.imgur.com/MhTypZ5.jpg",
    description: "I love being pet. LOL!",
    posted_by: "Truvy the Bulldog",
    user_id: "2"
    },
    {
    body: "https://i.imgur.com/tF8MvMc.jpg",
    description: "Don't be scared. I'm really very sweet",
    posted_by: "Maya the Queen",
    user_id: "4"
    },
    {
    body: "https://i.imgur.com/WH40mrD.jpg",
    description: "So sleepy",
    posted_by: "Halcyon Wright-Madril",
    user_id: "3"
    },
    {
    body: "https://i.imgur.com/Qm8s9Ta.jpg",
    description: "PNW life",
    posted_by: "Truvy the Bulldog",
    user_id: "2"
    },
    {
    body: "https://i.imgur.com/K5hRrdJ.jpg",
    description: "That's my throne",
    posted_by: "Maya the Queen",
    user_id: "4"
    },
    {
    body: "https://i.imgur.com/nxPwuPU.jpg",
    description: "Fire island queen",
    posted_by: "Moose the forever puppy",
    user_id: "5"
    },
    {
    body: "https://i.imgur.com/5MWu1gZ.jpg",
    description: "What did you say about gaga?",
    posted_by: "Halcyon Wright-Madril",
    user_id: "3"
    },
    {
    body: "https://i.imgur.com/51uHxD1.jpg",
    description: "Me and my human. I love him.",
    posted_by: "Halcyon Wright-Madril",
    user_id: "3"
    },
    {
    body: "https://i.imgur.com/w0XJXud.jpg",
    description: "I was on a greeting card once. Celebrity right here.",
    posted_by: "Maya the Queen",
    user_id: "4"
    },
    {
    body: "https://i.imgur.com/j8QVezG.jpg",
    description: "Denim on denim on denim",
    posted_by: "Moose the forever puppy",
    user_id: "5"
    },
    {
    body: "https://i.imgur.com/h3d7XfQ.jpg",
    description: "thicccc thighs don't lie",
    posted_by: "Truvy the Bulldog",
    user_id: "2"
    },
    {
    body: "https://i.imgur.com/ADnJFck.jpg",
    description: "My sequin throne",
    posted_by: "Nina Catsinson",
    user_id: "1"
    },
    {
    body: "https://i.imgur.com/kL4nXUn.jpg",
    description: "Jungle Kitty",
    posted_by: "Nina Catsinson",
    user_id: "1"
    },
    ])

    Comment.create([
   {
   comment: 'This is too cute',
   comment_by: "Truvy the Bulldog",
   post_id: "17",
   user_id: "2"
   },
   {
   comment: 'Shes a huntress',
   comment_by: "Halcyon Wright-Madril",
   post_id: "17",
   user_id: "3"
   }
   ])
