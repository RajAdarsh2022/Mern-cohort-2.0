/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let totalSpentByCategory = [];
  for(let i = 0 ; i < transactions.length ; i++){
    let currentTransaction = transactions[i];
    let currentCatergory = currentTransaction["category"];
    let currentPrice = currentTransaction["price"];

    //searching in the registry list whether the category is present or not
    let isPresent = false;
    for(let j = 0 ; j < totalSpentByCategory.length ; j++){
      if(totalSpentByCategory[j]["category"] === currentCatergory){
        isPresent = true;
        totalSpentByCategory[j]["totalSpent"] += currentPrice;
        break;
      }

    }

    if(!isPresent)
      totalSpentByCategory.push({"category" : currentCatergory , "totalSpent" : currentPrice});

  }
  return totalSpentByCategory;
}

module.exports = calculateTotalSpentByCategory;
