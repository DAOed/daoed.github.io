
import Cast from "./cast"
import Health from "./health"
import Load from "./load"
import Quality from "./quality"
import Schema from "./schema"
import Search from "./search"

const lib = { Cast, Health, Load, Quality, Schema, Search }

export {
  lib as default, Cast, Health, Load, Quality, Schema, Search
}

async function testSearch () {
  // test Search
  const result = await Search.accounts("dan")
  console.log("showing search result for *dan*: ", result)

  // test Scheme
  console.log("showing raw verses casted/schemed account from *dan* search: ", result.results[0], Schema.one(result.results[0]))

  // test Load
  const acc = await Load.account(result.results[0].fullyQualifiedName)
  console.log(`showing account: ${result.results[0].fullyQualifiedName}: `, acc)

  // test Cast
  const casted = Cast.accounts(result.results)
  console.log("showing casted/schemed search results for *dan*: ", casted)

  // test Quality
  const sorted = Quality.sort(casted)
  console.log("showing sorted casted search result for *dan*: ", sorted)

  // test Health
  const apiHealth = await Health.api()
  console.log("showing results for blockstack api status: ", apiHealth)
}

testSearch()
