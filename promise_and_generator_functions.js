function assert(a, b) {
  if (a) {
    console.log(b);
  } else {
    console.log("oops")
  }
}
//1. learning to use the basic of generator-------------------------------------------------------------------------------------
function* mealCooker() {
  yield "Japanese cuisine";
  yield* chineseCuisineGenerator();
  yield "Canadian poutin";
  
}

function* chineseCuisineGenerator() {
  yield "Cantonese cuisine";
  yield "Yangzhou cuisine";
  yield "Sichuan cuisine";
}

//version 1.0 of getting each meal (using while loop)
let mealIterator = mealCooker();
let meal;
while (!(meal = mealIterator.next()).done) {
  assert(meal !== null, meal.value)
}

//version 1.1 of getting each meal (using for-of loop)
for (let meal of mealCooker()) {
  assert(meal !== null, meal)
}

//2. iterate over a DOM tree with generator------------------------------------------------------------------------------------------

<html>
  <head>
    <script>
      const subtree = document.getElementById("subTree");

      //without generator: using recursive function to traverse DOM
      function traverseDom(element, callback) {
        callback(element);
        element = element.firstElementChild;
        while(element) {
          traverseDom(element, callback);
          element = element.nextElementSibling;
        }
      }

      traverseDom(subTree, function(element){
        assert(element !== null, element.nodeName)
      })

    //with generator: using generator to traverse DOM
    function* DomTraversal(element) {
      yield element;
      element = element.firstElementChild;
      while(element) {
        yield* DomTraversal(element);
        element = element.nextElementSibling;
      }
    }

    for (let element of DomTraversal(subTree)) {
      assert(element !== null, element.nodeName)
    }
    </script>
  </head>
  <body>
    <div id="subTree">
    <form>
    <input type="text"/>
    </form>
    <p>Paragraph</p>
    <span>Span</span>
    </div>
    </html>



