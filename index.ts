import { RequestConfig, RequestService} from "./src/request.service";


const config = {
    "name": "test",
    "description": "",
    "url": "http://localhost:4200/api/test-json", // this test api is available in test folder
    "type": "Swagger",
    "security": { // Security will be added for each route that requires it
        key: 'apiKey',
        value: 'teast'
    }
}

testPreparedRequest(config);

async function testPreparedRequest(config) {
    const requestService = new RequestService();

    requestService.attachLogger(console.log);
    await requestService.addEndPoint(config);

    // First part going to throw an error as a parameter is missing
    const requetToTest: RequestConfig = {
        name: "test",
        operationId: "AppController_postTest2",
        data: {
            queryParameters: {
                test: "test"
            },
            urlParameters: {
            },
            headers: {
            },
            body: {

            }
        }
    }

    const requestId = requestService.prepareRequest(requetToTest);
    console.log('requestId :>> ', requestId);

    const result = await requestService.executePreparedRequest(requestId);
    console.log('result :>> ', result);

    const logTest = requestService.logService.getRequest(requestId);
    console.log("logTest :>> ", logTest);
    // First part going to throw an error as a parameter is missing

    // Second part will work fine
    const secondRequest = {
        name: "test",
        operationId: "AppController_postTest2",
        data: {
            queryParameters: {
                test: "test"
            },
            urlParameters: {
                tata: "tata"
            },
            headers: {
            },
            body: {

            }
        }
    }

    const secondRequestId = requestService.prepareRequest(secondRequest);
    console.log('secondRequestId :>> ', secondRequestId);

    const secondResult = await requestService.executePreparedRequest(secondRequestId);
    console.log('secondResult :>> ', secondResult);

    const logTest2 = requestService.logService.getRequest(secondRequestId);
    console.log("logTest2 :>> ", logTest2);
    // Second part will work fine

    console.log("openAPIDefinition", requestService.getEndPointOpenAPIDefinition("test"));

}

// testSimpleRequest(config);

async function testSimpleRequest(config) {

    const requestService = new RequestService();
    await requestService.addEndPoint(config);

    const requetToTest: RequestConfig = {
        name: "test",
        operationId: "AppController_postTest2",
        data: {
            queryParameters: {
                test: "test"
            },
            urlParameters: {
                tata: "tata"
            },
            headers: {
            },
            body: {

            }
        }
    }

    const result = await requestService.executeRequest(requetToTest);
    console.log('result :>> ', result);

    // const test = requestService.getEndPoint(config.name);
    // console.log('test :>> ', test);
}