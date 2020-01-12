
import { algorithmWeigth, socialWeigth, constantWeigths } from "./constants"

import { initialsAvatar } from "./helpers"

const schemaOne = (data) => {
  if (!data.fullyQualifiedName) data.fullyQualifiedName = data.username

  const profile = data.profile
  const account = profile.account || []

  profile.address = profile.address || {}
  profile.image = profile.image || []

  const avatar = profile.image.find((img) => img.name === "avatar") || {}
  const cover = profile.image.find((img) => img.name === "cover") || {}

  const facebook = account.find((acc) => acc.service === "facebook") || {}
  const twitter = account.find((acc) => acc.service === "twitter") || {}
  const linkedin = account.find((acc) => acc.service === "linkedin") || {}
  const github = account.find((acc) => acc.service === "github") || {}
  const steem = account.find((acc) => acc.service === "steem") || {}

  const bitcoin = account.find((acc) => acc.service === "bitcoin") || {}
  const ethereum = account.find((acc) => acc.service === "ethereum") || {}

  const website = (data.website || []).find((site) => site["@WebSite"] === "Website") || {}

  return {
    profile: {
      name: (profile.name || "").substr(0, 30),
      description: (profile.description || "").substr(0, 100),
      avatar: avatar.contentUrl,
      cover: cover.contentUrl,
      location: profile.address.addressLocality,
      initialsAvatar: avatar.contentUrl ? {} : initialsAvatar(profile.name || data.fullyQualifiedName),
      website: website.url
    },
    social: {
      facebook: facebook.identifier ? `https://fb.com/${facebook.identifier}` : null,
      twitter: twitter.identifier ? `https://twitter.com/${twitter.identifier}` : null,
      linkedin: linkedin.identifier ? `https://linkedin.com/in/${linkedin.identifier}` : null,
      steem: steem.identifier ? `https://steem.online/@${steem.identifier}` : null,
      github: github.identifier ? `https://github.com/${github.identifier}` : null
    },
    detail: {
      type: profile["@type"],
      identifier: data.fullyQualifiedName.split(".")[0],
      domain: data.fullyQualifiedName.substring(data.fullyQualifiedName.indexOf(".") + 1),
      username: data.username,
      id: data.fullyQualifiedName,
      gaia: data.profile && data.profile.api ? new URL(data.profile.api.gaiaHubUrl).hostname : "",
      bitcoin: bitcoin.identifier,
      ethereum: ethereum.identifier
    },
    apps: profile.apps,
    api: profile.api
  }
}

const schemaAll = (data) => {
  return data.map(schemaOne)
}

const Schema = { one: schemaOne, all: schemaAll }

export {
  Schema as default, schemaOne, schemaAll
}
