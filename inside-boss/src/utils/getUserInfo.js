import cookie from "@2dfire/utils/cookie";
import qs from "querystring";

export default isStringify => {
    let info = {};
    try {
        info = JSON.parse(cookie.getItem("entrance")) || {};
    } catch (e) {
        info = {};
    }
    const { shopInfo, userInfo } = info;
    const { entityId, entityCode, industry } = shopInfo || {};
    const { userId, memberId, name, countryCode } = userInfo || {};
    return isStringify
        ? qs.stringify({
              entityCode,
              entityId,
              userId,
              memberId,
              industry,
              userName: name,
              countryCode,
              currVer: 17
          })
        : info;
};
