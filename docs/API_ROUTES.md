# Creating Backend API Routes

The main idea of the code in place to help write backend API routes is that the code should be composable rather than inheritance based. There are multiple interfaces to help you create SOLID code.

## RouteImplementation 

This is the main interface that should be implemented when doing any business logic related to the API Route. To use it, simply implement it and start writing

```javascript

class ExampleRoute implements RouteImplementation {
    async call(props: object){
        // whatever...
    }
}
```

## PropGetter 


To get extra props that are required for the implementation, you can implement the PropGetter interface

```javascript

class ExampleProps implements PropGetter {
    async getProps(event: RequestEvent){
       return {
           id: await event.request.json().id
       }
    }
}

```

The PropGetter has access to the event object (type RequestEvent) of the incoming request, which can give you access to important information from the user (like formdata, query parameters, etc.).
Data returned from getProps() will be passed to RouteImplementation.

## Tying it all together

To make an actual API route, you need to combine both the PropGetter and the RouteImplementation together into a single APIRoute. This is done like so:

```javascript

let route = new APIRoute(new ExampleProps(), new ExampleRoute())

```
This makes the experience very flexible, as you can simply pick and choose what props and what implementation you want, and reusing them is a breeze. 

## MultiProp

To aid in reusing PropGetter classes that you have written, and to avoid boilerplate code, the `MultiProp` class has been made. Using the MultiProp class, you can merge together the results from several PropGetters to create one single PropGetter.

```
MultiProp.merge([new GetUserProps(), new GetFormDataProps()])
```

The merged class can then be used in APIRoutes: 

```
new APIRoute(MultiProp.merge([new GetUserProps(), new GetFormDataProps()]), ExampleRoute)
```

There are also some prebuilt generic PropGetters that are waiting to be merged, such as `PrismaProps`, which adds a PrismaClient instance to the available props. All generics can be found in the src/lib/generic folder
