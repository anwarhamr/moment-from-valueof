# moment-from-valueof

This module is a helper for objects that have used valueOf and you'd like to get all the values back out.  My need was hang a large state where all my moment values were stored as valueOf and I wanted to mass convert these values to formatted values (for UI) or moment objects backend

`npm i moment-from-valueof`

## Usage
`import mfv from 'moment-from-valueof'`

```
let time =moment().valueOf(),
 ops = {
     newObject:true,
     toFormat:"YYYY-MM-DD hh:mm"
   },
   obj = {utc:time,utc2:{utc:time}},
   displayObj = momentFromValueOf(obj,ops);

console.log(obj,displayObj);
/*
//Original obj
{
  utc: 1538605600429,
  utc2: {
    utc: 1538605600429
  }
}
//output obj
{
  utc: 1538605600429,
  utcString: '2018-10-03 04:26',
      utc2: {
        utc: 1538605600429,
        utcString: '2018-10-03 04:26'
      },
}
*/
```

## Options
Option Name | Values *=default | Use | Example
--- |--- |--- |--- |
*newObject* | *true, false | `false` will replace properties in the supplied object |
*propNameMatcher* | *`(v)=>new RegExp('utc').test(v)` | Any true false function that will determine if we act on this property  | `(v)=>v.includes('datetime')`
*toFormat* | *null, string | valid moment string format | https://devhints.io/moment
*newProperty* | *null, `{ name: nullable string, prefix:nullable string, postfix:nullable string}` | use this property if you would like to retain the original property; a new property will be added to the returned object.  If `name` is present `prefix` and `postfix` values will be ignored |



# License
MIT
