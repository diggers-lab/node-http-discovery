import getSwaggerEndPoint from "src/endPoint";

test();

interface toto {
    test: string;

}

async function test() {

  const test = await getSwaggerEndPoint({
      "name": "test",
      "description": "",
      "url": "http://localhost:4200/api/test-json", // this test api is available in test folder
      "type": "Swagger",
      "security": { // Security will be added for each route that requires it
          key: 'apiKey',
          value: 'teast'
      }
    })
  const route = test.getRoutes().find((route) => route.operationId.includes('AppController_postTest2')).operationId; // retrieve this specific route by operationId
  console.log('route :>> ', route); // details of the specific route
  console.log('test :>> ', test.endPoint); // details of the whole endpoint in case you wanna use fetch by yourself

  const toto = await test.sendRequest<toto>(route, {
    queryParameters: new Map<string, string>([['test', 'test']]), // will throw error if required parameter is missing
    urlParameters: new Map<string, string>([['tata', 'tata']]),// will throw error if required parameter is missing
    headers: new Map<string, string>([['tata', 'tata']]),// free to use, no check, but do not use with reserved headers or security
    body: { // Free to use, no check
      toto: 'toto',
    },
  });
  console.log('toto :>> ', toto);

}

async function test2() {
  const test = await getSwaggerEndPoint({
    "name": "test",
    "description": "",
    "url": "http://localhost:4200/api/test-json",
    "type": "Swagger",
  })
  test.setSecurity('apiKey', 'teast');
  const route = test.getRoutes().find((route) => route.operationId.includes('AppController_postTest2')).operationId;
  console.log('route :>> ', route);

  const toto = await test.sendRequest<toto>(route, {
    queryParameters: new Map<string, string>([['test', 'test']]),
    urlParameters: new Map<string, string>([['tata', 'tata']]),
    body: {
      toto: 'toto',
    },
  });
  console.log('toto :>> ', toto);
}