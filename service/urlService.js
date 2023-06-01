const { NotFoundError, ValidationError, ForbiddenError } = require("../middleware/Error");
const UrlSchema = require("../schema/UrlSchema");
const {isValidHttpUrl} = require("../middleware/validateUrl");

const post = async (urldata) => {
    const initialUrl = urldata.origUrl;
    if (isValidHttpUrl(initialUrl) === true) {
        const createUrl = await UrlSchema.create(urldata);
        return createUrl
    } else {
        throw new ForbiddenError("Invalid URL. Enter a valid URL.")
    }
};

const urlHistory = async (user) => {
    const email = user.email;
    const findUrl = await UrlSchema.findOne({"User": email})
    if (!findUrl) {
        throw new NotFoundError("You have no URL yet")
    }
    const Url = findUrl.shortUrl;
    return Url;
};

const getLink = async (urlId, ipAddress) => {
    const getUrl = await UrlSchema.findOne({"urlId": urlId});
    if (getUrl) {
       await UrlSchema.updateOne(
        {"urlId": urlId },
       { $inc: { clicks: 1 } },
       );  
       getUrl.clicker = ipAddress;
       await getUrl.save();
        return getUrl;
    } else {
        throw new ForbiddenError("Unable to access link")
    }
   
};
module.exports = {
    post,
    urlHistory,
    getLink
}
