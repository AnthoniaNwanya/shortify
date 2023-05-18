const userService = require("../service/userService");
const urlService = require("../service/urlService");
const UrlSchema = require("../schema/UrlSchema");
const { nanoid } = require("nanoid");
const formatResponse = require("../middleware/Response");
const BaseUrl = process.env.BASE;
const IP = require('ip');


module.exports = {
    post: async (req, res, next) => {
        try {
            const origUrl = req.body.origUrl;
            const email = req.params.email;
            const urlId = req.body.customId || nanoid(7);          
            const user = await userService.getOne(email);
            const findUrl = await UrlSchema.findOne({ "origUrl": origUrl });
            if (findUrl) {
                formatResponse({
                    res,
                    statusCode: 200,
                    data: findUrl.shortUrl,
                    message: "URL already exists"
                });
            } else {
                const newUrl = await urlService.post({
                    urlId,
                    origUrl,
                    shortUrl: `${BaseUrl}/${urlId}`,
                    User: user.email,
                    createdAt: new Date(),
                });
                const savedUrl = await newUrl.save();
                // Link user to URLs
                user.URLS = user.URLS.concat(savedUrl.shortUrl);
                await user.save();

                // make a different route for this history of urls for user
                // const urlHistory = await UrlSchema.find({ "User": email });
                // // Or get only shorturl
                // for (let index = 0; index < urlHistory.length; index++) {
                //     const element = urlHistory[index];
                //     const result = element.shortUrl
                //     return result
                // }

                formatResponse({
                    res,
                    statusCode: 201,
                    message: "URL created"
                });
            }
        } catch (err) {
            next(err)
        }
    },

    getAll: async (req, res, next) => {
        try {
            const URL = await urlService.getAll();
            formatResponse({
                res,
                statusCode: 200,
                data: URL,
                message: "URL retrieved successfully"
            })
        } catch (err) {
            next(err)
        }
    },

    getLink: async (req, res, next) => {
        try {
            const ipAddress = IP.address();
            const URL = await urlService.getLink(req.params.urlId, ipAddress);
            res.redirect(URL.origUrl);

        } catch (err) {
            next(err)
        }
    }
};