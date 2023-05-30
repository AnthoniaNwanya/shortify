const userService = require("../service/userService");
const urlService = require("../service/urlService");
const UrlSchema = require("../schema/UrlSchema");
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

                formatResponse({
                    res,
                    data: savedUrl.shortUrl,
                    statusCode: 201,
                    message: "URL created"
                });
            };
        } catch (err) {
            next(err)
        };
    },

    urlHistory: async (req, res, next) => {
        try {
            const user = await userService.getOne(req.User.email);
             await urlService.urlHistory(user);
            formatResponse({
                res,
                statusCode: 200,
                data: user.URLS,
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