import  express  from "express";
import validUrl from 'valid-url';
import { customAlphabet } from "nanoid";
import config from 'config'

import Url from '../models/Url.js';
const router = express.Router();

// @route POST /api/url/shorten
// @ desc Create short URL

router.post('/shorten', async (req, res) => {
    // console.log(req.body)
    const {longUrl,shortUrl} = req.body;
    const baseUrl = config.get('baseUrl');
    // !validUrl.isUri(baseUrl) ? res.status(401).json('Invalid base url'): false;
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid base url')
    }

    //create url code
    const urlCode = req.body.shortUrl;
    console.log(urlCode)

    //check long url
    if(validUrl.isUri(longUrl)){
        try{
            let url = await Url.findOne({shortUrl: shortUrl})
            // console.log('shoten sudah ada')

            if(url){
                console.log("shorten url sudah digunakan")
                res.json(url)
            }else{
                const shortUrl = baseUrl +'/'+ urlCode

                let url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date : new Date()
                });

                await url.save()
                res.json(url)
            }
        }catch(err){
            console.log(err)
            res.status(500).json('Server error')
        }
    }else{
        res.status(401).json('Invalid long url')
    }
})

router.get('/random', async (req,res) => {
    // let result = Math.random().toString(36).slice(2, 6);
    const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',4)
    // const nanoid = customAlphabet('A-Za-Z0-9',5)
    // console.log(nanoid.length)
    try{
        const result = await nanoid()
        let url = await Url.findOne({shortUrl: result})
        if(url){
            result = await nanoid()
        }else{
            res.json({random : result})
            console.log(result)
        }
    }catch(err){
        res.status(500).json('server error')
    }
})

export default router