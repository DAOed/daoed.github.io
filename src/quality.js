
const filterQuality = (data, type, config) => {
  // console.log(data, type, config)

  if (type === "quality") {
    // checks are : name, bio, avatar, connected account
    const checks = config.map((check) => check.toLowerCase());

    const qualityData = data.map((d) => {
      const profile = d.profile;

      if ((checks.indexOf("name") > -1) && !profile.name) return null;
      if ((checks.indexOf("bio") > -1) && !profile.description) return null;
      if ((checks.indexOf("avatar") > -1) && (!profile.image || !profile.image.find((img) => img.name === "avatar"))) return null;
      if ((checks.indexOf("accounts") > -1) && (!profile.account || !profile.account.length)) return null;

      return d;
    });

    return qualityData.filter(Boolean);
  } else if (type === "domain") {
    // potentials are : .id/id .id.blockstack/id.blockstack .id.onename
    const domains =
      config.replace(/\s+/g, " ").trim().toLowerCase().split(/[ ,]+/).map((domain) => domain.indexOf(".") === 0 ? domain : "." + domain);

    const domainData = data.map((d) => {
      const username = d.fullyQualifiedName;
      const domain = username.substr(username.indexOf("."));

      if (domains.indexOf(domain) === -1) return null;
      return d;
    });

    return domainData.filter(Boolean);
  }
};

const rankQuality = function (data) {
  return data.sort(function (item1, item2) {
    const img1 = item1.profile.avatar || "";
    const img2 = item2.profile.avatar || "";

    const name1 = item1.profile.name || "";
    const name2 = item2.profile.name || "";

    const bio1 = item1.profile.description || "";
    const bio2 = item2.profile.description || "";

    // rank by avatar
    if (img1.length < img2.length) return 1;
    if (img1.length > img2.length) return -1;

    // rank by name
    if (name1.length < name2.length) return 1;
    if (name1.length > name2.length) return -1;

    // rank by description
    if (bio1.length < bio2.length) return 1;
    if (bio1.length > bio2.length) return -1;
  });
};

const Quality = { filter: filterQuality, rank: rankQuality };

export {
  Quality as default, filterQuality, rankQuality
};

