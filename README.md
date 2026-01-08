# sentiment-analysis
Sentiment Analysis api for feelin app

## DESCRIPTION

![sentiment analysis](/images/sentimentalAnalysis.png)

This project is for sentiment analysis of post/blog submitted by user and then analysising the post and giving it rating . If all goes right then the post/blog submitted by the user will store in mongoDB database otherwise it will show the user to remove abussive words and then resubmit it , submit button will automatically remove if negative words score more than -5 .

### To start run

    node server.js

### Frontend

Go to http://localhost:8000/sentiment
it will throw you a basic form write your post and submit it

This project also uses socket.io show it will show the realtime update of the score and words.

All you can submit your post.

If all goes write (means post is good ) then it will stored in database and give us the response saved. Otherwise it will show the harmful words

### Backend

All the logic of sentiment analysis is carrying on formController.js

Usage
Open your browser and go to: http://localhost:8000/sentiment

Type in the box. Try mixed sentences like:

"Ye project bahot mast hai aur code good hai."

mast (+3 Hinglish)

good (+3 English)

Total Score: 6 (Positive) ✅

Try Negative:

"Ye service ghatiya hai aur experience bad raha."

ghatiya (-3 Hinglish)

bad (-3 English)

Total Score: -6 (Negative) ❌ -> Warning will appear.

Click Submit. If the score is good, it will be saved to the database.

Hinglish and English language is supported.
If add our own language then we need to define every Words and its score and also add more words in hinglish 
example:-
module.exports = {
    labels: {
        'jhakaas': 4,
        'bakwaas': -3,
        // Add your words here
    }
};

