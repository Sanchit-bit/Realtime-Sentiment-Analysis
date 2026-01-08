const path = require('path');
const Sentiment = require('sentiment');
const Post = require('../../model/Post');
const newLang = require('../../helper/newLanguage');

//1.Form show
exports.getForm = (req, res) => {
    res.render('form', {
        msg: 'Enter text to analyze'
    })
}

// 2. Form Submit & Analysis
exports.analyzeText = (req, res) => {

    console.log(req.body.texts);
    const post = req.body.texts;

    //checking post is submitted or not
  if (post && post.length > 0) {
        const sentiment = new Sentiment()
        sentiment.registerLanguage('in', newLang);

        const result = sentiment.analyze(post, { language: 'in' });
        console.log(result);
        const {
            score,
            comparative,
            tokens,
            words,
            positive,
            negative
        } = result;

        //*CHECKING TO SAVE OR NOT
        if ((result.negative.length > 3)) {

            //failed sentimental analysis
            res.render('success', {
                score,
                comparative,
                tokens,
                words,
                positive,
                negative,
                msg: 'Words are not above our quality standard'

            })
        } else {
            //passed sentimental analysis

            const newPost = new Post({
                content: post,
                score: score,         
                comparative: comparative,
                positiveWords: positive, 
                negativeWords: negative
            })
            newPost.save().then(() => {
                res.render('success', {
                    score,
                    comparative,
                    tokens,
                    words,
                    positive,
                    negative,
                    msg: 'Saved...'

                })

                //adding new words in new database
                let allWords = tokens;
                let remainingWords = words.concat(positive, negative);
                remainingWords.forEach(e => {
                    let i = allWords.indexOf(e);
                    if (i != -1) {
                        allWords.splice(i, 1)
                    }
                });
                console.log('remainingWords', remainingWords);
                console.log(allWords);


           }).catch(err => {
                console.error(err);
                res.render('success', { msg: 'Database Error' });
            });
        }


    } else {
        //No words entered
        res.render('success', {
            msg: 'please type anything'
        })
    }



}