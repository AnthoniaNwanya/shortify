const { NotFoundError, BadRequestError } = require("../middleware/Error");
const UrlSchema = require("../schema/UrlSchema");
const validateUrl = require("../middleware/validateUrl.");

const post = async (urldata) => {
    const initialUrl = urldata.origUrl;
    const validUrl = validateUrl(initialUrl)
    if (validUrl === true) {
        const createUrl = await UrlSchema.create(urldata);
        return createUrl
    } else {
        throw new BadRequestError("Invalid URL. Enter a valid URL")
    }
};

const getAll = async () => {
    const getUrls = await UrlSchema.find({})
    if (!getUrls) {
        throw new BadRequestError("Unable to get URLs")
    }
    return getUrls;
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
        throw new NotFoundError("Unable to get URL")
    }
   
};
module.exports = {
    post,
    getAll,
    getLink
}
