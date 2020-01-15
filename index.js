
import Cast from "./src/cast";
import Health from "./src/health";
import Load from "./src/load";
import Quality from "./src/quality";
import Schema from "./src/schema";
import Search from "./src/search";
import Helpers from "./src/helpers";

async function testSearch () {
  // test Search
  const result = await Search.accounts("dan");
  console.log("showing search result for *dan*: ", result);

  // test Scheme
  console.log("showing raw verses casted/schemed account from *dan* search: ", result.results[0], Schema.one(result.results[0]));

  // test Load
  const acc = await Load.account(result.results[0].fullyQualifiedName);
  console.log(`showing account: ${result.results[0].fullyQualifiedName}: `, acc);

  // test Cast
  const casted = Cast.accounts(result.results);
  console.log("showing casted/schemed search results for *dan*: ", casted);

  // test Quality
  const ranked = Quality.rank(casted);
  console.log("showing ranked casted search result for *dan*: ", ranked);

  // test Health
  const apiHealth = await Health.api();
  console.log("showing results for blockstack api status: ", apiHealth);

  // test Helpers
}

testSearch();
