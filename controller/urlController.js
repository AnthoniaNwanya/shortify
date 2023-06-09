const userService = require("../service/userService");
const urlService = require("../service/urlService");
const UrlSchema = require("../schema/UrlSchema");
const UserSchema = require("../schema/UserSchema");
const { nanoid } = require("nanoid");
const formatResponse = require("../middleware/Response");
const IP = require('ip');
const QRCode = require("qrcode");

module.exports = {
    post: async (req, res, next) => {
        try {
            const BaseUrl = process.env.BASE;
            const origUrl = req.body.origUrl;
            const urlId = req.body.customId || nanoid(5);
            const user = await userService.getOne(req.User.email);
            // console.log(user)
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
                    urlId: urlId,
                    origUrl: origUrl,
                    shortUrl: `${BaseUrl}/${urlId}`,
                    User: user._id,
                    createdAt: new Date(),
                });
                const savedUrl = await newUrl.save();
                user.URLS = user.URLS.concat(savedUrl.shortUrl);
                await user.save();

                // QRCODE
                QRCode.toFile('qrcode-img.png', newUrl.shortUrl, {
                    color: {
                        dark: '#00F',
                        light: '#0000'
                    }
                }, function (err) {
                    if (err) throw err
                })
                const result = savedUrl.urlId
                res.render("result.ejs", { shortUrl: result });
            };
        } catch (err) {
            next(err)
        };
    },

    urlHistory: async (req, res, next) => {
        try {

            const userObj = await UserSchema.findOne({ "_id": req.User.id });
            const user = userObj._id.toString()
            const urls = await UrlSchema.find({ "User": user })

            res.render('urlHistory.ejs', {
                url: urls
            })
            // formatResponse({
            //     res,
            //     statusCode: 200,
            //     data: user.URLS,
            //     message: "URL retrieved successfully"
            // })
        } catch (err) {
            next(err)
        }
    },
    urlAnalytics: async (req, res, next) => {
        try {
            const userObj = await UserSchema.findOne({ "_id": req.User.id });
            const user = userObj._id.toString()
            const urls = await UrlSchema.find({ "User": user })

            res.render('analytics.ejs', {
                url: urls
            })

        } catch (err) {
            next(err)
        }
    },

    redirectLink: async (req, res, next) => {
        try {
            const ipAddress = IP.address();
            const URL = await urlService.redirectLink(req.params.urlId, ipAddress);
            res.redirect(URL.origUrl);

        } catch (err) {
            next(err)
        }
    }
};