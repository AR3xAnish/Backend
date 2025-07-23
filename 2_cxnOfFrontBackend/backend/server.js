import express from "express"
const app = express()
app.get('/',(req,res)=>{
    res.send("Server Ready")
})
app.get('/api/joke',(req,res)=>{
    const jokes=[
        {
            "id": 1,
            "title": "The Invisible Man",
            "content": "Why don't scientists trust atoms? Because they make up everything!"
        },
        {
            "id": 2,
            "title": "Bad Puns",
            "content": "I told my wife she was drawing her eyebrows too high. She looked surprised."
        },
        {
            "id": 3,
            "title": "Math Humor",
            "content": "Why was the math book sad? Because it had too many problems."
        },
        {
            "id": 4,
            "title": "Coffee Break",
            "content": "What do you call a fake noodle? An impasta!"
        },
        {
            "id": 5,
            "title": "The Ocean's Secret",
            "content": "Why did the ocean cross the road? To get to the other tide."
        },
        {
            "id": 6,
            "title": "Light Bulb Moment",
            "content": "How many programmers does it take to change a light bulb? None, that's a hardware problem."
        },
        {
            "id": 7,
            "title": "Musical Fruit",
            "content": "What do you call a sad strawberry? A blueberry."
        },
        {
            "id": 8,
            "title": "Time Travel",
            "content": "I'm reading a book on anti-gravity. It's impossible to put down!"
        },
        {
            "id": 9,
            "title": "The Gardener's Tale",
            "content": "What do you call a lazy kangaroo? Pouch potato."
        },
        {
            "id": 10,
            "title": "Spooky Story",
            "content": "Why did the scarecrow win an award? Because he was outstanding in his field!"
        }
    ]
    res.send(jokes)
})

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Listening on Port http://localhost:${port}`)
})

